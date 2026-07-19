from fastapi.testclient import TestClient
from tests.conftest import MockSession


class TestOperationRequirements:
    def test_returns_parameters_for_valid_crop_and_operation(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([
            {"name": "Volume", "unit": "Liters", "inputType": "number", "options": None},
            {"name": "Duration", "unit": "Minutes", "inputType": "number", "options": None},
        ])

        response = client.get(
            "/api/ontology/operation-requirements",
            params={"crop_name": "Olive", "operation_type": "IRRIGATION"}
        )

        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2
        assert data[0]["name"] == "Volume"
        assert data[1]["name"] == "Duration"
        assert any("Crop" in q for q in mock_session.queries)

    def test_returns_422_when_crop_name_missing(
        self, client: TestClient, mock_session: MockSession
    ):
        response = client.get(
            "/api/ontology/operation-requirements",
            params={"operation_type": "IRRIGATION"}
        )
        assert response.status_code == 422

    def test_returns_422_when_operation_type_missing(
        self, client: TestClient, mock_session: MockSession
    ):
        response = client.get(
            "/api/ontology/operation-requirements",
            params={"crop_name": "Olive"}
        )
        assert response.status_code == 422

    def test_returns_empty_when_no_parameters_found(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([])

        response = client.get(
            "/api/ontology/operation-requirements",
            params={"crop_name": "UnknownCrop", "operation_type": "IRRIGATION"}
        )

        assert response.status_code == 200
        assert response.json() == []


class TestFieldRequirements:
    def test_returns_field_requirements_for_valid_crop(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([
            {"name": "Texture du Sol", "inputType": "select", "options": "Sablonneux,Argileux,Limoneux"},
            {"name": "Exposition", "inputType": "select", "options": "Nord,Sud,Est,Ouest"},
        ])

        response = client.get(
            "/api/ontology/field-requirements",
            params={"crop_name": "Olive"}
        )

        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2
        assert data[0]["name"] == "Texture du Sol"
        assert data[0]["options"] == ["Sablonneux", "Argileux", "Limoneux"]

    def test_returns_422_when_crop_name_missing(
        self, client: TestClient, mock_session: MockSession
    ):
        response = client.get("/api/ontology/field-requirements")
        assert response.status_code == 422

    def test_returns_empty_for_unknown_crop(
        self, client: TestClient, mock_session: MockSession
    ):
        mock_session.set_results([])

        response = client.get(
            "/api/ontology/field-requirements",
            params={"crop_name": "UnknownCrop"}
        )

        assert response.status_code == 200
        assert response.json() == []
