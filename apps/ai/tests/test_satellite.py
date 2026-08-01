import pytest
import numpy as np
from routes.satellite import (
    wgs84_to_utm,
    compute_otsu_threshold,
    erode_mask,
    apply_spectral_decision_tree,
)

def test_wgs84_to_utm_morocco():
    # lon=-5.55, lat=33.89
    lon, lat = -5.55, 33.89
    easting, northing, zone = wgs84_to_utm(lon, lat)
    
    assert zone in [29, 30]
    assert easting > 100000
    assert northing > 1000000

def test_compute_otsu_threshold_bimodal():
    # Create synthetic bimodal distribution
    soil_values = np.random.normal(0.1, 0.02, 500)
    canopy_values = np.random.normal(0.6, 0.05, 500)
    data = np.clip(np.concatenate([soil_values, canopy_values]), 0, 1)
    
    threshold = compute_otsu_threshold(data)
    assert 0.10 <= threshold <= 0.50

def test_erode_mask_basic():
    mask = np.zeros((10, 10), dtype=bool)
    mask[2:8, 2:8] = True
    
    eroded = erode_mask(mask, iterations=1)
    assert eroded.sum() < mask.sum()
    assert eroded[2, 2] == False
    assert eroded[4, 4] == True

def test_apply_spectral_decision_tree_olive():
    shape = (20, 20)
    
    savi = np.full(shape, 0.08)
    savi[5:15, 5:15] = 0.32
    
    ndvi = np.full(shape, 0.10)
    ndvi[5:15, 5:15] = 0.45
    
    ndre = np.full(shape, 0.01)
    ndre[5:15, 5:15] = 0.08
    
    ndti = np.full(shape, 0.05)
    poly_mask = np.ones(shape, dtype=bool)
    
    result = apply_spectral_decision_tree(
        grid_savi=savi,
        grid_ndvi=ndvi,
        grid_ndti=ndti,
        grid_ndre=ndre,
        poly_mask=poly_mask,
        crop_type="Picholine Marocaine"
    )
    
    assert isinstance(result, np.ndarray) or isinstance(result, dict)
