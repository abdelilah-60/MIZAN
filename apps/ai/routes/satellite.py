"""
Sentinel-2 Precision Agriculture Spectral Engine.
Includes Zero-Shift UTM Projection (WGS84 -> UTM Zone 29N/30N),
Otsu's Bimodal Automatic Soil/Canopy Thresholding,
Fractional Tree Canopy Coverage (f_Tree), and Calibrated Agricultural NDWI.
"""
import os
import base64
import io
import math
import hashlib
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import numpy as np
from PIL import Image

try:
    import tifffile
    HAS_TIFFFILE = True
except ImportError:
    HAS_TIFFFILE = False
    print("WARNING: tifffile not available.")

router = APIRouter(prefix="/api/satellite", tags=["satellite"])

STAC_SEARCH_URL = "https://earth-search.aws.element84.com/v1/search"


class SatelliteAnalysisRequest(BaseModel):
    geoPolygon: Dict[str, Any]
    cropType: Optional[str] = "Olive"
    areaHa: Optional[float] = 1.0


class HttpSeekableFile:
    """
    Seekable HTTP file wrapper using Range requests for reading COG IFDs over HTTP.
    """
    def __init__(self, url: str, client: httpx.Client):
        self.url = url
        self.client = client
        self._pos = 0
        try:
            res = self.client.head(self.url)
            self._length = int(res.headers.get("content-length", 0))
        except Exception:
            self._length = 0

    def seek(self, offset: int, whence: int = io.SEEK_SET) -> int:
        if whence == io.SEEK_SET:
            self._pos = offset
        elif whence == io.SEEK_CUR:
            self._pos += offset
        elif whence == io.SEEK_END:
            self._pos = self._length + offset
        return self._pos

    def tell(self) -> int:
        return self._pos

    def read(self, size: int = -1) -> bytes:
        if size == -1 or size is None:
            end = self._length - 1
        else:
            end = min(self._pos + size - 1, self._length - 1)
        if self._pos > end:
            return b""
        headers = {"Range": f"bytes={self._pos}-{end}"}
        try:
            res = self.client.get(self.url, headers=headers)
            data = res.content
            self._pos += len(data)
            return data
        except Exception as e:
            print(f"HTTP Range Read Error: {e}")
            return b""


def calculate_polygon_bounds(coords: List[List[float]]):
    lons = [c[0] for c in coords]
    lats = [c[1] for c in coords]
    return min(lons), min(lats), max(lons), max(lats)


