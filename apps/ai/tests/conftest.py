from unittest.mock import MagicMock
from typing import Any, List, Optional
import pytest
from fastapi.testclient import TestClient
from main import app
from database import get_db_session


class MockRecord(dict):
    def __getattr__(self, name):
        return self.get(name)


class MockResult:
    def __init__(self, records: Optional[List[dict]] = None):
        self._records = [MockRecord(r) for r in (records or [])]

    def __iter__(self):
        return iter(self._records)

    def single(self) -> Optional[MockRecord]:
        return self._records[0] if self._records else None


class MockSession:
    def __init__(self):
        self._result_records: List[dict] = []
        self.queries: List[str] = []

    def run(self, query: str, **params) -> MockResult:
        self.queries.append(query)
        return MockResult(self._result_records)

    def close(self):
        pass

    def set_results(self, records: List[dict]):
        self._result_records = records


@pytest.fixture
def mock_session():
    return MockSession()


@pytest.fixture(autouse=True)
def override_deps(mock_session):
    def _get_mock():
        yield mock_session
    app.dependency_overrides[get_db_session] = _get_mock
    yield
    app.dependency_overrides.clear()


@pytest.fixture
def client():
    return TestClient(app)
