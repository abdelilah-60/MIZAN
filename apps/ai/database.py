import os
from dotenv import load_dotenv
from neo4j import GraphDatabase

load_dotenv()

MEMGRAPH_URI = os.getenv("MEMGRAPH_URI", "bolt://localhost:7687")
MEMGRAPH_USER = os.getenv("MEMGRAPH_USER", "")
MEMGRAPH_PASSWORD = os.getenv("MEMGRAPH_PASSWORD", "")

driver = GraphDatabase.driver(
    MEMGRAPH_URI,
    auth=(MEMGRAPH_USER, MEMGRAPH_PASSWORD) if MEMGRAPH_USER else None
)

def get_db_session():
    with driver.session() as session:
        yield session
