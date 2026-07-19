"""
MIZAN — Knowledge Graph Seeder (v2)
====================================
Loads all .cypher files from the knowledge/ directory
into Memgraph in numerical order.

Usage:
    python seed_knowledge.py
    python seed_knowledge.py --dry-run   (print queries without executing)
"""

import os
import sys
import glob
from dotenv import load_dotenv
from neo4j import GraphDatabase

load_dotenv()

URI = os.getenv("MEMGRAPH_URI", "bolt://localhost:7687")
USER = os.getenv("MEMGRAPH_USER", "")
PASSWORD = os.getenv("MEMGRAPH_PASSWORD", "")
AUTH = (USER, PASSWORD) if USER else None

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "knowledge")


def load_cypher_files(directory: str) -> list[tuple[str, list[str]]]:
    """Load all .cypher files sorted numerically, split into individual statements."""
    files = sorted(glob.glob(os.path.join(directory, "*.cypher")))
    result = []
    for filepath in files:
        filename = os.path.basename(filepath)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Split on semicolons, filter out comments and empty lines
        statements = []
        for raw_stmt in content.split(";"):
            # Remove comment lines
            lines = []
            for line in raw_stmt.strip().splitlines():
                stripped = line.strip()
                if stripped and not stripped.startswith("//"):
                    lines.append(line)
            stmt = "\n".join(lines).strip()
            if stmt:
                statements.append(stmt)

        if statements:
            result.append((filename, statements))
    return result


def seed_knowledge(dry_run: bool = False):
    """Load and execute all knowledge Cypher files."""
    print("=" * 60)
    print("  MIZAN — Olive Knowledge Graph Seeder v2")
    print("=" * 60)
    print(f"  Source: {KNOWLEDGE_DIR}")
    print(f"  Target: {URI}")
    print(f"  Mode:   {'DRY RUN (no changes)' if dry_run else 'LIVE EXECUTION'}")
    print("=" * 60)

    file_stmts = load_cypher_files(KNOWLEDGE_DIR)
    if not file_stmts:
        print("[!] No .cypher files found in knowledge/ directory.")
        return

    total_statements = sum(len(stmts) for _, stmts in file_stmts)
    print(f"\n  Found {len(file_stmts)} files with {total_statements} total statements.\n")

    if dry_run:
        for filename, statements in file_stmts:
            print(f"  📄 {filename} ({len(statements)} statements)")
            for i, stmt in enumerate(statements, 1):
                preview = stmt[:100].replace("\n", " ")
                print(f"     {i:3d}. {preview}...")
        print("\n  [DRY RUN] No changes made.\n")
        return

    driver = GraphDatabase.driver(URI, auth=AUTH)
    try:
        with driver.session() as session:
            executed = 0
            errors = 0

            for filename, statements in file_stmts:
                print(f"  📄 {filename} ({len(statements)} statements)")
                for i, stmt in enumerate(statements, 1):
                    try:
                        session.run(stmt)
                        executed += 1
                    except Exception as e:
                        errors += 1
                        preview = stmt[:80].replace("\n", " ")
                        print(f"     ❌ Statement {i} failed: {e}")
                        print(f"        Query: {preview}...")

            # Verification
            node_count = session.run("MATCH (n) RETURN count(n) AS c").single()["c"]
            edge_count = session.run("MATCH ()-[r]->() RETURN count(r) AS c").single()["c"]

            # Detailed counts
            counts = {}
            for label in ["Variety", "Disease", "Stage", "SoilType", "Treatment",
                          "NPKRule", "IrrigationDefault", "OperationTemplate", "Parameter"]:
                result = session.run(f"MATCH (n:{label}) RETURN count(n) AS c")
                counts[label] = result.single()["c"]

            print(f"\n{'=' * 60}")
            print(f"  ✅ Knowledge Graph seeded successfully!")
            print(f"{'=' * 60}")
            print(f"  Executed: {executed} statements ({errors} errors)")
            print(f"  Total:    {node_count} nodes | {edge_count} relationships")
            print(f"{'─' * 60}")
            for label, count in counts.items():
                print(f"    {label:.<30} {count}")
            print(f"{'=' * 60}\n")

    except Exception as e:
        print(f"\n  ❌ Connection error: {e}")
        print("     Ensure Memgraph is running (docker-compose up memgraph)")
    finally:
        driver.close()


if __name__ == "__main__":
    is_dry = "--dry-run" in sys.argv
    seed_knowledge(dry_run=is_dry)
