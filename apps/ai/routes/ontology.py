from fastapi import APIRouter, Depends, Query
from database import get_db_session

router = APIRouter(
    prefix="/api/ontology",
    tags=["ontology"]
)


@router.get("/operation-requirements")
def get_operation_requirements(
    crop_name: str = Query(..., description="Olive variety name (e.g. Koroneiki)"),
    operation_type: str = Query(..., description="Operation type (e.g. IRRIGATION, PRUNING)"),
    session=Depends(get_db_session)
):
    """Return the dynamic parameters required for a given operation on an olive variety."""
    query = """
    MATCH (c)-[:HAS_OPERATION]->(o:OperationTemplate {type: $operation_type})
    MATCH (o)-[:REQUIRES_PARAMETER]->(p:Parameter)
    WHERE (c:OliveVariety OR c:Crop OR c:Variety) AND c.name = $crop_name
    RETURN p.name AS name, p.unit AS unit, p.type AS inputType, p.options AS options
    """
    result = session.run(query, crop_name=crop_name, operation_type=operation_type)
    parameters = []
    seen = set()
    for record in result:
        pname = record["name"]
        if pname not in seen:
            seen.add(pname)
            parameters.append({
                "name": pname,
                "unit": record["unit"],
                "inputType": record["inputType"],
                "options": record["options"].split(",") if record["options"] else None
            })
    return parameters


@router.get("/field-requirements")
def get_field_requirements(
    crop_name: str = Query(..., description="Olive variety name (e.g. Koroneiki)"),
    session=Depends(get_db_session)
):
    """Return the agronomic fields required when registering an olive field."""
    query = """
    MATCH (c)-[:HAS_FIELD_REQUIREMENT]->(p:Parameter)
    WHERE (c:OliveVariety OR c:Crop OR c:Variety) AND c.name = $crop_name
    RETURN p.name AS name, p.type AS inputType, p.options AS options
    """
    result = session.run(query, crop_name=crop_name)
    parameters = []
    seen = set()
    for record in result:
        pname = record["name"]
        if pname not in seen:
            seen.add(pname)
            parameters.append({
                "name": pname,
                "inputType": record["inputType"],
                "options": record["options"].split(",") if record["options"] else None
            })
    return parameters


@router.get("/varieties")
def get_olive_varieties(session=Depends(get_db_session)):
    """Return all registered olive varieties with their metadata."""
    query = """
    MATCH (v:Variety)
    RETURN v.name AS name, v.origin AS origin,
           v.oil_content_pct AS oil_content, v.harvest_season AS harvest_season
    ORDER BY v.name
    """
    result = session.run(query)
    varieties = []
    for r in result:
        varieties.append({
            "name": r["name"],
            "origin": r["origin"],
            "oil_content": r["oil_content"],
            "harvest_season": r["harvest_season"],
        })
    
    # Legacy fallback if Variety nodes not created yet
    if not varieties:
        query_legacy = """
        MATCH (v:OliveVariety)
        RETURN v.name AS name, v.origin AS origin,
               v.oil_content AS oil_content, v.harvest_season AS harvest_season
        ORDER BY v.name
        """
        res_legacy = session.run(query_legacy)
        for r in res_legacy:
            varieties.append({
                "name": r["name"],
                "origin": r["origin"],
                "oil_content": r["oil_content"],
                "harvest_season": r["harvest_season"],
            })
            
    return varieties


@router.get("/stages")
def get_phenological_stages(session=Depends(get_db_session)):
    """Return all stages sorted by order with their GDD bounds."""
    query = """
    MATCH (s:Stage)
    RETURN s.name AS name, s.gdd_start AS min_gdd, s.gdd_end AS max_gdd, s.order AS order
    ORDER BY s.order
    """
    result = session.run(query)
    stages = []
    for r in result:
        stages.append({
            "name": r["name"],
            "min_gdd": r["min_gdd"],
            "max_gdd": r["max_gdd"],
            "order": r["order"]
        })
    return stages


@router.get("/chilling-requirement")
def get_chilling_requirement(session=Depends(get_db_session)):
    """Return default chilling hours required from graph rules."""
    query = """
    MATCH (i:IrrigationDefault)
    RETURN i.default_chilling_required_hours AS chilling
    """
    res = session.run(query).single()
    if res and res["chilling"] is not None:
        return {"chilling_hours": res["chilling"]}
    return {"chilling_hours": 350}  # default fallback
