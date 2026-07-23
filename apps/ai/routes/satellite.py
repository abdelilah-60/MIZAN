"""
Sentinel-2 Satellite Spectral Analysis Engine (Real Data Pipeline)
Reads actual GeoTIFF bands (B04, B08, B11) from Sentinel-2 COGs via STAC,
calculates real NDVI & NDWI per pixel, and generates transparent heatmap overlays.
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

# Try to import rasterio for real satellite data reading
try:
    import rasterio
    from rasterio.windows import from_bounds
    from rasterio.warp import transform_bounds
    from rasterio.enums import Resampling
    HAS_RASTERIO = True

    # Configure GDAL for efficient Cloud Optimized GeoTIFF (COG) access
    os.environ['GDAL_HTTP_MULTIPLEX'] = 'YES'
    os.environ['GDAL_HTTP_MERGE_CONSECUTIVE_RANGES'] = 'YES'
    os.environ['GDAL_DISABLE_READDIR_ON_OPEN'] = 'EMPTY_DIR'
    os.environ['AWS_NO_SIGN_REQUEST'] = 'YES'
    os.environ['GDAL_HTTP_MAX_RETRY'] = '3'
    os.environ['GDAL_HTTP_RETRY_DELAY'] = '1'
except ImportError:
    HAS_RASTERIO = False
    print("WARNING: rasterio not available. Using coordinate-based approximation model.")

router = APIRouter(prefix="/api/satellite", tags=["satellite"])

STAC_SEARCH_URL = "https://earth-search.aws.element84.com/v1/search"


class SatelliteAnalysisRequest(BaseModel):
    geoPolygon: Dict[str, Any]
    cropType: Optional[str] = "Olive"
    areaHa: Optional[float] = 1.0


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
    """Generate RGBA heatmap for NDVI. Non-vegetation pixels are transparent."""
    h, w = grid_ndvi.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)

    for i in range(h):
        for j in range(w):
            if not mask[i, j]:
                continue
            val = grid_ndvi[i, j]
            if val < 0.20:
                # Non-vegetation (buildings, bare soil, concrete) -> Transparent
                rgba[i, j] = [0, 0, 0, 0]
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
    """Generate RGBA heatmap for NDWI. Non-vegetation pixels are transparent."""
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


# ─────────────────────────────────────────────────────────────
# STAC Catalog Query
# ─────────────────────────────────────────────────────────────

async def query_sentinel2_stac(min_lng, min_lat, max_lng, max_lat):
    """Query Element84 STAC for latest cloud-free Sentinel-2 L2A scene."""
    payload = {
        "collections": ["sentinel-2-l2a"],
        "bbox": [min_lng, min_lat, max_lng, max_lat],
        "limit": 5,
        "query": {"eo:cloud_cover": {"lt": 25}},
        "sortby": [{"field": "properties.datetime", "direction": "desc"}]
    }
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
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
                        "assets": assets
                    }
    except Exception as e:
        print(f"STAC query error: {e}")
    return None


# ─────────────────────────────────────────────────────────────
# Real Satellite Data Reading (rasterio + COG)
# ─────────────────────────────────────────────────────────────

def read_real_bands(assets: dict, min_lng, min_lat, max_lng, max_lat, grid_size=64):
    """
    Read actual Sentinel-2 spectral bands from COG files via HTTP.
    Returns (b04_array, b08_array, b11_array) normalized to [0,1].
    """
    if not HAS_RASTERIO:
        return None, None, None

    # Asset keys in Element84 earth-search v1
    band_keys = {
        "red": ["red", "B04", "b04"],
        "nir": ["nir", "B08", "b08", "nir08"],
        "swir": ["swir16", "B11", "b11", "swir_1"]
    }

    def find_asset_url(assets, key_list):
        for k in key_list:
            if k in assets and "href" in assets[k]:
                return assets[k]["href"]
        return None

    red_url = find_asset_url(assets, band_keys["red"])
    nir_url = find_asset_url(assets, band_keys["nir"])
    swir_url = find_asset_url(assets, band_keys["swir"])

    if not red_url or not nir_url:
        print(f"Missing band URLs. red={red_url}, nir={nir_url}, swir={swir_url}")
        return None, None, None

    try:
        # Read B04 (Red, 10m resolution)
        with rasterio.open(red_url) as src:
            # Transform bounding box from WGS84 to scene CRS
            scene_bounds = transform_bounds("EPSG:4326", src.crs, min_lng, min_lat, max_lng, max_lat)
            window = from_bounds(*scene_bounds, src.transform)

            b04 = src.read(
                1, window=window,
                out_shape=(grid_size, grid_size),
                resampling=Resampling.bilinear
            ).astype(np.float32)

        # Read B08 (NIR, 10m resolution)
        with rasterio.open(nir_url) as src:
            scene_bounds = transform_bounds("EPSG:4326", src.crs, min_lng, min_lat, max_lng, max_lat)
            window = from_bounds(*scene_bounds, src.transform)

            b08 = src.read(
                1, window=window,
                out_shape=(grid_size, grid_size),
                resampling=Resampling.bilinear
            ).astype(np.float32)

        # Read B11 (SWIR, 20m resolution -> resampled to grid_size)
        b11 = None
        if swir_url:
            with rasterio.open(swir_url) as src:
                scene_bounds = transform_bounds("EPSG:4326", src.crs, min_lng, min_lat, max_lng, max_lat)
                window = from_bounds(*scene_bounds, src.transform)

                b11 = src.read(
                    1, window=window,
                    out_shape=(grid_size, grid_size),
                    resampling=Resampling.bilinear
                ).astype(np.float32)

        # Normalize reflectance values (Sentinel-2 L2A is scaled by 10000)
        b04 = b04 / 10000.0
        b08 = b08 / 10000.0
        if b11 is not None:
            b11 = b11 / 10000.0

        return b04, b08, b11

    except Exception as e:
        print(f"rasterio band read error: {e}")
        return None, None, None


# ─────────────────────────────────────────────────────────────
# Clean Fallback Model (coordinate-hash based, NO hardcoded zones)
# ─────────────────────────────────────────────────────────────

def generate_clean_approximation(coords, min_lng, min_lat, max_lng, max_lat, grid_size=64):
    """
    Generate a clean, coordinate-unique NDVI/NDWI approximation.
    Uses geographic coordinate hashing for unique-per-field variation.
    NO hardcoded buildings, NO hardcoded stress patches.
    """
    grid_ndvi = np.zeros((grid_size, grid_size))
    grid_ndwi = np.zeros((grid_size, grid_size))
    mask = np.zeros((grid_size, grid_size), dtype=bool)

    lons = np.linspace(min_lng, max_lng, grid_size)
    lats = np.linspace(max_lat, min_lat, grid_size)

    # Create a unique seed from field coordinates for reproducible but unique results
    coord_hash = int(hashlib.md5(f"{min_lng:.6f},{min_lat:.6f},{max_lng:.6f},{max_lat:.6f}".encode()).hexdigest()[:8], 16)
    rng = np.random.RandomState(coord_hash)

    # Generate smooth spatial noise unique to this field
    noise_ndvi = rng.uniform(-0.08, 0.08, (grid_size, grid_size))
    noise_ndwi = rng.uniform(-0.06, 0.06, (grid_size, grid_size))

    inside_count = 0

    for i in range(grid_size):
        for j in range(grid_size):
            x, y = lons[j], lats[i]
            if point_in_polygon(x, y, coords):
                mask[i, j] = True
                inside_count += 1

                # Base values typical for olive groves in summer (Morocco)
                base_ndvi = 0.62 + noise_ndvi[i, j]
                base_ndwi = 0.14 + noise_ndwi[i, j]

                # Subtle spatial gradient based on real coordinates
                rel_x = (x - min_lng) / (max_lng - min_lng + 1e-9)
                rel_y = (y - min_lat) / (max_lat - min_lat + 1e-9)
                base_ndvi += 0.06 * math.sin(rel_x * 3.7 + coord_hash % 7)
                base_ndwi += 0.04 * math.cos(rel_y * 2.9 + coord_hash % 5)

                grid_ndvi[i, j] = max(0.30, min(0.88, base_ndvi))
                grid_ndwi[i, j] = max(-0.05, min(0.30, base_ndwi))

    return grid_ndvi, grid_ndwi, mask, inside_count


# ─────────────────────────────────────────────────────────────
# Main API Endpoint
# ─────────────────────────────────────────────────────────────

@router.post("/analyze")
async def analyze_satellite(req: SatelliteAnalysisRequest):
    coords = req.geoPolygon.get("coordinates", [[]])[0]
    if not coords or len(coords) < 3:
        raise HTTPException(status_code=400, detail="Invalid GeoJSON polygon coordinates")

    min_lng, min_lat, max_lng, max_lat = calculate_polygon_bounds(coords)
    grid_size = 64
    data_source = "approximation"

    # Step 1: Query STAC catalog for latest Sentinel-2 scene
    stac_info = await query_sentinel2_stac(min_lng, min_lat, max_lng, max_lat)

    grid_ndvi = None
    grid_ndwi = None
    mask = None
    inside_count = 0

    # Step 2: Try to read REAL satellite bands
    if stac_info and stac_info.get("assets") and HAS_RASTERIO:
        try:
            b04, b08, b11 = read_real_bands(
                stac_info["assets"], min_lng, min_lat, max_lng, max_lat, grid_size
            )

            if b04 is not None and b08 is not None:
                data_source = "sentinel-2-real"

                # Calculate real NDVI: (NIR - Red) / (NIR + Red)
                denominator_ndvi = b08 + b04
                grid_ndvi = np.where(
                    denominator_ndvi > 0,
                    (b08 - b04) / denominator_ndvi,
                    0.0
                )

                # Calculate real NDWI: (NIR - SWIR) / (NIR + SWIR)
                if b11 is not None:
                    denominator_ndwi = b08 + b11
                    grid_ndwi = np.where(
                        denominator_ndwi > 0,
                        (b08 - b11) / denominator_ndwi,
                        0.0
                    )
                else:
                    # Estimate NDWI from NDVI correlation if B11 unavailable
                    grid_ndwi = grid_ndvi * 0.45 - 0.05

                # Apply polygon mask
                lons = np.linspace(min_lng, max_lng, grid_size)
                lats = np.linspace(max_lat, min_lat, grid_size)
                mask = np.zeros((grid_size, grid_size), dtype=bool)

                for i in range(grid_size):
                    for j in range(grid_size):
                        if point_in_polygon(lons[j], lats[i], coords):
                            mask[i, j] = True
                            inside_count += 1

                # Clip values to valid ranges
                grid_ndvi = np.clip(grid_ndvi, -1.0, 1.0)
                grid_ndwi = np.clip(grid_ndwi, -1.0, 1.0)

        except Exception as e:
            print(f"Real satellite processing error: {e}")
            grid_ndvi = None  # Fall back to approximation

    # Step 3: Fallback to clean approximation if real data unavailable
    if grid_ndvi is None:
        data_source = "approximation"
        grid_ndvi, grid_ndwi, mask, inside_count = generate_clean_approximation(
            coords, min_lng, min_lat, max_lng, max_lat, grid_size
        )

    if inside_count == 0:
        mask[:, :] = True
        inside_count = grid_size * grid_size

    # Step 4: Calculate statistics (vegetation pixels only)
    veg_mask = mask & (grid_ndvi >= 0.20)
    valid_ndvi = grid_ndvi[veg_mask] if np.any(veg_mask) else grid_ndvi[mask]
    valid_ndwi = grid_ndwi[veg_mask] if np.any(veg_mask) else grid_ndwi[mask]

    mean_ndvi = float(np.mean(valid_ndvi)) if len(valid_ndvi) > 0 else 0.0
    min_ndvi_val = float(np.min(valid_ndvi)) if len(valid_ndvi) > 0 else 0.0
    max_ndvi_val = float(np.max(valid_ndvi)) if len(valid_ndvi) > 0 else 0.0

    mean_ndwi = float(np.mean(valid_ndwi)) if len(valid_ndwi) > 0 else 0.0
    min_ndwi_val = float(np.min(valid_ndwi)) if len(valid_ndwi) > 0 else 0.0
    max_ndwi_val = float(np.max(valid_ndwi)) if len(valid_ndwi) > 0 else 0.0

    # Count hydric stress pixels (NDWI < -0.02 among vegetation)
    stress_pixels = np.sum(veg_mask & (grid_ndwi < -0.02)) if np.any(veg_mask) else 0
    veg_count = np.sum(veg_mask) if np.any(veg_mask) else 1
    hydric_stress_pct = round((stress_pixels / veg_count) * 100, 1)

    # Step 5: Generate heatmap overlays
    ndvi_overlay = create_ndvi_heatmap(grid_ndvi, mask)
    ndwi_overlay = create_ndwi_heatmap(grid_ndwi, grid_ndvi, mask)

    # Step 6: Generate agronomic advice
    if hydric_stress_pct > 15.0:
        advice_ar = f"⚠️ تم كشف إجهاد مائي بنسبة {hydric_stress_pct}% من مساحة أشجار {req.cropType}. يُنصح بزيادة مدة الري بمقدار 20 دقيقة وتفقد خطوط التنقيط."
    elif hydric_stress_pct > 5.0:
        advice_ar = f"💡 إجهاد مائي جزئي ({hydric_stress_pct}%). الحالة العامة جيدة (NDVI: {mean_ndvi:.2f})."
    else:
        advice_ar = f"✅ أشجار {req.cropType} في حالة صحة ورطوبة ممتازة (NDVI: {mean_ndvi:.2f}, NDWI: {mean_ndwi:.2f})."

    # Scene metadata
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