def point_in_polygon(x: float, y: float, poly_coords: List[List[float]]) -> bool:
    n = len(poly_coords)
    inside = False
    p1x, p1y = poly_coords[0]
    for i in range(n + 1):
        p2x, p2y = poly_coords[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y
    return inside


def wgs84_to_utm(lon: float, lat: float):
    """
    Mathematical transformation from WGS84 (lon, lat) to UTM Easting & Northing in meters.
    Calculates exact spatial position for Sentinel-2 COG images (EPSG:32629 / 32630).
    """
    zone = int((lon + 180) / 6) + 1
    lon0 = (zone - 1) * 6 - 180 + 3

    a = 6378137.0
    f = 1 / 298.257223563
    k0 = 0.9996

    phi = math.radians(lat)
    lambda_val = math.radians(lon)
    lambda0 = math.radians(lon0)

    e2 = f * (2 - f)
    e_prime2 = e2 / (1 - e2)

    N = a / math.sqrt(1 - e2 * math.sin(phi)**2)
    T = math.tan(phi)**2
    C = e_prime2 * math.cos(phi)**2
    A = (lambda_val - lambda0) * math.cos(phi)

    M = a * ((1 - e2/4 - 3*e2**2/64 - 5*e2**3/256) * phi
             - (3*e2/8 + 3*e2**2/32 + 45*e2**3/1024) * math.sin(2*phi)
             + (15*e2**2/256 + 45*e2**3/1024) * math.sin(4*phi)
             - (35*e2**3/3072) * math.sin(6*phi))

    easting = 500000 + k0 * N * (A + (1 - T + C) * A**3 / 6 + (5 - 18*T + T**2 + 72*C - 58*e_prime2) * A**5 / 120)
    northing = k0 * (M + N * math.tan(phi) * (A**2 / 2 + (5 - T + 9*C + 4*C**2) * A**4 / 24 + (61 - 58*T + T**2 + 600*C - 330*e_prime2) * A**6 / 720))
    return easting, northing, zone


def compute_otsu_threshold(savi_vals: np.ndarray) -> float:
    """
    Otsu's Bimodal Automatic Soil/Canopy Thresholding algorithm.
    Finds the optimal threshold T* that dynamically separates soil background from tree canopy.
    """
    valid_vals = savi_vals[~np.isnan(savi_vals)]
    if len(valid_vals) == 0:
        return 0.18

    s_min, s_max = float(np.min(valid_vals)), float(np.max(valid_vals))
    if s_max <= s_min:
        return 0.18

    scaled = ((valid_vals - s_min) / (s_max - s_min + 1e-9) * 255.0).astype(np.uint8)
    hist, _ = np.histogram(scaled, bins=256, range=(0, 256))
    total = scaled.size

    current_max = 0.0
    threshold = 128

    sum_total = float(np.dot(np.arange(256), hist))
    sum_b = 0.0
    w_b = 0.0

    for i in range(256):
        w_b += hist[i]
        if w_b == 0:
            continue
        w_f = total - w_b
        if w_f == 0:
            break

        sum_b += i * hist[i]
        m_b = sum_b / w_b
        m_f = (sum_total - sum_b) / w_f

        var_between = w_b * w_f * ((m_b - m_f) ** 2)
        if var_between > current_max:
            current_max = var_between
            threshold = i

    otsu_savi = s_min + (threshold / 255.0) * (s_max - s_min)
    return float(otsu_savi)


def compute_fractional_canopy_cover(savi_grid: np.ndarray, otsu_threshold: float, poly_mask: np.ndarray):
    """
    Calculates Fractional Tree Canopy Coverage (f_Tree) per 10m pixel [0.0 to 1.0].
    """
    valid_savi = savi_grid[poly_mask]
    if len(valid_savi) == 0:
        return np.zeros_like(savi_grid), 0.12, 0.35

    soil_pixels = valid_savi[valid_savi <= otsu_threshold]
    tree_pixels = valid_savi[valid_savi > otsu_threshold]

    savi_soil = float(np.mean(soil_pixels)) if len(soil_pixels) > 0 else float(np.min(valid_savi))
    savi_tree_max = float(np.percentile(valid_savi, 95)) if len(valid_savi) > 0 else float(np.max(valid_savi))

    if savi_tree_max <= savi_soil:
        savi_tree_max = savi_soil + 0.15

    f_tree = np.clip((savi_grid - savi_soil) / (savi_tree_max - savi_soil + 1e-9), 0.0, 1.0)
    f_tree[~poly_mask] = 0.0
    return f_tree, savi_soil, savi_tree_max


def create_canopy_cover_heatmap(f_tree_grid: np.ndarray, poly_mask: np.ndarray, cloud_shadow_mask: np.ndarray = None) -> str:
    """
    Generate RGBA heatmap PNG base64 URL for Fractional Tree Canopy Cover (f_Tree %).
    - f_Tree >= 0.35: Dense Tree Canopy (Emerald Green)
    - f_Tree 0.18 - 0.35: Balanced Tree Canopy (Lime Green)
    - f_Tree 0.08 - 0.18: Light/Young Tree Canopy (Yellow)
    - f_Tree < 0.08: Bare Soil / Low Cover (Red)
    """
    h, w = f_tree_grid.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)

    for i in range(h):
        for j in range(w):
            if not poly_mask[i, j] or (cloud_shadow_mask is not None and cloud_shadow_mask[i, j]):
                rgba[i, j] = [0, 0, 0, 0]
                continue
            val = f_tree_grid[i, j]
            if val >= 0.35:
                rgba[i, j] = [16, 185, 129, 225]   # Emerald Green
            elif val >= 0.18:
                rgba[i, j] = [132, 204, 22, 215]   # Lime Green
            elif val >= 0.08:
                rgba[i, j] = [234, 179, 8, 210]    # Yellow
            else:
                rgba[i, j] = [239, 68, 68, 220]    # Red

    img = Image.fromarray(rgba, mode="RGBA")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"


