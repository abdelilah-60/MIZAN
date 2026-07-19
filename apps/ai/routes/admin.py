from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from database import get_db_session

router = APIRouter(
    prefix="/api/admin",
    tags=["admin"]
)

# ── Pydantic Request Models ──────────────────────────────────────────────────

class VarietyModel(BaseModel):
    name: str
    name_ar: Optional[str] = None
    origin: Optional[str] = None
    use: Optional[str] = None
    oil_content_pct: Optional[float] = None
    avg_fruit_weight_g: Optional[float] = None
    harvest_season: Optional[str] = None
    drought_tolerance: Optional[str] = None
    cold_tolerance: Optional[str] = None
    vigor: Optional[str] = None
    pollination: Optional[str] = None
    density_recommended: Optional[float] = None
    notes: Optional[str] = None

class DiseaseModel(BaseModel):
    name: str
    name_fr: Optional[str] = None
    name_ar: Optional[str] = None
    pathogen: Optional[str] = None
    pathogen_type: Optional[str] = None
    severity: Optional[str] = None
    affected_organ: Optional[str] = None
    temp_min: Optional[float] = None
    temp_max: Optional[float] = None
    humidity_min: Optional[float] = None
    rain_min_mm: Optional[float] = None
    leaf_wetness_days_threshold: Optional[int] = None
    suppressed_above_temp: Optional[float] = None
    requires_wound: bool = False
    fruit_stage_only: bool = False
    requires_clay_soil: bool = False
    description: Optional[str] = None

class SusceptibilityUpdateModel(BaseModel):
    variety: str
    disease: str
    score: int
    notes: Optional[str] = None

class KcUpdateModel(BaseModel):
    variety: str
    stage: str
    kc: float

class SoilCompatibilityUpdateModel(BaseModel):
    variety: str
    soil: str
    fitness: str
    notes: Optional[str] = None

class TreatmentModel(BaseModel):
    name: str
    name_ar: Optional[str] = None
    type: Optional[str] = None
    active_ingredient: Optional[str] = None
    formulation: Optional[str] = None
    dose_per_ha: Optional[str] = None
    dose_per_100l: Optional[str] = None
    preharvest_interval_days: Optional[int] = None
    mode_of_action: Optional[str] = None
    organic_approved: bool = False
    timing: Optional[str] = None
    application_season: Optional[str] = None
    notes: Optional[str] = None

class LinkTreatmentModel(BaseModel):
    treatment: str
    disease: str
    linked: bool
    efficacy: Optional[str] = "medium"
    timing: Optional[str] = "preventive"
    priority: Optional[int] = 1

# ── 1. Varieties CRUD ────────────────────────────────────────────────────────

@router.get("/varieties")
def get_varieties(session=Depends(get_db_session)):
    query = """
    MATCH (v:Variety)
    RETURN v
    ORDER BY v.name
    """
    result = session.run(query)
    varieties = []
    for record in result:
        node = record["v"]
        varieties.append(dict(node))
    return varieties

@router.post("/varieties")
def create_variety(data: VarietyModel, session=Depends(get_db_session)):
    # Check if exists
    check_query = "MATCH (v:Variety {name: $name}) RETURN count(v) as count"
    res = session.run(check_query, name=data.name).single()
    if res["count"] > 0:
        raise HTTPException(status_code=400, detail="Variety already exists")

    create_query = """
    CREATE (v:Variety {
        name: $name,
        name_ar: $name_ar,
        origin: $origin,
        use: $use,
        oil_content_pct: $oil_content_pct,
        avg_fruit_weight_g: $avg_fruit_weight_g,
        harvest_season: $harvest_season,
        drought_tolerance: $drought_tolerance,
        cold_tolerance: $cold_tolerance,
        vigor: $vigor,
        pollination: $pollination,
        density_recommended: $density_recommended,
        notes: $notes
    })
    WITH v
    MATCH (ot:OperationTemplate)
    CREATE (v)-[:HAS_OPERATION]->(ot)
    WITH v
    MATCH (p:Parameter)
    WHERE p.name IN ["Variété", "Porte-greffe", "Texture du Sol", "Système d Irrigation", "Exposition", "Densité de Plantation"]
    CREATE (v)-[:HAS_FIELD_REQUIREMENT]->(p)
    RETURN v
    """
    session.run(create_query, **data.model_dump())
    return {"message": "Variety created successfully"}

