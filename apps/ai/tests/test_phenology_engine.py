import pytest
from engine.phenology_engine import (
    analyze_phenology_profile,
    generate_synthetic_phenology_series,
)

def test_analyze_phenology_profile_evergreen():
    series = [
        {"date": f"2026-05-{i+1:02d}", "ndvi": 0.48, "savi": 0.32}
        for i in range(12)
    ]
    result = analyze_phenology_profile(series)

    assert "landCoverClass" in result
    assert result["landCoverClass"] == "EVERGREEN_TREE_ORCHARD"
    assert result["ndviMax"] >= 0.40

def test_analyze_phenology_profile_bare_soil():
    series = [
        {"date": f"2026-05-{i+1:02d}", "ndvi": 0.10, "savi": 0.08}
        for i in range(12)
    ]
    result = analyze_phenology_profile(series)

    assert result["landCoverClass"] == "BARE_FALLOW_LAND"

def test_generate_synthetic_phenology_series():
    coords = [[-5.55, 33.89], [-5.54, 33.89], [-5.54, 33.88], [-5.55, 33.89]]
    series = generate_synthetic_phenology_series(coords=coords, crop_type="Olive", mean_savi=0.26)
    assert len(series) > 0
    assert "ndvi" in series[0]
    assert "savi" in series[0]
