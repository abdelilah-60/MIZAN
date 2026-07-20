import ssl
from neo4j import GraphDatabase

URI = "bolt://d07cb54d.databases.neo4j.io:7687"
USER = "d07cb54d"
PASSWORD = "0pC2vxA8uiX3RtHStnkte6pLVTS5XO12uJ3XVjN4Wfs"

ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

print("Connecting to Neo4j AuraDB...")
try:
    driver = GraphDatabase.driver(URI, auth=(USER, PASSWORD), ssl_context=ssl_context)
    with driver.session(database="d07cb54d") as session:
        result = session.run("MATCH (n) RETURN count(n) as c")
        count = result.single()["c"]
        print(f"Connection successful! Total nodes in DB: {count}")
except Exception as e:
    print(f"Error: {e}")