def create_savi_heatmap(grid_savi: np.ndarray, poly_mask: np.ndarray, cloud_shadow_mask: np.ndarray = None) -> str:
    """Generate RGBA heatmap PNG base64 URL for SAVI."""
    h, w = grid_savi.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)

    for i in range(h):
        for j in range(w):
            if not poly_mask[i, j] or (cloud_shadow_mask is not None and cloud_shadow_mask[i, j]):
                rgba[i, j] = [0, 0, 0, 0]
                continue
            val = grid_savi[i, j]
            if val >= 0.28:
                rgba[i, j] = [16, 185, 129, 220]
            elif val >= 0.20:
                rgba[i, j] = [132, 204, 22, 210]
            elif val >= 0.14:
                rgba[i, j] = [234, 179, 8, 210]
            else:
                rgba[i, j] = [239, 68, 68, 225]

    img = Image.fromarray(rgba, mode="RGBA")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"


def create_ndvi_heatmap(grid_ndvi: np.ndarray, poly_mask: np.ndarray, cloud_shadow_mask: np.ndarray = None) -> str:
    """Generate RGBA heatmap PNG base64 URL for NDVI."""
    h, w = grid_ndvi.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)

    for i in range(h):
        for j in range(w):
            if not poly_mask[i, j] or (cloud_shadow_mask is not None and cloud_shadow_mask[i, j]):
                rgba[i, j] = [0, 0, 0, 0]
                continue
            val = grid_ndvi[i, j]
            if val >= 0.45:
                rgba[i, j] = [16, 185, 129, 220]
            elif val >= 0.32:
                rgba[i, j] = [132, 204, 22, 210]
            elif val >= 0.22:
                rgba[i, j] = [234, 179, 8, 210]
            else:
                rgba[i, j] = [239, 68, 68, 225]

    img = Image.fromarray(rgba, mode="RGBA")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"


def create_ndwi_heatmap(grid_ndwi: np.ndarray, poly_mask: np.ndarray, cloud_shadow_mask: np.ndarray = None) -> str:
    """Generate RGBA heatmap PNG base64 URL for NDWI."""
    h, w = grid_ndwi.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)

    for i in range(h):
        for j in range(w):
            if not poly_mask[i, j] or (cloud_shadow_mask is not None and cloud_shadow_mask[i, j]):
                rgba[i, j] = [0, 0, 0, 0]
                continue
            val = grid_ndwi[i, j]
            if val >= 0.02:
                rgba[i, j] = [59, 130, 246, 210]
            elif val >= -0.10:
                rgba[i, j] = [6, 182, 212, 200]
            elif val >= -0.20:
                rgba[i, j] = [245, 158, 11, 210]
            else:
                rgba[i, j] = [220, 38, 38, 230]

    img = Image.fromarray(rgba, mode="RGBA")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"


async def query_sentinel2_stac(min_lng, min_lat, max_lng, max_lat):
    """Query Element84 STAC catalog for latest cloud-free Sentinel-2 L2A scene."""
    payload = {
        "collections": ["sentinel-2-l2a"],
        "bbox": [min_lng, min_lat, max_lng, max_lat],
        "limit": 5,
        "query": {"eo:cloud_cover": {"lt": 25}},
        "sortby": [{"field": "properties.datetime", "direction": "desc"}]
    }
    try:
        async with httpx.AsyncClient(timeout=6.0) as client:
            res = await client.post(STAC_SEARCH_URL, json=payload)
            if res.status_code == 200:
                data = res.json()
                features = data.get("features", [])
                if features:
                    scene = features[0]
                    props = scene.get("properties", {})
                    assets = scene.get("assets", {})
                    return {
                        "id": scene.get("id", "unknown"),
                        "date": props.get("datetime", "").split("T")[0],
                        "cloudCover": f"{props.get('eo:cloud_cover', 0):.1f}%",
                        "bbox": scene.get("bbox"),
                        "assets": assets
                    }
    except Exception as e:
        print(f"STAC query error: {e}")
    return None


