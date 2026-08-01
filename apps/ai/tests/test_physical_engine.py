import pytest
import numpy as np
from engine.physical_engine import (
    calculate_bare_soil_index,
    unmix_spectral_endmembers,
    resample_20m_to_10m,
)

def test_calculate_bare_soil_index():
    shape = (5, 5)
    swir2 = np.full(shape, 0.25)
    red = np.full(shape, 0.20)
    nir = np.full(shape, 0.15)
    blue = np.full(shape, 0.10)

    # Signature: calculate_bare_soil_index(blue, red, nir, swir2)
    bsi = calculate_bare_soil_index(blue, red, nir, swir2)
    assert bsi.shape == shape

def test_unmix_spectral_endmembers_sum_constraint():
    shape = (10, 10)
    red = np.full(shape, 0.10)
    nir = np.full(shape, 0.40)
    swir1 = np.full(shape, 0.15)
    mask = np.ones(shape, dtype=bool)

    # Signature: unmix_spectral_endmembers(red, nir, swir1, poly_mask)
    f_pv, f_soil, f_npv = unmix_spectral_endmembers(red, nir, swir1, mask)
    
    assert f_pv.shape == shape
    assert f_soil.shape == shape
    assert f_npv.shape == shape

    total_fraction = f_pv + f_soil + f_npv
    assert np.allclose(total_fraction, 1.0, atol=1e-4)

def test_resample_20m_to_10m():
    data_20m = np.arange(25, dtype=float).reshape((5, 5))
    data_10m = resample_20m_to_10m(data_20m, target_shape=(10, 10))

    assert data_10m.shape == (10, 10)
