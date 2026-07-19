from fastapi.testclient import TestClient
from tests.conftest import MockSession
from main import app


class TestHealth:
    def test_root_returns_200_with_health_message(self, client: TestClient):
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "Mizan AI Brain is online"}


class TestInsightsValidation:
    def test_empty_payload_returns_422(self, client: TestClient):
        response = client.post("/api/insights/", json={})
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
        errors = {e["loc"][-1]: e["msg"] for e in data["detail"]}
        assert "crop" in errors
        assert "condition" in errors


class TestInsightsWithPytestMock:
    def test_risk_scoring_uses_mocked_db_session(
        self, client: TestClient, mock_session: MockSession, mocker
    ):
        spy = mocker.spy(mock_session, "run")
        mock_session.set_results([{"disease": "Apple Scab", "severity": "High", "trigger_condition": "High Humidity"}])

        response = client.post("/api/insights/", json={
            "crop": "Apple",
            "condition": "High Humidity",
            "humidity": 85
        })

        assert response.status_code == 200
        data = response.json()
        assert "Apple Scab" in data["risks_found"]
        assert data["condition"] == "High Humidity"
        spy.assert_called_once()
        assert "SUSCEPTIBLE_TO" in spy.call_args[0][0]