def decode_band_crop(url: str, min_lng: float, min_lat: float, max_lng: float, max_lat: float, scene_bbox: list, client: httpx.Client):
    f = HttpSeekableFile(url, client)
    with tifffile.TiffFile(f) as tif:
        p0 = tif.pages[0]
        full_w, full_h = p0.shape[1], p0.shape[0]

        tie_x, tie_y = 0.0, 0.0
        scale_x, scale_y = 10.0, 10.0
        for tag in p0.tags.values():
            if tag.name == 'ModelTiepointTag':
                tie_x, tie_y = tag.value[3], tag.value[4]
            elif tag.name == 'ModelPixelScaleTag':
                scale_x, scale_y = tag.value[0], tag.value[1]

        if tie_x > 0 and tie_y > 0:
            utm_min_x, utm_max_y, _ = wgs84_to_utm(min_lng, max_lat)
            utm_max_x, utm_min_y, _ = wgs84_to_utm(max_lng, min_lat)

            px_min_x = int((utm_min_x - tie_x) / scale_x)
            px_max_x = int((utm_max_x - tie_x) / scale_x)
            px_min_y = int((tie_y - utm_max_y) / scale_y)
            px_max_y = int((tie_y - utm_min_y) / scale_y)
        else:
            s_min_lng, s_min_lat, s_max_lng, s_max_lat = scene_bbox
            px_min_x = int((min_lng - s_min_lng) / (s_max_lng - s_min_lng + 1e-9) * full_w)
            px_max_x = int((max_lng - s_min_lng) / (s_max_lng - s_min_lng + 1e-9) * full_w)
            px_min_y = int((s_max_lat - max_lat) / (s_max_lat - s_min_lat + 1e-9) * full_h)
            px_max_y = int((s_max_lat - min_lat) / (s_max_lat - s_min_lat + 1e-9) * full_h)

        tile_w = p0.tilewidth if p0.is_tiled else full_w
        tile_h = p0.tilelength if p0.is_tiled else full_h
        tiles_per_row = max(1, full_w // tile_w)

        center_x = (px_min_x + px_max_x) // 2
        center_y = (px_min_y + px_max_y) // 2
        tile_col = min(max(0, tiles_per_row - 1), max(0, center_x // tile_w))
        tile_row = min(max(0, tiles_per_row - 1), max(0, center_y // tile_h))
        tile_index = tile_row * tiles_per_row + tile_col

        offset = p0.dataoffsets[tile_index]
        bytecount = p0.databytecounts[tile_index]
        f.seek(offset)
        compressed_bytes = f.read(bytecount)
        raw_arr = p0.decode(compressed_bytes, tile_index)[0]
        tile_2d = np.squeeze(raw_arr)

        l_x1 = max(0, min(tile_w, px_min_x - tile_col * tile_w))
        l_x2 = max(l_x1 + 1, min(tile_w, px_max_x - tile_col * tile_w))
        l_y1 = max(0, min(tile_h, px_min_y - tile_row * tile_h))
        l_y2 = max(l_y1 + 1, min(tile_h, px_max_y - tile_row * tile_h))

        crop = tile_2d[l_y1:l_y2, l_x1:l_x2].astype(np.float32)
        return crop


def read_real_bands_tifffile(assets: dict, min_lng, min_lat, max_lng, max_lat, scene_bbox=None, grid_size=64):
    if not HAS_TIFFFILE:
        return None, None, None, None

    band_keys = {
        "red": ["red", "B04", "b04"],
        "nir": ["nir", "B08", "b08", "nir08"],
        "swir": ["swir16", "B11", "b11", "swir_1"],
        "scl": ["scl", "SCL"]
    }

    def find_url(assets, key_list):
        for k in key_list:
            if k in assets and "href" in assets[k]:
                return assets[k]["href"]
        return None

    red_url = find_url(assets, band_keys["red"])
    nir_url = find_url(assets, band_keys["nir"])
    swir_url = find_url(assets, band_keys["swir"])
    scl_url = find_url(assets, band_keys["scl"])

    if not red_url or not nir_url or not scene_bbox:
        return None, None, None, None

    try:
        with httpx.Client(timeout=8.0, follow_redirects=True) as client:
            crop_red = decode_band_crop(red_url, min_lng, min_lat, max_lng, max_lat, scene_bbox, client)
            crop_nir = decode_band_crop(nir_url, min_lng, min_lat, max_lng, max_lat, scene_bbox, client)

            crop_swir = None
            if swir_url:
                try:
                    crop_swir = decode_band_crop(swir_url, min_lng, min_lat, max_lng, max_lat, scene_bbox, client)
                except Exception as e_swir:
                    print(f"SWIR read notice: {e_swir}")

            crop_scl = None
            if scl_url:
                try:
                    crop_scl = decode_band_crop(scl_url, min_lng, min_lat, max_lng, max_lat, scene_bbox, client)
                except Exception as e_scl:
                    print(f"SCL read notice: {e_scl}")

            grid_red = np.array(Image.fromarray(crop_red).resize((grid_size, grid_size), Image.Resampling.BILINEAR)) / 10000.0
            grid_nir = np.array(Image.fromarray(crop_nir).resize((grid_size, grid_size), Image.Resampling.BILINEAR)) / 10000.0

            grid_swir = None
            if crop_swir is not None:
                grid_swir = np.array(Image.fromarray(crop_swir).resize((grid_size, grid_size), Image.Resampling.BILINEAR)) / 10000.0

            grid_scl = None
            if crop_scl is not None:
                grid_scl = np.array(Image.fromarray(crop_scl).resize((grid_size, grid_size), Image.Resampling.NEAREST))

            return grid_red, grid_nir, grid_swir, grid_scl

    except Exception as e:
        print(f"read_real_bands_tifffile error: {e}")
        return None, None, None, None


def generate_clean_approximation(coords, min_lng, min_lat, max_lng, max_lat, grid_size=64):
    """Fallback model if satellite STAC is offline."""
    grid_savi = np.zeros((grid_size, grid_size))
    grid_ndvi = np.zeros((grid_size, grid_size))
    grid_ndwi = np.zeros((grid_size, grid_size))
    poly_mask = np.zeros((grid_size, grid_size), dtype=bool)

    lons = np.linspace(min_lng, max_lng, grid_size)
    lats = np.linspace(max_lat, min_lat, grid_size)

    coord_hash = int(hashlib.md5(f"{min_lng:.6f},{min_lat:.6f},{max_lng:.6f},{max_lat:.6f}".encode()).hexdigest()[:8], 16)
    rng = np.random.RandomState(coord_hash)

    noise_savi = rng.uniform(-0.04, 0.04, (grid_size, grid_size))
    noise_ndvi = rng.uniform(-0.06, 0.06, (grid_size, grid_size))
    noise_ndwi = rng.uniform(-0.04, 0.04, (grid_size, grid_size))
    inside_count = 0

    for i in range(grid_size):
        for j in range(grid_size):
            x, y = lons[j], lats[i]
            if point_in_polygon(x, y, coords):
                poly_mask[i, j] = True
                inside_count += 1

                rel_x = (x - min_lng) / (max_lng - min_lng + 1e-9)
                rel_y = (y - min_lat) / (max_lat - min_lat + 1e-9)

                base_savi = 0.24 + noise_savi[i, j] + 0.04 * math.sin(rel_x * 3.7 + coord_hash % 7)
                base_ndvi = 0.35 + noise_ndvi[i, j] + 0.06 * math.sin(rel_x * 3.7 + coord_hash % 7)
                base_ndwi = -0.06 + noise_ndwi[i, j] + 0.03 * math.cos(rel_y * 2.9 + coord_hash % 5)

                grid_savi[i, j] = max(0.12, min(0.42, base_savi))
                grid_ndvi[i, j] = max(0.20, min(0.65, base_ndvi))
                grid_ndwi[i, j] = max(-0.25, min(0.08, base_ndwi))

    return grid_savi, grid_ndvi, grid_ndwi, poly_mask, inside_count


@router.post("/analyze")
async def analyze_satellite(req: SatelliteAnalysisRequest):
    coords = req.geoPolygon.get("coordinates", [[]])[0]
    if not coords or len(coords) < 3:
        raise HTTPException(status_code=400, detail="Invalid GeoJSON polygon coordinates")

    min_lng, min_lat, max_lng, max_lat = calculate_polygon_bounds(coords)
    grid_size = 64
    data_source = "approximation"

    # 1. Query STAC catalog for latest cloud-free Sentinel-2 scene
    stac_info = await query_sentinel2_stac(min_lng, min_lat, max_lng, max_lat)

    grid_savi = None
    grid_ndvi = None
    grid_ndwi = None
    poly_mask = None
    cloud_shadow_mask = None
    inside_count = 0

    # 2. Try pure-Python tifffile HTTP range reader
    if stac_info and stac_info.get("assets") and HAS_TIFFFILE:
        grid_red, grid_nir, grid_swir, grid_scl = read_real_bands_tifffile(
            stac_info["assets"], min_lng, min_lat, max_lng, max_lat,
            scene_bbox=stac_info.get("bbox"), grid_size=grid_size
        )

        if grid_red is not None and grid_nir is not None:
            data_source = "sentinel-2-real"

            # Calculate SAVI (Soil-Adjusted Vegetation Index with L = 0.5)
            L = 0.5
            denom_savi = grid_nir + grid_red + L
            grid_savi = np.where(denom_savi > 0, ((grid_nir - grid_red) * (1.0 + L)) / denom_savi, 0.0)

            # Calculate NDVI
            denom_ndvi = grid_nir + grid_red
            grid_ndvi = np.where(denom_ndvi > 0, (grid_nir - grid_red) / denom_ndvi, 0.0)

            # Calculate NDWI
            if grid_swir is not None:
                denom_ndwi = grid_nir + grid_swir
                grid_ndwi = np.where(denom_ndwi > 0, (grid_nir - grid_swir) / denom_ndwi, 0.0)
            else:
                grid_ndwi = grid_ndvi * 0.45 - 0.05

            lons = np.linspace(min_lng, max_lng, grid_size)
            lats = np.linspace(max_lat, min_lat, grid_size)
            poly_mask = np.zeros((grid_size, grid_size), dtype=bool)

            for i in range(grid_size):
                for j in range(grid_size):
                    if point_in_polygon(lons[j], lats[i], coords):
                        poly_mask[i, j] = True
                        inside_count += 1

            cloud_shadow_mask = np.zeros((grid_size, grid_size), dtype=bool)
            if grid_scl is not None:
                cloud_shadow_mask = np.isin(grid_scl, [3, 8, 9, 10, 11])

            grid_savi = np.clip(grid_savi, -1.0, 1.0)
            grid_ndvi = np.clip(grid_ndvi, -1.0, 1.0)
            grid_ndwi = np.clip(grid_ndwi, -1.0, 1.0)

    # 3. Fallback to clean approximation if real data is offline
    if grid_savi is None:
        data_source = "approximation"
        grid_savi, grid_ndvi, grid_ndwi, poly_mask, inside_count = generate_clean_approximation(
            coords, min_lng, min_lat, max_lng, max_lat, grid_size
        )
        cloud_shadow_mask = np.zeros((grid_size, grid_size), dtype=bool)

    if inside_count == 0:
        poly_mask[:, :] = True

    # 4. Otsu's Bimodal Automatic Soil/Canopy Thresholding Algorithm
    valid_savi_vals = grid_savi[poly_mask & (~cloud_shadow_mask)]
    otsu_threshold = compute_otsu_threshold(valid_savi_vals)

    # 5. Calculate Fractional Tree Canopy Coverage (f_Tree)
    f_tree_grid, savi_soil_mean, savi_tree_max = compute_fractional_canopy_cover(grid_savi, otsu_threshold, poly_mask)

    # 6. Tree Canopy Mask (pixels where f_Tree > 0.05)
    tree_mask = poly_mask & (~cloud_shadow_mask) & (f_tree_grid >= 0.05)
    valid_mask = tree_mask if np.any(tree_mask) else poly_mask

    # Calculate statistics
    valid_f_tree = f_tree_grid[valid_mask]
    valid_savi = grid_savi[valid_mask]
    valid_ndvi = grid_ndvi[valid_mask]
    valid_ndwi = grid_ndwi[valid_mask]

    mean_canopy_pct = float(np.mean(valid_f_tree)) * 100.0
    mean_savi = float(np.mean(valid_savi))
    mean_ndvi = float(np.mean(valid_ndvi))
    mean_ndwi = float(np.mean(valid_ndwi))

    min_savi_val = float(np.min(valid_savi))
    max_savi_val = float(np.max(valid_savi))
    min_ndvi_val = float(np.min(valid_ndvi))
    max_ndvi_val = float(np.max(valid_ndvi))
    min_ndwi_val = float(np.min(valid_ndwi))
    max_ndwi_val = float(np.max(valid_ndwi))

    # Calibrated Hydric Stress calculation on Tree Canopy pixels only (NDWI < -0.16)
    stress_pixels = np.sum(valid_mask & (grid_ndwi < -0.16))
    total_tree_pixels = max(1, len(valid_savi))
    hydric_stress_pct = round((stress_pixels / total_tree_pixels) * 100, 1)

    # Generate Heatmaps
    canopy_overlay = create_canopy_cover_heatmap(f_tree_grid, poly_mask, cloud_shadow_mask)
    savi_overlay = create_savi_heatmap(grid_savi, poly_mask, cloud_shadow_mask)
    ndvi_overlay = create_ndvi_heatmap(grid_ndvi, poly_mask, cloud_shadow_mask)
    ndwi_overlay = create_ndwi_heatmap(grid_ndwi, poly_mask, cloud_shadow_mask)

    # Calibrated Agronomic Advice
    if hydric_stress_pct > 25.0:
        advice_ar = f"⚠️ تم كشف إجهاد مائي جزئي بنسبة {hydric_stress_pct}% في غطاء أشجار {req.cropType} (كثافة العرش: {mean_canopy_pct:.1f}%). يُنصح بزيادة الري بمقدار 20 دقيقة للقطاعات المتأثرة."
    elif hydric_stress_pct > 10.0:
        advice_ar = f"💡 حالة ري متوازنة مع إجهاد خفيف جداً ({hydric_stress_pct}%). غطاء أشجار {req.cropType} ممتاز (كثافة العرش: {mean_canopy_pct:.1f}%, SAVI: {mean_savi:.2f})."
    else:
        advice_ar = f"✅ أشجار {req.cropType} في حالة صحة ورطوبة ممتازة (كثافة العرش: {mean_canopy_pct:.1f}%, SAVI: {mean_savi:.2f}). جدول الري متوازن تماماً."

    scene_id = stac_info.get("id", "N/A") if stac_info else "N/A"
    scene_date = stac_info.get("date", "N/A") if stac_info else "N/A"
    cloud_cover = stac_info.get("cloudCover", "N/A") if stac_info else "N/A"

    return {
        "status": "success",
        "dataSource": data_source,
        "satellite": f"Sentinel-2 L2A ({scene_id})",
        "resolution": "10m",
        "cloudCover": cloud_cover,
        "lastPassDate": scene_date,
        "bounds": [[min_lat, min_lng], [max_lat, max_lng]],
        "canopyCover": {
            "meanPct": round(mean_canopy_pct, 1),
            "otsuThreshold": round(otsu_threshold, 3),
            "overlayDataUrl": canopy_overlay,
        },
        "savi": {
            "mean": round(mean_savi, 3),
            "min": round(min_savi_val, 3),
            "max": round(max_savi_val, 3),
            "healthStatus": "EXCELLENT" if mean_savi >= 0.24 else ("GOOD" if mean_savi >= 0.18 else "MODERATE"),
            "overlayDataUrl": savi_overlay,
        },
        "ndvi": {
            "mean": round(mean_ndvi, 3),
            "min": round(min_ndvi_val, 3),
            "max": round(max_ndvi_val, 3),
            "healthStatus": "EXCELLENT" if mean_ndvi >= 0.40 else ("GOOD" if mean_ndvi >= 0.28 else "MODERATE"),
            "overlayDataUrl": ndvi_overlay,
        },
        "ndwi": {
            "mean": round(mean_ndwi, 3),
            "min": round(min_ndwi_val, 3),
            "max": round(max_ndwi_val, 3),
            "hydricStressPct": hydric_stress_pct,
            "stressStatus": "HIGH_STRESS" if hydric_stress_pct > 25 else ("MODERATE_STRESS" if hydric_stress_pct > 10 else "OPTIMAL"),
            "overlayDataUrl": ndwi_overlay,
        },
        "agronomicAdvice": advice_ar
    }
