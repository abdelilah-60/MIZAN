import os
from dotenv import load_dotenv
from neo4j import GraphDatabase

load_dotenv()

URI = os.getenv("MEMGRAPH_URI", "bolt://localhost:7687")
USER = os.getenv("MEMGRAPH_USER", "")
PASSWORD = os.getenv("MEMGRAPH_PASSWORD", "")
DATABASE = os.getenv("MEMGRAPH_DATABASE", USER)
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
        session_kwargs = {}
        if DATABASE:
            session_kwargs["database"] = DATABASE
        with driver.session(**session_kwargs) as session:
            # Create performance indices
            print("Creating indices...")
            session.run("CREATE INDEX IF NOT EXISTS FOR (n:Variety) ON (n.name)")
            session.run("CREATE INDEX IF NOT EXISTS FOR (n:Disease) ON (n.name)")
            session.run("CREATE INDEX IF NOT EXISTS FOR (n:OperationTemplate) ON (n.type)")
            session.run("CREATE INDEX IF NOT EXISTS FOR (n:Parameter) ON (n.name)")

            # Clear all existing data
            print("Clearing existing database...")
            session.run("MATCH (n) DETACH DELETE n")

            # ── 1. Create all Olive Variety nodes ───────────────────────
            print(f"Creating {len(OLIVE_VARIETIES)} olive variety nodes...")
            for v in OLIVE_VARIETIES:
                session.run(
                    """
                    CREATE (:Variety {
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

            # ── 3. Create SUSCEPTIBLE_TO relationships with scores ─────
            print("Creating disease susceptibility relationships with scores...")
            SUSCEPTIBILITY_MAP = {
                "Picholine Marocaine": {"Peacock Spot": 65, "Olive Knot": 55, "Verticillium Wilt": 70, "Olive Fruit Fly": 60, "Anthracnose": 40, "Olive Leaf Spot": 35},
                "Haouzia":             {"Peacock Spot": 50, "Anthracnose": 60, "Olive Fruit Fly": 55, "Olive Knot": 30, "Verticillium Wilt": 25, "Olive Leaf Spot": 45},
                "Menara":              {"Peacock Spot": 55, "Anthracnose": 65, "Olive Fruit Fly": 50, "Olive Knot": 60, "Verticillium Wilt": 35, "Olive Leaf Spot": 40},
                "Dahbia":              {"Peacock Spot": 45, "Olive Fruit Fly": 50, "Anthracnose": 30, "Olive Knot": 25, "Verticillium Wilt": 20, "Olive Leaf Spot": 35},
                "Meslala":             {"Olive Knot": 55, "Olive Fruit Fly": 65, "Peacock Spot": 40, "Anthracnose": 35, "Verticillium Wilt": 30, "Olive Leaf Spot": 25},
                "Arbequina":           {"Verticillium Wilt": 75, "Peacock Spot": 60, "Olive Fruit Fly": 70, "Anthracnose": 45, "Olive Knot": 35, "Olive Leaf Spot": 40},
            }
            for variety, diseases in SUSCEPTIBILITY_MAP.items():
                for disease, score in diseases.items():
                    session.run(
                        """
                        MATCH (v:Variety {name: $variety}), (d:Disease {name: $disease})
                        CREATE (v)-[:SUSCEPTIBLE_TO {score: $score, notes: ""}]->(d)
                        """,
                        variety=variety, disease=disease, score=score
                    )

            # ── 4. Create Phenological Stages ─────────────────────────────
            print("Creating phenological stage nodes...")
            stages = [
                {"name": "Dormancy",      "order": 1},
                {"name": "Bud Break",     "order": 2},
                {"name": "Flowering",     "order": 3},
                {"name": "Fruit Set",     "order": 4},
                {"name": "Pit Hardening", "order": 5},
                {"name": "Oil Accumulation", "order": 6},
                {"name": "Maturation",    "order": 7},
                {"name": "Harvest",       "order": 8},
            ]
            for s in stages:
                session.run(
                    "CREATE (:Stage {name: $name, order: $order})",
                    name=s["name"], order=s["order"]
                )

            # ── 5. Create Kc relationships (Variety -> Stage) ─────────────
            print("Creating Kc crop coefficient relationships...")
            KC_DEFAULTS = {
                "Dormancy": 0.45, "Bud Break": 0.50, "Flowering": 0.55,
                "Fruit Set": 0.65, "Pit Hardening": 0.60, "Oil Accumulation": 0.55,
                "Maturation": 0.50, "Harvest": 0.45,
            }
            for v in OLIVE_VARIETIES:
                for stage_name, kc in KC_DEFAULTS.items():
                    session.run(
                        """
                        MATCH (v:Variety {name: $name}), (s:Stage {name: $stage})
                        CREATE (v)-[:HAS_KC_AT {kc: $kc}]->(s)
                        """,
                        name=v["name"], stage=stage_name, kc=kc
                    )

            # ── 6. Create Soil Types ──────────────────────────────────────
            print("Creating soil type nodes...")
            soil_types = ["Sandy", "Clay", "Loamy", "Clay-Loam", "Sandy-Loam", "Calcareous"]
            for soil in soil_types:
                session.run("CREATE (:SoilType {name: $name})", name=soil)

            # ── 7. Create Soil Compatibility relationships ────────────────
            print("Creating soil compatibility relationships...")
            SOIL_COMPAT = {
                "Picholine Marocaine": {"Sandy": "GOOD", "Clay": "MODERATE", "Loamy": "EXCELLENT", "Clay-Loam": "GOOD", "Sandy-Loam": "EXCELLENT", "Calcareous": "GOOD"},
                "Haouzia":             {"Sandy": "MODERATE", "Clay": "GOOD", "Loamy": "EXCELLENT", "Clay-Loam": "EXCELLENT", "Sandy-Loam": "GOOD", "Calcareous": "MODERATE"},
                "Menara":              {"Sandy": "GOOD", "Clay": "MODERATE", "Loamy": "EXCELLENT", "Clay-Loam": "GOOD", "Sandy-Loam": "EXCELLENT", "Calcareous": "GOOD"},
                "Dahbia":              {"Sandy": "GOOD", "Clay": "MODERATE", "Loamy": "GOOD", "Clay-Loam": "GOOD", "Sandy-Loam": "EXCELLENT", "Calcareous": "MODERATE"},
                "Meslala":             {"Sandy": "EXCELLENT", "Clay": "POOR", "Loamy": "GOOD", "Clay-Loam": "MODERATE", "Sandy-Loam": "EXCELLENT", "Calcareous": "GOOD"},
                "Arbequina":           {"Sandy": "GOOD", "Clay": "MODERATE", "Loamy": "EXCELLENT", "Clay-Loam": "GOOD", "Sandy-Loam": "EXCELLENT", "Calcareous": "GOOD"},
            }
            for variety, soils in SOIL_COMPAT.items():
                for soil, fitness in soils.items():
                    session.run(
                        """
                        MATCH (v:Variety {name: $variety}), (s:SoilType {name: $soil})
                        CREATE (v)-[:SUITED_FOR {fitness: $fitness, notes: ""}]->(s)
                        """,
                        variety=variety, soil=soil, fitness=fitness
                    )

            # ── 8. Create Treatments ──────────────────────────────────────
            print("Creating treatment nodes...")
            treatments = [
                {"name": "Copper Hydroxide", "type": "fungicide", "active_ingredient": "Copper hydroxide", "organic_approved": True, "timing": "preventive", "application_season": "Autumn-Winter"},
                {"name": "Mancozeb", "type": "fungicide", "active_ingredient": "Mancozeb", "organic_approved": False, "timing": "preventive", "application_season": "Spring"},
                {"name": "Kaolin Clay", "type": "repellent", "active_ingredient": "Kaolin", "organic_approved": True, "timing": "preventive", "application_season": "Summer"},
                {"name": "Spinosad", "type": "insecticide", "active_ingredient": "Spinosad", "organic_approved": True, "timing": "curative", "application_season": "Summer-Autumn"},
                {"name": "Dimethoate", "type": "insecticide", "active_ingredient": "Dimethoate", "organic_approved": False, "timing": "curative", "application_season": "Autumn"},
                {"name": "Trichoderma", "type": "biological", "active_ingredient": "Trichoderma harzianum", "organic_approved": True, "timing": "preventive", "application_season": "Spring"},
            ]
            for t in treatments:
                session.run(
                    """
                    CREATE (:Treatment {
                        name: $name, type: $type, active_ingredient: $active_ingredient,
                        organic_approved: $organic_approved, timing: $timing,
                        application_season: $application_season
                    })
                    """,
                    **t
                )

            # ── 9. Link Diseases to Treatments ────────────────────────────
            print("Linking diseases to treatments...")
            DISEASE_TREATMENT_MAP = {
                "Peacock Spot": [{"treatment": "Copper Hydroxide", "efficacy": "high", "priority": 1}, {"treatment": "Mancozeb", "efficacy": "medium", "priority": 2}],
                "Anthracnose": [{"treatment": "Copper Hydroxide", "efficacy": "medium", "priority": 1}, {"treatment": "Mancozeb", "efficacy": "high", "priority": 2}],
                "Olive Knot": [{"treatment": "Copper Hydroxide", "efficacy": "medium", "priority": 1}],
                "Verticillium Wilt": [{"treatment": "Trichoderma", "efficacy": "medium", "priority": 1}],
                "Olive Fruit Fly": [{"treatment": "Kaolin Clay", "efficacy": "high", "priority": 1}, {"treatment": "Spinosad", "efficacy": "high", "priority": 2}, {"treatment": "Dimethoate", "efficacy": "high", "priority": 3}],
                "Olive Leaf Spot": [{"treatment": "Copper Hydroxide", "efficacy": "medium", "priority": 1}],
            }
            for disease, treatments_list in DISEASE_TREATMENT_MAP.items():
                for link in treatments_list:
                    session.run(
                        """
                        MATCH (d:Disease {name: $disease}), (t:Treatment {name: $treatment})
                        CREATE (d)-[:TREATABLE_BY {efficacy: $efficacy, timing: "preventive", priority: $priority}]->(t)
                        """,
                        disease=disease, treatment=link["treatment"], efficacy=link["efficacy"], priority=link["priority"]
                    )

            # ── 10. Create Operation Templates ────────────────────────────
            print("Creating operation templates...")
            operation_templates = [
                "IRRIGATION", "FERTILIZER", "PRUNING",
                "HARVEST", "PESTICIDE", "FUNGICIDE",
            ]
            for op in operation_templates:
                session.run(
                    "CREATE (:OperationTemplate {type: $type})",
                    type=op
                )

            # ── 11. Create Parameters ─────────────────────────────────────
            print("Creating parameters...")
            parameters = [
                {"name": "Volume",          "unit": "Liters",      "type": "number"},
                {"name": "Duration",        "unit": "Minutes",     "type": "number"},
                {"name": "ProductName",     "unit": None,          "type": "text"},
                {"name": "Quantity",        "unit": "kg",          "type": "number"},
                {"name": "Technique",       "unit": None,          "type": "select",
                 "options": "Taille de formation,Taille de fructification,Taille de rajeunissement"},
                {"name": "IntensityLevel",  "unit": None,          "type": "select",
                 "options": "Légère,Modérée,Sévère"},
                {"name": "Method",          "unit": None,          "type": "select",
                 "options": "Manuel,Mécanique,Mixte"},
                {"name": "YieldEstimate",   "unit": "kg/ha",       "type": "number"},
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

            # ── 12. Link Operations to Parameters ────────────────────────
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

            # ── 13. Link All Varieties to All Operations ─────────────────
            print("Linking all olive varieties to operation templates...")
            for v in OLIVE_VARIETIES:
                for op_type in operation_templates:
                    session.run(
                        """
                        MATCH (v:Variety {name: $name}), (ot:OperationTemplate {type: $op_type})
                        CREATE (v)-[:HAS_OPERATION]->(ot)
                        """,
                        name=v["name"], op_type=op_type
                    )

            # ── 14. Field Requirements for all Varieties ──────────────────
            print("Linking field requirements to all varieties...")
            field_req_params = [
                "Variété", "Porte-greffe", "Texture du Sol",
                "Système d Irrigation", "Exposition", "Densité de Plantation"
            ]
            for v in OLIVE_VARIETIES:
                for param_name in field_req_params:
                    session.run(
                        """
                        MATCH (v:Variety {name: $name}), (p:Parameter {name: $param_name})
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
        raise e
    finally:
        driver.close()


if __name__ == "__main__":
    seed_database()
