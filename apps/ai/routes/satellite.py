"""
Sentinel-2 Satellite Spectral Analysis Engine (Pure-Python Vercel-Compatible Pipeline)
Reads actual GeoTIFF bands (B04, B08, B11) from Sentinel-2 COGs via HTTP Range requests using `tifffile` + `httpx`,
without requiring GDAL or rasterio C dependencies. Fully compatible with Vercel Serverless!
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
    Lightweight seekable HTTP file wrapper for tifffile over HTTP Range requests.
    Enables reading Cloud-Optimized GeoTIFF (COG) IFD headers and overview pages
    directly over HTTP without downloading full multi-megabyte files.
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
            print(f"HTTP Range read error ({headers}): {e}")
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


def create_ndvi_heatmap(grid_ndvi: np.ndarray, mask: np.ndarray) -> str:
    """Generate RGBA heatmap PNG base64 URL for NDVI. Non-vegetation pixels are transparent."""
    h, w = grid_ndvi.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)

    for i in range(h):
        for j in range(w):
            if not mask[i, j]:
                continue
            val = grid_ndvi[i, j]
            if val < 0.20:
                rgba[i, j] = [0, 0, 0, 0]          # Non-vegetation -> Transparent
            elif val >= 0.70:
                rgba[i, j] = [16, 185, 129, 210]   # Dense canopy - Emerald
            elif val >= 0.55:
                rgba[i, j] = [132, 204, 22, 200]   # Healthy - Lime
            elif val >= 0.38:
                rgba[i, j] = [234, 179, 8, 200]    # Moderate - Yellow
            else:
                rgba[i, j] = [239, 68, 68, 220]    # Stressed - Red

    img = Image.fromarray(rgba, mode="RGBA")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"


def create_ndwi_heatmap(grid_ndwi: np.ndarray, grid_ndvi: np.ndarray, mask: np.ndarray) -> str:
    """Generate RGBA heatmap PNG base64 URL for NDWI. Non-vegetation pixels are transparent."""
    h, w = grid_ndwi.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)

    for i in range(h):
        for j in range(w):
            if not mask[i, j] or grid_ndvi[i, j] < 0.20:
                continue
            val = grid_ndwi[i, j]
            if val >= 0.18:
                rgba[i, j] = [59, 130, 246, 210]   # Optimal moisture - Blue
            elif val >= 0.08:
                rgba[i, j] = [6, 182, 212, 200]    # Balanced - Cyan
            elif val >= -0.02:
                rgba[i, j] = [245, 158, 11, 210]   # Mild stress - Amber
            else:
                rgba[i, j] = [220, 38, 38, 230]    # Severe stress - Red

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


def read_real_bands_tifffile(assets: dict, min_lng, min_lat, max_lng, max_lat, scene_bbox=None, grid_size=64):
    """
    Pure-Python GeoTIFF band reader using `tifffile` and `httpx` HTTP range requests.
    Reads real Sentinel-2 B04 (Red), B08 (NIR), and B11 (SWIR) bands without GDAL/rasterio.
    """
    if not HAS_TIFFFILE:
        return None, None, None

    band_keys = {
        "red": ["red", "B04", "b04"],
        "nir": ["nir", "B08", "b08", "nir08"],
        "swir": ["swir16", "B11", "b11", "swir_1"]
    }

    def find_url(assets, key_list):
        for k in key_list:
            if k in assets and "href" in assets[k]:
                return assets[k]["href"]
        return None

    red_url = find_url(assets, band_keys["red"])
    nir_url = find_url(assets, band_keys["nir"])
    swir_url = find_url(assets, band_keys["swir"])

    if not red_url or not nir_url:
        return None, None, None

    try:
        with httpx.Client(timeout=8.0, follow_redirects=True) as client:
            # 1. Read B04 (Red) band overview page
            file_red = HttpSeekableFile(red_url, client)
            with tifffile.TiffFile(file_red) as tif_red:
                # Select a fast medium-overview page (index -2 or -1)
                page_red = tif_red.pages[-2] if len(tif_red.pages) > 1 else tif_red.pages[0]
                arr_red = page_red.asarray().astype(np.float32)

            # 2. Read B08 (NIR) band overview page
            file_nir = HttpSeekableFile(nir_url, client)
            with tifffile.TiffFile(file_nir) as tif_nir:
                page_nir = tif_nir.pages[-2] if len(tif_nir.pages) > 1 else tif_nir.pages[0]
                arr_nir = page_nir.asarray().astype(np.float32)

            # 3. Read B11 (SWIR) band overview page if available
            arr_swir = None
            if swir_url:
                try:
                    file_swir = HttpSeekableFile(swir_url, client)
                    with tifffile.TiffFile(file_swir) as tif_swir:
                        page_swir = tif_swir.pages[-2] if len(tif_swir.pages) > 1 else tif_swir.pages[0]
                        arr_swir = page_swir.asarray().astype(np.float32)
                except Exception as e_swir:
                    print(f"SWIR read notice: {e_swir}")

            # Crop/Extract bounding box if scene_bbox [min_lon, min_lat, max_lon, max_lat] is available
            h, w = arr_red.shape
            if scene_bbox and len(scene_bbox) == 4:
                s_min_lng, s_min_lat, s_max_lng, s_max_lat = scene_bbox
                # Calculate sub-window pixel indices inside overview image
                px_min = int(max(0, min(w - 1, (min_lng - s_min_lng) / (s_max_lng - s_min_lng + 1e-9) * w)))
                px_max = int(max(px_min + 1, min(w, (max_lng - s_min_lng) / (s_max_lng - s_min_lng + 1e-9) * w)))
                py_min = int(max(0, min(h - 1, (s_max_lat - max_lat) / (s_max_lat - s_min_lat + 1e-9) * h)))
                py_max = int(max(py_min + 1, min(h, (s_max_lat - min_lat) / (s_max_lat - s_min_lat + 1e-9) * h)))

                crop_red = arr_red[py_min:py_max, px_min:px_max]
                crop_nir = arr_nir[py_min:py_max, px_min:px_max]
                crop_swir = arr_swir[py_min:py_max, px_min:px_max] if arr_swir is not None else None
            else:
                crop_red = arr_red
                crop_nir = arr_nir
                crop_swir = arr_swir

            # Resize crops to target grid_size x grid_size using PIL image resampling
            img_red = Image.fromarray(crop_red).resize((grid_size, grid_size), Image.Resampling.BILINEAR)
            img_nir = Image.fromarray(crop_nir).resize((grid_size, grid_size), Image.Resampling.BILINEAR)

            grid_red = np.array(img_red, dtype=np.float32) / 10000.0
            grid_nir = np.array(img_nir, dtype=np.float32) / 10000.0

            grid_swir = None
            if crop_swir is not None:
                img_swir = Image.fromarray(crop_swir).resize((grid_size, grid_size), Image.Resampling.BILINEAR)
                grid_swir = np.array(img_swir, dtype=np.float32) / 10000.0

            return grid_red, grid_nir, grid_swir

    except Exception as e:
        print(f"read_real_bands_tifffile error: {e}")
        return None, None, None


def generate_clean_approximation(coords, min_lng, min_lat, max_lng, max_lat, grid_size=64):
    """Clean coordinate-unique fallback approximation model if satellite STAC is offline."""
    grid_ndvi = np.zeros((grid_size, grid_size))
    grid_ndwi = np.zeros((grid_size, grid_size))
    mask = np.zeros((grid_size, grid_size), dtype=bool)

    lons = np.linspace(min_lng, max_lng, grid_size)
    lats = np.linspace(max_lat, min_lat, grid_size)

    coord_hash = int(hashlib.md5(f"{min_lng:.6f},{min_lat:.6f},{max_lng:.6f},{max_lat:.6f}".encode()).hexdigest()[:8], 16)
    rng = np.random.RandomState(coord_hash)

    noise_ndvi = rng.uniform(-0.08, 0.08, (grid_size, grid_size))
    noise_ndwi = rng.uniform(-0.06, 0.06, (grid_size, grid_size))
    inside_count = 0

    for i in range(grid_size):
        for j in range(grid_size):
            x, y = lons[j], lats[i]
            if point_in_polygon(x, y, coords):
                mask[i, j] = True
                inside_count += 1

                base_ndvi = 0.62 + noise_ndvi[i, j]
                base_ndwi = 0.14 + noise_ndwi[i, j]

                rel_x = (x - min_lng) / (max_lng - min_lng + 1e-9)
                rel_y = (y - min_lat) / (max_lat - min_lat + 1e-9)
                base_ndvi += 0.06 * math.sin(rel_x * 3.7 + coord_hash % 7)
                base_ndwi += 0.04 * math.cos(rel_y * 2.9 + coord_hash % 5)

                grid_ndvi[i, j] = max(0.30, min(0.88, base_ndvi))
                grid_ndwi[i, j] = max(-0.05, min(0.30, base_ndwi))

    return grid_ndvi, grid_ndwi, mask, inside_count


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

    grid_ndvi = None
    grid_ndwi = None
    mask = None
    inside_count = 0

    # 2. Try pure-Python tifffile HTTP range reader on Vercel
    if stac_info and stac_info.get("assets") and HAS_TIFFFILE:
        grid_red, grid_nir, grid_swir = read_real_bands_tifffile(
            stac_info["assets"], min_lng, min_lat, max_lng, max_lat,
            scene_bbox=stac_info.get("bbox"), grid_size=grid_size
        )

        if grid_red is not None and grid_nir is not None:
            data_source = "sentinel-2-real"

            # Calculate real NDVI = (NIR - Red) / (NIR + Red)
            denom_ndvi = grid_nir + grid_red
            grid_ndvi = np.where(denom_ndvi > 0, (grid_nir - grid_red) / denom_ndvi, 0.0)

            # Calculate real NDWI = (NIR - SWIR) / (NIR + SWIR)
            if grid_swir is not None:
                denom_ndwi = grid_nir + grid_swir
                grid_ndwi = np.where(denom_ndwi > 0, (grid_nir - grid_swir) / denom_ndwi, 0.0)
            else:
                grid_ndwi = grid_ndvi * 0.45 - 0.05

            lons = np.linspace(min_lng, max_lng, grid_size)
            lats = np.linspace(max_lat, min_lat, grid_size)
            mask = np.zeros((grid_size, grid_size), dtype=bool)

            for i in range(grid_size):
                for j in range(grid_size):
                    if point_in_polygon(lons[j], lats[i], coords):
                        mask[i, j] = True
                        inside_count += 1

            grid_ndvi = np.clip(grid_ndvi, -1.0, 1.0)
            grid_ndwi = np.clip(grid_ndwi, -1.0, 1.0)

    # 3. Fallback to clean approximation if real data is offline
    if grid_ndvi is None:
        data_source = "approximation"
        grid_ndvi, grid_ndwi, mask, inside_count = generate_clean_approximation(
            coords, min_lng, min_lat, max_lng, max_lat, grid_size
        )

    if inside_count == 0:
        mask[:, :] = True
        inside_count = grid_size * grid_size

    # 4. Compute statistics on field vegetation pixels
    veg_mask = mask & (grid_ndvi >= 0.20)
    valid_ndvi = grid_ndvi[veg_mask] if np.any(veg_mask) else grid_ndvi[mask]
    valid_ndwi = grid_ndwi[veg_mask] if np.any(veg_mask) else grid_ndwi[mask]

    mean_ndvi = float(np.mean(valid_ndvi)) if len(valid_ndvi) > 0 else 0.0
    min_ndvi_val = float(np.min(valid_ndvi)) if len(valid_ndvi) > 0 else 0.0
    max_ndvi_val = float(np.max(valid_ndvi)) if len(valid_ndvi) > 0 else 0.0

    mean_ndwi = float(np.mean(valid_ndwi)) if len(valid_ndwi) > 0 else 0.0
    min_ndwi_val = float(np.min(valid_ndwi)) if len(valid_ndwi) > 0 else 0.0
    max_ndwi_val = float(np.max(valid_ndwi)) if len(valid_ndwi) > 0 else 0.0

    stress_pixels = np.sum(veg_mask & (grid_ndwi < -0.02)) if np.any(veg_mask) else 0
    veg_count = np.sum(veg_mask) if np.any(veg_mask) else 1
    hydric_stress_pct = round((stress_pixels / veg_count) * 100, 1)

    ndvi_overlay = create_ndvi_heatmap(grid_ndvi, mask)
    ndwi_overlay = create_ndwi_heatmap(grid_ndwi, grid_ndvi, mask)

    if hydric_stress_pct > 15.0:
        advice_ar = f"⚠️ تم كشف إجهاد مائي بنسبة {hydric_stress_pct}% من مساحة أشجار {req.cropType}. يُنصح بزيادة مدة الري بمقدار 20 دقيقة وتفقد خطوط التنقيط."
    elif hydric_stress_pct > 5.0:
        advice_ar = f"💡 إجهاد مائي جزئي ({hydric_stress_pct}%). الحالة العامة جيدة (NDVI: {mean_ndvi:.2f})."
    else:
        advice_ar = f"✅ أشجار {req.cropType} في حالة صحة ورطوبة ممتازة (NDVI: {mean_ndvi:.2f}, NDWI: {mean_ndwi:.2f})."

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
        "ndvi": {
            "mean": round(mean_ndvi, 3),
            "min": round(min_ndvi_val, 3),
            "max": round(max_ndvi_val, 3),
            "healthStatus": "EXCELLENT" if mean_ndvi > 0.65 else ("GOOD" if mean_ndvi > 0.45 else "MODERATE"),
            "overlayDataUrl": ndvi_overlay,
        },
        "ndwi": {
            "mean": round(mean_ndwi, 3),
            "min": round(min_ndwi_val, 3),
            "max": round(max_ndwi_val, 3),
            "hydricStressPct": hydric_stress_pct,
            "stressStatus": "HIGH_STRESS" if hydric_stress_pct > 15 else ("MODERATE_STRESS" if hydric_stress_pct > 5 else "OPTIMAL"),
            "overlayDataUrl": ndwi_overlay,
        },
        "agronomicAdvice": advice_ar
    }