@router.put("/varieties")
def update_variety(data: VarietyModel, session=Depends(get_db_session)):
    update_query = """
    MATCH (v:Variety {name: $name})
    SET v.name_ar = $name_ar,
        v.origin = $origin,
        v.use = $use,
        v.oil_content_pct = $oil_content_pct,
        v.avg_fruit_weight_g = $avg_fruit_weight_g,
        v.harvest_season = $harvest_season,
        v.drought_tolerance = $drought_tolerance,
        v.cold_tolerance = $cold_tolerance,
        v.vigor = $vigor,
        v.pollination = $pollination,
        v.density_recommended = $density_recommended,
        v.notes = $notes
    RETURN v
    """
    res = session.run(update_query, **data.model_dump())
    if not res.peek():
        raise HTTPException(status_code=404, detail="Variety not found")
    return {"message": "Variety updated successfully"}

@router.delete("/varieties/{name}")
def delete_variety(name: str, session=Depends(get_db_session)):
    query = "MATCH (v:Variety {name: $name}) DETACH DELETE v"
    session.run(query, name=name)
    return {"message": "Variety deleted successfully"}

# ── 2. Diseases CRUD ─────────────────────────────────────────────────────────

@router.get("/diseases")
def get_diseases(session=Depends(get_db_session)):
    query = """
    MATCH (d:Disease)
    RETURN d
    ORDER BY d.name
    """
    result = session.run(query)
    diseases = []
    for record in result:
        node = record["d"]
        diseases.append(dict(node))
    return diseases

@router.post("/diseases")
def create_disease(data: DiseaseModel, session=Depends(get_db_session)):
    check_query = "MATCH (d:Disease {name: $name}) RETURN count(d) as count"
    res = session.run(check_query, name=data.name).single()
    if res["count"] > 0:
        raise HTTPException(status_code=400, detail="Disease already exists")

    create_query = """
    CREATE (d:Disease {
        name: $name,
        name_fr: $name_fr,
        name_ar: $name_ar,
        pathogen: $pathogen,
        pathogen_type: $pathogen_type,
        severity: $severity,
        affected_organ: $affected_organ,
        temp_min: $temp_min,
        temp_max: $temp_max,
        humidity_min: $humidity_min,
        rain_min_mm: $rain_min_mm,
        leaf_wetness_days_threshold: $leaf_wetness_days_threshold,
        suppressed_above_temp: $suppressed_above_temp,
        requires_wound: $requires_wound,
        fruit_stage_only: $fruit_stage_only,
        requires_clay_soil: $requires_clay_soil,
        description: $description
    })
    RETURN d
    """
    session.run(create_query, **data.model_dump())
    return {"message": "Disease created successfully"}

@router.put("/diseases")
def update_disease(data: DiseaseModel, session=Depends(get_db_session)):
    update_query = """
    MATCH (d:Disease {name: $name})
    SET d.name_fr = $name_fr,
        d.name_ar = $name_ar,
        d.pathogen = $pathogen,
        d.pathogen_type = $pathogen_type,
        d.severity = $severity,
        d.affected_organ = $affected_organ,
        d.temp_min = $temp_min,
        d.temp_max = $temp_max,
        d.humidity_min = $humidity_min,
        d.rain_min_mm = $rain_min_mm,
        d.leaf_wetness_days_threshold = $leaf_wetness_days_threshold,
        d.suppressed_above_temp = $suppressed_above_temp,
        d.requires_wound = $requires_wound,
        d.fruit_stage_only = $fruit_stage_only,
        d.requires_clay_soil = $requires_clay_soil,
        d.description = $description
    RETURN d
    """
    res = session.run(update_query, **data.model_dump())
    if not res.peek():
        raise HTTPException(status_code=404, detail="Disease not found")
    return {"message": "Disease updated successfully"}

@router.delete("/diseases/{name}")
def delete_disease(name: str, session=Depends(get_db_session)):
    query = "MATCH (d:Disease {name: $name}) DETACH DELETE d"
    session.run(query, name=name)
    return {"message": "Disease deleted successfully"}

# ── 3. Susceptibility Matrix ────────────────────────────────────────────────

