from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
import math
from database import get_db_session

router = APIRouter(
    prefix="/api/agronomy",
    tags=["agronomy"]
)

class AgronomicCalculationRequest(BaseModel):
    crop: str
    stage: str
    tmax: float
    tmin: float
    precipitation: float
    tree_density: float
    drippers_per_tree: int
    dripper_flow_rate: float
    efficiency: float
    target_yield: float
    bearing_status: str  # "ON_YEAR" | "OFF_YEAR" | "NORMAL"
    soil_ph: Optional[float] = None
    soil_organic_matter: Optional[float] = None
    soil_nitrogen: Optional[float] = None
    soil_phosphorus: Optional[float] = None
    soil_potassium: Optional[float] = None
    canopy_cover_pct: Optional[float] = None

@router.post("/calculate")
def calculate_recommendations(request: AgronomicCalculationRequest, session=Depends(get_db_session)):
    crop_lower = request.crop.lower()
    is_shd = any(k in crop_lower for k in ["arbequina", "arbosana", "koroneiki"])

    # ── 1. Query variety-specific Kc from Memgraph ──
    query_kc = """
    MATCH (v:Variety {name: $crop})-[r:HAS_KC_AT]->(s:Stage {name: $stage})
    RETURN r.kc as kc
    """
    res_kc = session.run(query_kc, crop=request.crop, stage=request.stage.upper()).single()
    
    if res_kc and res_kc["kc"] is not None:
        kc = res_kc["kc"]
    else:
        # Fallback defaults if relation doesn't exist (Arbequina has lower Kc in SHD)
        fallbacks = {
            "DORMANCE": 0.40 if is_shd else 0.45,
            "DEBOURREMENT": 0.48 if is_shd else 0.55,
            "FLORAISON": 0.55 if is_shd else 0.60,
            "NOUAISON": 0.58 if is_shd else 0.65,
            "CROISSANCE": 0.65 if is_shd else 0.70,
            "VERAISON": 0.50 if is_shd else 0.55,
            "RECOLTE": 0.45 if is_shd else 0.50
        }
        kc = fallbacks.get(request.stage.upper(), 0.55)

    # ── 2. Query NPK rules & default configs from Memgraph ──
    query_rules = """
    MATCH (r:NPKRule {crop: "Olive"})
    RETURN r
    """
    res_rules = session.run(query_rules).single()
    if res_rules:
        rules = dict(res_rules["r"])
    else:
        # Default fallback rules
        rules = {
            "n_export_per_ton": 15.0,
            "p2o5_export_per_ton": 5.0,
            "k2o_export_per_ton": 20.0,
            "on_year_n_multiplier": 1.0,
            "on_year_p_multiplier": 1.0,
            "on_year_k_multiplier": 1.2,
            "off_year_n_multiplier": 0.8,
            "off_year_p_multiplier": 1.0,
            "off_year_k_multiplier": 0.6,
            "soil_n_per_pct_om": 10.0,
            "soil_p_per_ppm_olsen": 0.5,
            "soil_k_per_ppm_exchangeable": 0.3,
            "ra_constant": 12.0
        }

    # ── 3. Irrigation Calculations (FAO-56 Paper 56, Chapter 8 with Kr Canopy Reduction Factor) ──
    tavg = (request.tmax + request.tmin) / 2
    temp_diff = max(0.1, request.tmax - request.tmin)
    ra = rules.get("ra_constant", 12.0)
    
    # Hargreaves equation for ET0
    et0 = 0.0023 * (tavg + 17.8) * math.pow(temp_diff, 0.5) * ra

    # Ground Cover Reduction Factor Kr = min(1.0, 2.0 * fCOVER)
    if request.canopy_cover_pct is not None and request.canopy_cover_pct > 0:
        kr = min(1.0, max(0.2, 2.0 * (request.canopy_cover_pct / 100.0)))
    else:
        kr = 0.60 if is_shd else 0.80

    etc = et0 * kc * kr
    net_water_depth = max(0.0, etc - request.precipitation)

    # Variety-aware tree density fallback if density is unconfigured or default
    density = request.tree_density
    if density < 50 or density > 3500:
        density = 1666.0 if is_shd else 200.0
    elif density == 200.0 and is_shd:
        density = 1666.0  # Correct default for Arbequina SHD

    liters_per_tree = 0.0
    duration_minutes = 0
    
    if density > 0:
        liters_per_tree = (net_water_depth * 10000) / density
        
        # Dripper delivery rate in L/h per tree with efficiency
        drippers = max(1, request.drippers_per_tree)
        flow_rate = max(0.5, request.dripper_flow_rate)
        eff = max(0.5, min(1.0, request.efficiency))

        divider = drippers * flow_rate * eff
        if divider > 0:
            hours = liters_per_tree / divider
            duration_minutes = int(round(hours * 60))

    # ── 4. NPK Fertilization Calculations ──
    # Adjust export values based on bearing status
    n_mult = 1.0
    p_mult = 1.0
    k_mult = 1.0
    
    if request.bearing_status == "ON_YEAR":
        n_mult = rules.get("on_year_n_multiplier", 1.0)
        p_mult = rules.get("on_year_p_multiplier", 1.0)
        k_mult = rules.get("on_year_k_multiplier", 1.2)
    elif request.bearing_status == "OFF_YEAR":
        n_mult = rules.get("off_year_n_multiplier", 0.8)
        p_mult = rules.get("off_year_p_multiplier", 1.0)
        k_mult = rules.get("off_year_k_multiplier", 0.6)
        
    n_export = rules.get("n_export_per_ton", 15.0) * n_mult
    p_export = rules.get("p2o5_export_per_ton", 5.0) * p_mult
    k_export = rules.get("k2o_export_per_ton", 20.0) * k_mult
    
    # Gross nutrient needs
    n_gross = n_export * request.target_yield
    p_gross = p_export * request.target_yield
    k_gross = k_export * request.target_yield
    
    # Soil nutrient contributions (deductions)
    n_soil = 0.0
    p_soil = 0.0
    k_soil = 0.0
    
    if request.soil_organic_matter is not None:
        n_soil = request.soil_organic_matter * rules.get("soil_n_per_pct_om", 10.0)
    if request.soil_phosphorus is not None:
        p_soil = request.soil_phosphorus * rules.get("soil_p_per_ppm_olsen", 0.5)
    if request.soil_potassium is not None:
        k_soil = request.soil_potassium * rules.get("soil_k_per_ppm_exchangeable", 0.3)
        
    # Net recommendations (divided by standard efficiency factors: N=70%, P=50%, K=60%)
    n_rec = max(0.0, n_gross - n_soil) / 0.7
    p_rec = max(0.0, p_gross - p_soil) / 0.5
    k_rec = max(0.0, k_gross - k_soil) / 0.6

    return {
        "irrigation": {
            "et0": round(et0, 2),
            "kc": round(kc, 2),
            "etc": round(etc, 2),
            "precipitation": round(request.precipitation, 2),
            "netWaterDepthMm": round(net_water_depth, 2),
            "litersPerTree": round(liters_per_tree, 1),
            "durationMinutes": duration_minutes
        },
        "fertilization": {
            "n_rec": round(n_rec, 1),
            "p_rec": round(p_rec, 1),
            "k_rec": round(k_rec, 1),
            "n_gross": round(n_gross, 1),
            "p_gross": round(p_gross, 1),
            "k_gross": round(k_gross, 1),
            "n_soil_contrib": round(n_soil, 1),
            "p_soil_contrib": round(p_soil, 1),
            "k_soil_contrib": round(k_soil, 1)
        }
    }
