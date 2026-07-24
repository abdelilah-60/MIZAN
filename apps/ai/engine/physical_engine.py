"""
Mizan Universal Satellite Engine v5.0 - Physical Layer
------------------------------------------------------
Pure physical spectral unmixing, BSI calculation, and 20m->10m spatial resampling.
Decoupled from agronomic interpretation.
"""

import numpy as np

def resample_20m_to_10m(band_20m: np.ndarray, target_shape: tuple) -> np.ndarray:
    """Fast bilinear interpolation to resample 20m bands (B05, B11, B12) to match 10m grid."""
    if band_20m is None:
        return None
    th, tw = target_shape
    h, w = band_20m.shape
    if h == th and w == tw:
        return band_20m.astype(np.float32)
    
    # Bilinear expansion
    row_indices = np.linspace(0, h - 1, th)
    col_indices = np.linspace(0, w - 1, tw)
    
    r0 = np.floor(row_indices).astype(int)
    r1 = np.minimum(r0 + 1, h - 1)
    c0 = np.floor(col_indices).astype(int)
    c1 = np.minimum(c0 + 1, w - 1)
    
    dr = (row_indices - r0)[:, None]
    dc = (col_indices - c0)[None, :]
    
    top = (1 - dc) * band_20m[r0[:, None], c0[None, :]] + dc * band_20m[r0[:, None], c1[None, :]]
    bottom = (1 - dc) * band_20m[r1[:, None], c0[None, :]] + dc * band_20m[r1[:, None], c1[None, :]]
    
    return ((1 - dr) * top + dr * bottom).astype(np.float32)


def calculate_bare_soil_index(grid_blue: np.ndarray, grid_red: np.ndarray, grid_nir: np.ndarray, grid_swir2: np.ndarray) -> np.ndarray:
    """
    Bare Soil Index (BSI):
    BSI = ((SWIR2 + Red) - (NIR + Blue)) / ((SWIR2 + Red) + (NIR + Blue))
    Detects exposed soil silica, limestone, and iron oxides. High BSI (>0.02) indicates pure bare soil.
    """
    if grid_swir2 is None or grid_blue is None:
        denom = grid_red + grid_nir + 1e-9
        return (grid_red - grid_nir) / denom

    num = (grid_swir2 + grid_red) - (grid_nir + grid_blue)
    denom = (grid_swir2 + grid_red) + (grid_nir + grid_blue) + 1e-9
    return np.clip(num / denom, -1.0, 1.0)


def unmix_spectral_endmembers(
    grid_red: np.ndarray,
    grid_nir: np.ndarray,
    grid_swir1: np.ndarray,
    poly_mask: np.ndarray
) -> tuple:
    """
    3-Endmember Fully Constrained Linear Spectral Unmixing (FCLS):
    Decomposes pixel reflectance into 3 pure fractions:
      - f_PV: Photosynthetic Vegetation (Green Leaves)
      - f_Soil: Bare Soil / Minerals
      - f_NPV: Non-Photosynthetic Vegetation (Dry Straw / Cellulose)
    Subject to f_PV + f_Soil + f_NPV = 1.0 and f >= 0.
    """
    h, w = grid_red.shape
    f_pv = np.zeros((h, w), dtype=np.float32)
    f_soil = np.zeros((h, w), dtype=np.float32)
    f_npv = np.zeros((h, w), dtype=np.float32)

    valid_pixels = poly_mask & (grid_red > 0) & (grid_nir > 0)
    if not np.any(valid_pixels):
        return f_pv, f_soil, f_npv

    # Extract dynamic local soil endmember from lowest 10% NIR pixels
    nir_valid = grid_nir[valid_pixels]
    red_valid = grid_red[valid_pixels]
    swir_valid = grid_swir1[valid_pixels] if grid_swir1 is not None else red_valid * 0.9

    soil_idx = np.argsort(nir_valid)[:max(1, int(len(nir_valid) * 0.10))]
    e_soil = np.array([
        float(np.mean(red_valid[soil_idx])),
        float(np.mean(nir_valid[soil_idx])),
        float(np.mean(swir_valid[soil_idx]))
    ], dtype=np.float32)

    # Pure green canopy endmember (High NIR, low Red, low SWIR)
    e_pv = np.array([0.03, 0.45, 0.12], dtype=np.float32)

    # Pure NPV dry straw endmember (High Red, high SWIR, moderate NIR)
    e_npv = np.array([0.22, 0.28, 0.38], dtype=np.float32)

    # Matrix E [3x3]
    E = np.column_stack([e_pv, e_soil, e_npv])

    try:
        E_inv = np.linalg.pinv(E)
    except np.linalg.LinAlgError:
        E_inv = np.eye(3, dtype=np.float32)

    for i in range(h):
        for j in range(w):
            if not poly_mask[i, j]:
                continue
            
            r_red = grid_red[i, j]
            r_nir = grid_nir[i, j]
            r_swir = grid_swir1[i, j] if grid_swir1 is not None else r_red * 0.9
            
            obs = np.array([r_red, r_nir, r_swir], dtype=np.float32)
            fractions = np.dot(E_inv, obs)
            
            # Apply Non-Negativity and Sum-To-One normalization
            fractions = np.maximum(fractions, 0.0)
            total = np.sum(fractions)
            if total > 0:
                fractions /= total
            else:
                fractions = np.array([0.0, 1.0, 0.0], dtype=np.float32)
                
            f_pv[i, j] = fractions[0]
            f_soil[i, j] = fractions[1]
            f_npv[i, j] = fractions[2]

    return f_pv, f_soil, f_npv
