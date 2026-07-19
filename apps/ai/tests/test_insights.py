from fastapi.testclient import TestClient
from tests.conftest import MockSession


class TestRiskAnalysis:
    def test_no_risks_when_condition_normal_and_crop_safe(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([])

        response = client.post("/api/insights/", json={
            "crop": "Wheat",
            "condition": "Normal"
        })

        assert response.status_code == 200
        data = response.json()
        assert data["crop"] == "Wheat"
        assert data["risks_found"] == []
        assert "bonne sant" in data["advice"].lower()

    def test_disease_detected_when_condition_triggers_vulnerability(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([
            {"disease": "Apple Scab", "severity": "High", "trigger_condition": "High Humidity"}
        ])

        response = client.post("/api/insights/", json={
            "crop": "Apple",
            "condition": "High Humidity",
            "humidity": 85
        })

        assert response.status_code == 200
        data = response.json()
        assert "Apple Scab" in data["risks_found"]
        assert "pr\xe9v" in data["advice"].lower() or "prev" in data["advice"].lower()
        assert data["score"] >= 20

    def test_young_olive_tree_warning(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([])

        response = client.post("/api/insights/", json={
            "crop": "Olive",
            "condition": "Normal",
            "planting_date": "2025-01-15"
        })

        assert response.status_code == 200
        data = response.json()
        assert "racinaire" in data["advice"].lower()

    def test_sandy_soil_recommendation(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([])

        response = client.post("/api/insights/", json={
            "crop": "Olive",
            "condition": "Normal",
            "agronomic_data": {"Texture du Sol": "Sablonneux"}
        })

        assert response.status_code == 200
        data = response.json()
        assert "sablonneux" in data["advice"].lower()

    def test_considers_recent_operations(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([])

        response = client.post("/api/insights/", json={
            "crop": "Wheat",
            "condition": "High Humidity",
            "recent_operations": [
                {"type": "IRRIGATION", "date": "2026-05-10"},
                {"type": "FERTILIZER", "date": "2026-05-05"}
            ]
        })

        assert response.status_code == 200
        data = response.json()
        assert data["consideredRecentActions"] is True
        assert "IRRIGATION" in data["advice"]

    def test_no_recent_operations_flag(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([])

        response = client.post("/api/insights/", json={
            "crop": "Wheat",
            "condition": "Normal",
            "recent_operations": []
        })

        assert response.status_code == 200
        data = response.json()
        assert data["consideredRecentActions"] is False

    def test_multiple_risks_returned(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([
            {"disease": "Apple Scab", "severity": "High", "trigger_condition": "High Humidity"},
            {"disease": "Powdery Mildew", "severity": "Medium", "trigger_condition": "High Humidity"}
        ])

        response = client.post("/api/insights/", json={
            "crop": "Apple",
            "condition": "High Humidity",
            "humidity": 85
        })

        assert response.status_code == 200
        data = response.json()
        assert len(data["risks_found"]) == 2
        assert "Apple Scab" in data["risks_found"]
        assert "Powdery Mildew" in data["risks_found"]

    def test_high_temperature_adds_score(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([])

        response = client.post("/api/insights/", json={
            "crop": "Wheat",
            "condition": "Normal",
            "temperature": 38
        })

        assert response.status_code == 200
        data = response.json()
        assert data["score"] >= 12
        assert "thermique" in " ".join(data["risk_factors"])

    def test_low_temperature_adds_score(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([])

        response = client.post("/api/insights/", json={
            "crop": "Wheat",
            "condition": "Normal",
            "temperature": 2
        })

        assert response.status_code == 200
        data = response.json()
        assert data["score"] >= 20
        assert "gel" in " ".join(data["risk_factors"])

    def test_high_humidity_activates_disease_and_adds_score(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([
            {"disease": "Apple Scab", "severity": "High", "trigger_condition": "High Humidity"}
        ])

        response = client.post("/api/insights/", json={
            "crop": "Apple",
            "condition": "High Humidity",
            "temperature": 25,
            "humidity": 85
        })

        assert response.status_code == 200
        data = response.json()
        assert "Apple Scab" in data["risks_found"]
        assert data["score"] >= 20
        assert "Humidit" in " ".join(data["risk_factors"])

    def test_pesticide_mitigation_reduces_score(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([
            {"disease": "Apple Scab", "severity": "High", "trigger_condition": "High Humidity"}
        ])

        response_with = client.post("/api/insights/", json={
            "crop": "Apple",
            "condition": "High Humidity",
            "temperature": 25,
            "humidity": 85,
            "recent_operations": [{"type": "PESTICIDE", "date": "2026-05-01"}]
        })

        response_without = client.post("/api/insights/", json={
            "crop": "Apple",
            "condition": "High Humidity",
            "temperature": 25,
            "humidity": 85,
            "recent_operations": []
        })

        assert response_with.status_code == 200
        assert response_without.status_code == 200
        assert response_with.json()["score"] < response_without.json()["score"]

    def test_critical_risk_level(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([
            {"disease": "Apple Scab", "severity": "High", "trigger_condition": "High Humidity"}
        ])

        response = client.post("/api/insights/", json={
            "crop": "Dahbia",
            "condition": "High Humidity",
            "temperature": -2,
            "humidity": 90
        })

        assert response.status_code == 200
        data = response.json()
        assert data["score"] >= 50
        assert data["risk_level"] in ("CRITICAL", "HIGH")

    def test_low_risk_level(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([])

        response = client.post("/api/insights/", json={
            "crop": "Wheat",
            "condition": "Normal",
            "temperature": 20,
            "humidity": 40
        })

        assert response.status_code == 200
        data = response.json()
        assert data["score"] < 25
        assert data["risk_level"] == "LOW"
