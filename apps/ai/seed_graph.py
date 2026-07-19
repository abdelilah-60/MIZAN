import os
from dotenv import load_dotenv
from neo4j import GraphDatabase

load_dotenv()

URI = os.getenv("MEMGRAPH_URI", "bolt://localhost:7687")
USER = os.getenv("MEMGRAPH_USER", "")
PASSWORD = os.getenv("MEMGRAPH_PASSWORD", "")
AUTH = (USER, PASSWORD) if USER else None

OLIVE_VARIETIES = [
    {"name": "Picholine Marocaine", "origin": "Morocco",     "oil_content": 22, "harvest_season": "November-December"},
    {"name": "Haouzia",             "origin": "Morocco",     "oil_content": 20, "harvest_season": "November-December"},
    {"name": "Menara",              "origin": "Morocco",     "oil_content": 21, "harvest_season": "November-December"},
    {"name": "Dahbia",              "origin": "Morocco",     "oil_content": 16, "harvest_season": "October-November"},
    {"name": "Meslala",             "origin": "Morocco",     "oil_content": 19, "harvest_season": "September-October"},
    {"name": "Arbequina",           "origin": "Spain",       "oil_content": 20, "harvest_season": "October-November"},
]

OLIVE_DISEASES = [
    {"name": "Verticillium Wilt",   "severity": "High",   "pathogen": "Verticillium dahliae",    "trigger_condition": "High Humidity"},
    {"name": "Olive Knot",          "severity": "High",   "pathogen": "Pseudomonas savastanoi",  "trigger_condition": "Rainy Season"},
    {"name": "Peacock Spot",        "severity": "Medium", "pathogen": "Spilocaea oleagina",      "trigger_condition": "High Humidity"},
    {"name": "Olive Leaf Spot",     "severity": "Medium", "pathogen": "Colletotrichum spp.",     "trigger_condition": "High Humidity"},
    {"name": "Anthracnose",         "severity": "High",   "pathogen": "Colletotrichum acutatum", "trigger_condition": "High Humidity"},
    {"name": "Olive Fruit Fly",     "severity": "High",   "pathogen": "Bactrocera oleae",        "trigger_condition": "Normal"},
]

# Which diseases threaten each variety
VARIETY_DISEASE_MAP = {
    "Picholine Marocaine": ["Peacock Spot", "Olive Knot", "Verticillium Wilt", "Olive Fruit Fly"],
    "Haouzia":             ["Peacock Spot", "Anthracnose", "Olive Fruit Fly"],
    "Menara":              ["Peacock Spot", "Anthracnose", "Olive Fruit Fly", "Olive Knot"],
    "Dahbia":              ["Peacock Spot", "Olive Fruit Fly"],
    "Meslala":             ["Olive Knot", "Olive Fruit Fly"],
    "Arbequina":           ["Verticillium Wilt", "Peacock Spot", "Olive Fruit Fly"],
}

