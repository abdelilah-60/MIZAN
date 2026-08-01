import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_agronomy_calculate_irrigation_and_fertilizer():
    payload = {
        "crop": "Picholine Marocaine",
        "stage": "CROISSANCE",
        "tmax": 34.0,
        "tmin": 20.0,
        "precipitation": 0.0,
        "tree_density": 200,
        "drippers_per_tree": 4,
        "dripper_flow_rate": 8.0,
        "efficiency": 0.90,
        "target_yield": 8.0,
        "bearing_status": "ON_YEAR",
        "soil_ph": 7.5,
        "soil_organic_matter": 1.2,
        "soil_nitrogen": 15.0,
        "soil_phosphorus": 10.0,
        "soil_potassium": 150.0
    }

    response = client.post("/api/agronomy/calculate", json=payload)
    assert response.status_code == 200

    data = response.json()
    assert "irrigation" in data
    assert "fertilization" in data

    irr = data["irrigation"]
    assert "durationMinutes" in irr or "duration_minutes_day" in irr or "etc" in irr

    fert = data["fertilization"]
    assert len(fert) > 0