@router.get("/susceptibility")
def get_susceptibility_matrix(session=Depends(get_db_session)):
    query = """
    MATCH (v:Variety)
    MATCH (d:Disease)
    OPTIONAL MATCH (v)-[r:SUSCEPTIBLE_TO]->(d)
    RETURN v.name as variety, d.name as disease, r.score as score, r.notes as notes
    """
    result = session.run(query)
    matrix = []
    for r in result:
        matrix.append({
            "variety": r["variety"],
            "disease": r["disease"],
            "score": r["score"] if r["score"] is not None else 0,
            "notes": r["notes"] or ""
        })
    return matrix

@router.put("/susceptibility")
def update_susceptibility(data: SusceptibilityUpdateModel, session=Depends(get_db_session)):
    query = """
    MATCH (v:Variety {name: $variety}), (d:Disease {name: $disease})
    MERGE (v)-[r:SUSCEPTIBLE_TO]->(d)
    SET r.score = $score, r.notes = $notes
    RETURN r
    """
    res = session.run(query, variety=data.variety, disease=data.disease, score=data.score, notes=data.notes)
    if not res.peek():
        raise HTTPException(status_code=400, detail="Variety or Disease not found")
    return {"message": "Susceptibility updated successfully"}

# ── 4. Crop Coefficient (Kc) Matrix ──────────────────────────────────────────

@router.get("/kc-matrix")
def get_kc_matrix(session=Depends(get_db_session)):
    query = """
    MATCH (v:Variety)
    MATCH (s:Stage)
    OPTIONAL MATCH (v)-[r:HAS_KC_AT]->(s)
    RETURN v.name as variety, s.name as stage, r.kc as kc, s.order as order
    ORDER BY v.name, s.order
    """
    result = session.run(query)
    matrix = []
    for r in result:
        matrix.append({
            "variety": r["variety"],
            "stage": r["stage"],
            "kc": r["kc"] if r["kc"] is not None else 0.45,
            "order": r["order"]
        })
    return matrix

@router.put("/kc-matrix")
def update_kc(data: KcUpdateModel, session=Depends(get_db_session)):
    query = """
    MATCH (v:Variety {name: $variety}), (s:Stage {name: $stage})
    MERGE (v)-[r:HAS_KC_AT]->(s)
    SET r.kc = $kc
    RETURN r
    """
    res = session.run(query, variety=data.variety, stage=data.stage, kc=data.kc)
    if not res.peek():
        raise HTTPException(status_code=400, detail="Variety or Stage not found")
    return {"message": "Kc updated successfully"}

# ── 5. Soil Compatibility Matrix ─────────────────────────────────────────────

@router.get("/soil-compatibility")
def get_soil_compatibility(session=Depends(get_db_session)):
    query = """
    MATCH (v:Variety)
    MATCH (s:SoilType)
    OPTIONAL MATCH (v)-[r:SUITED_FOR]->(s)
    RETURN v.name as variety, s.name as soil, r.fitness as fitness, r.notes as notes
    """
    result = session.run(query)
    matrix = []
    for r in result:
        matrix.append({
            "variety": r["variety"],
            "soil": r["soil"],
            "fitness": r["fitness"] or "GOOD", # Default to GOOD
            "notes": r["notes"] or ""
        })
    return matrix

@router.put("/soil-compatibility")
def update_soil_compatibility(data: SoilCompatibilityUpdateModel, session=Depends(get_db_session)):
    query = """
    MATCH (v:Variety {name: $variety}), (s:SoilType {name: $soil})
    MERGE (v)-[r:SUITED_FOR]->(s)
    SET r.fitness = $fitness, r.notes = $notes
    RETURN r
    """
    res = session.run(query, variety=data.variety, soil=data.soil, fitness=data.fitness, notes=data.notes)
    if not res.peek():
        raise HTTPException(status_code=400, detail="Variety or Soil type not found")
    return {"message": "Soil compatibility updated successfully"}

# ── 6. Treatments CRUD & Linkage ─────────────────────────────────────────────

