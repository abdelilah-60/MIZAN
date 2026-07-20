import os
from dotenv import load_dotenv
from neo4j import GraphDatabase

load_dotenv()

MEMGRAPH_URI = os.getenv("MEMGRAPH_URI", "bolt://localhost:7687")
MEMGRAPH_USER = os.getenv("MEMGRAPH_USER", "")
MEMGRAPH_PASSWORD = os.getenv("MEMGRAPH_PASSWORD", "")
MEMGRAPH_DATABASE = os.getenv("MEMGRAPH_DATABASE", MEMGRAPH_USER)

driver = GraphDatabase.driver(
    MEMGRAPH_URI,
    auth=(MEMGRAPH_USER, MEMGRAPH_PASSWORD) if MEMGRAPH_USER else None
)

def get_db_session():
    session_kwargs = {}
    if MEMGRAPH_DATABASE:
        session_kwargs["database"] = MEMGRAPH_DATABASE
    with driver.session(**session_kwargs) as session:
        yield session