def seed_database():
    print("[Olive] Connecting to Memgraph for Olive Ontology seeding...")
    driver = GraphDatabase.driver(URI, auth=AUTH)

    try:
        with driver.session() as session:
            # Create performance indices
            print("Creating indices...")
            session.run("CREATE INDEX ON :OliveVariety(name)")
            session.run("CREATE INDEX ON :Disease(name)")
            session.run("CREATE INDEX ON :OperationTemplate(type)")
            session.run("CREATE INDEX ON :Parameter(name)")

            # Clear all existing data
            print("Clearing existing database...")
            session.run("MATCH (n) DETACH DELETE n")

            # ── 1. Create all Olive Variety nodes ───────────────────────
            print(f"Creating {len(OLIVE_VARIETIES)} olive variety nodes...")
            for v in OLIVE_VARIETIES:
                session.run(
                    """
                    CREATE (:OliveVariety {
                        name: $name,
                        origin: $origin,
                        oil_content: $oil_content,
                        harvest_season: $harvest_season
                    })
                    """,
                    name=v["name"], origin=v["origin"],
                    oil_content=v["oil_content"], harvest_season=v["harvest_season"]
                )

            # ── 2. Create all Disease nodes ──────────────────────────────
            print(f"Creating {len(OLIVE_DISEASES)} disease nodes...")
            for d in OLIVE_DISEASES:
                session.run(
                    """
                    CREATE (:Disease {
                        name: $name,
                        severity: $severity,
                        pathogen: $pathogen,
                        trigger_condition: $trigger_condition
                    })
                    """,
                    name=d["name"], severity=d["severity"],
                    pathogen=d["pathogen"], trigger_condition=d["trigger_condition"]
                )

            # ── 3. Create VULNERABLE_TO relationships ────────────────────
            print("Creating disease vulnerability relationships...")
            for variety, diseases in VARIETY_DISEASE_MAP.items():
                for disease in diseases:
                    session.run(
                        """
                        MATCH (v:OliveVariety {name: $variety}), (d:Disease {name: $disease})
                        CREATE (v)-[:VULNERABLE_TO {condition: d.trigger_condition}]->(d)
                        """,
                        variety=variety, disease=disease
                    )

            # ── 4. Create Operation Templates ────────────────────────────
            print("Creating operation templates...")
            operation_templates = [
                "IRRIGATION",
                "FERTILIZER",
                "PRUNING",
                "HARVEST",
                "PESTICIDE",
                "FUNGICIDE",
            ]
            for op in operation_templates:
                session.run(
                    "CREATE (:OperationTemplate {type: $type})",
                    type=op
                )

            # ── 5. Create Parameters ─────────────────────────────────────
            print("Creating parameters...")
            parameters = [
                # Irrigation
                {"name": "Volume",          "unit": "Liters",      "type": "number"},
                {"name": "Duration",        "unit": "Minutes",     "type": "number"},
                # Fertilizer / Pesticide / Fungicide
                {"name": "ProductName",     "unit": None,          "type": "text"},
                {"name": "Quantity",        "unit": "kg",          "type": "number"},
                # Pruning
                {"name": "Technique",       "unit": None,          "type": "select",
                 "options": "Taille de formation,Taille de fructification,Taille de rajeunissement"},
                {"name": "IntensityLevel",  "unit": None,          "type": "select",
                 "options": "Légère,Modérée,Sévère"},
                # Harvest
                {"name": "Method",          "unit": None,          "type": "select",
                 "options": "Manuel,Mécanique,Mixte"},
                {"name": "YieldEstimate",   "unit": "kg/ha",       "type": "number"},
                # Field-level requirements
                {"name": "Variété",         "unit": None,          "type": "select",
                 "options": "Picholine Marocaine,Haouzia,Menara,Dahbia,Meslala,Arbequina"},
                {"name": "Porte-greffe",    "unit": None,          "type": "text"},
                {"name": "Texture du Sol",  "unit": None,          "type": "select",
                 "options": "Sablonneux,Argileux,Limoneux,Argilo-limoneux,Argilo-sableux"},
                {"name": "Système d Irrigation", "unit": None,     "type": "select",
                 "options": "Goutte à goutte,Aspersion,Gravitaire,Micro-aspersion"},
                {"name": "Exposition",      "unit": None,          "type": "select",
                 "options": "Nord,Sud,Est,Ouest,Sud-Est,Sud-Ouest"},
                {"name": "Densité de Plantation", "unit": "arbres/ha", "type": "number"},
            ]
            for p in parameters:
                options = p.get("options")
                if options:
                    session.run(
                        "CREATE (:Parameter {name: $name, unit: $unit, type: $type, options: $options})",
                        name=p["name"], unit=p.get("unit"), type=p["type"], options=options
                    )
                else:
                    session.run(
                        "CREATE (:Parameter {name: $name, unit: $unit, type: $type})",
                        name=p["name"], unit=p.get("unit"), type=p["type"]
                    )

            # ── 6. Link Operations to Parameters ────────────────────────
            print("Linking operations to required parameters...")
            op_param_map = {
                "IRRIGATION": ["Volume", "Duration"],
                "FERTILIZER": ["ProductName", "Quantity"],
                "PRUNING":    ["Technique", "IntensityLevel"],
                "HARVEST":    ["Method", "YieldEstimate"],
                "PESTICIDE":  ["ProductName", "Quantity"],
                "FUNGICIDE":  ["ProductName", "Quantity"],
            }
            for op_type, params in op_param_map.items():
                for param_name in params:
                    session.run(
                        """
                        MATCH (ot:OperationTemplate {type: $op_type}), (p:Parameter {name: $param_name})
                        CREATE (ot)-[:REQUIRES_PARAMETER]->(p)
                        """,
                        op_type=op_type, param_name=param_name
                    )

            # ── 7. Link All Varieties to All Operations ─────────────────
            print("Linking all olive varieties to operation templates...")
            for v in OLIVE_VARIETIES:
                for op_type in operation_templates:
                    session.run(
                        """
                        MATCH (v:OliveVariety {name: $name}), (ot:OperationTemplate {type: $op_type})
                        CREATE (v)-[:HAS_OPERATION]->(ot)
                        """,
                        name=v["name"], op_type=op_type
                    )

            # ── 8. Field Requirements for all Varieties ──────────────────
            print("Linking field requirements to all varieties...")
            field_req_params = [
                "Variété", "Porte-greffe", "Texture du Sol",
                "Système d Irrigation", "Exposition", "Densité de Plantation"
            ]
            for v in OLIVE_VARIETIES:
                for param_name in field_req_params:
                    session.run(
                        """
                        MATCH (v:OliveVariety {name: $name}), (p:Parameter {name: $param_name})
                        CREATE (v)-[:HAS_FIELD_REQUIREMENT]->(p)
                        """,
                        name=v["name"], param_name=param_name
                    )

            # ── 9. Verification ──────────────────────────────────────────
            node_count = session.run("MATCH (n) RETURN count(n) as count").single()["count"]
            edge_count = session.run("MATCH ()-[r]->() RETURN count(r) as count").single()["count"]

            print(f"\n{'='*55}")
            print(f"  [OK] Olive Knowledge Graph seeded successfully!")
            print(f"  [DB] {node_count} nodes | {edge_count} relationships")
            print(f"  [VAR] {len(OLIVE_VARIETIES)} olive varieties")
            print(f"  [DIS] {len(OLIVE_DISEASES)} diseases mapped")
            print(f"  [OPS] {len(operation_templates)} operation types")
            print(f"{'='*55}\n")

    except Exception as e:
        print(f"[ERROR] Error seeding graph: {e}")
        print("   Ensure Memgraph is running via Docker (port 7687).")
    finally:
        driver.close()


if __name__ == "__main__":
    seed_database()