@router.get("/treatments")
def get_treatments(session=Depends(get_db_session)):
    query = """
    MATCH (t:Treatment)
    OPTIONAL MATCH (d:Disease)-[r:TREATABLE_BY]->(t)
    RETURN t, collect({
        disease: d.name,
        efficacy: r.efficacy,
        timing: r.timing,
        priority: r.priority,
        notes: r.notes
    }) as links
    ORDER BY t.name
    """
    result = session.run(query)
    treatments = []
    for record in result:
        t_node = record["t"]
        links = record["links"]
        # Filter out empty records (e.g. when no diseases link to treatment)
        valid_links = [l for l in links if l.get("disease") is not None]
        
        t_dict = dict(t_node)
        t_dict["diseases"] = valid_links
        treatments.append(t_dict)
    return treatments

@router.post("/treatments")
def create_treatment(data: TreatmentModel, session=Depends(get_db_session)):
    check_query = "MATCH (t:Treatment {name: $name}) RETURN count(t) as count"
    res = session.run(check_query, name=data.name).single()
    if res["count"] > 0:
        raise HTTPException(status_code=400, detail="Treatment already exists")

    create_query = """
    CREATE (t:Treatment {
        name: $name,
        name_ar: $name_ar,
        type: $type,
        active_ingredient: $active_ingredient,
        formulation: $formulation,
        dose_per_ha: $dose_per_ha,
        dose_per_100l: $dose_per_100l,
        preharvest_interval_days: $preharvest_interval_days,
        mode_of_action: $mode_of_action,
        organic_approved: $organic_approved,
        timing: $timing,
        application_season: $application_season,
        notes: $notes
    })
    RETURN t
    """
    session.run(create_query, **data.model_dump())
    return {"message": "Treatment created successfully"}

@router.put("/treatments")
def update_treatment(data: TreatmentModel, session=Depends(get_db_session)):
    update_query = """
    MATCH (t:Treatment {name: $name})
    SET t.name_ar = $name_ar,
        t.type = $type,
        t.active_ingredient = $active_ingredient,
        t.formulation = $formulation,
        t.dose_per_ha = $dose_per_ha,
        t.dose_per_100l = $dose_per_100l,
        t.preharvest_interval_days = $preharvest_interval_days,
        t.mode_of_action = $mode_of_action,
        t.organic_approved = $organic_approved,
        t.timing = $timing,
        t.application_season = $application_season,
        t.notes = $notes
    RETURN t
    """
    res = session.run(update_query, **data.model_dump())
    if not res.peek():
        raise HTTPException(status_code=404, detail="Treatment not found")
    return {"message": "Treatment updated successfully"}

@router.delete("/treatments/{name}")
def delete_treatment(name: str, session=Depends(get_db_session)):
    query = "MATCH (t:Treatment {name: $name}) DETACH DELETE t"
    session.run(query, name=name)
    return {"message": "Treatment deleted successfully"}

@router.post("/treatments/link")
def link_treatment_disease(data: LinkTreatmentModel, session=Depends(get_db_session)):
    if data.linked:
        query = """
        MATCH (d:Disease {name: $disease}), (t:Treatment {name: $treatment})
        MERGE (d)-[r:TREATABLE_BY]->(t)
        SET r.efficacy = $efficacy,
            r.timing = $timing,
            r.priority = $priority
        RETURN r
        """
        res = session.run(query, disease=data.disease, treatment=data.treatment, 
                          efficacy=data.efficacy, timing=data.timing, priority=data.priority)
        if not res.peek():
            raise HTTPException(status_code=400, detail="Disease or Treatment not found")
        return {"message": "Disease linked to treatment successfully"}
    else:
        query = """
        MATCH (d:Disease {name: $disease})-[r:TREATABLE_BY]->(t:Treatment {name: $treatment})
        DELETE r
        """
        session.run(query, disease=data.disease, treatment=data.treatment)
        return {"message": "Disease unlinked from treatment successfully"}

# ── 7. Graph Statistics ──────────────────────────────────────────────────────

@router.get("/stats")
def get_graph_stats(session=Depends(get_db_session)):
    nodes_res = session.run("MATCH (n) RETURN count(n) as c").single()
    edges_res = session.run("MATCH ()-[r]->() RETURN count(r) as c").single()
    
    # Label breakdown
    labels = ["Variety", "Disease", "Stage", "SoilType", "Treatment"]
    counts = {}
    for label in labels:
        res = session.run(f"MATCH (n:{label}) RETURN count(n) as c").single()
        counts[label] = res["c"]
        
    return {
        "total_nodes": nodes_res["c"],
        "total_relationships": edges_res["c"],
        "breakdown": counts
    }
