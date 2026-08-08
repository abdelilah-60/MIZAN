from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
import math
from datetime import date
from database import get_db_session

router = APIRouter(
    prefix="/api/agronomy",
    tags=["agronomy"]
)

# ── FAO-56 Extraterrestrial Radiation (Ra) ──
def compute_ra(latitude_deg: float, day_of_year: int) -> float:
    """FAO-56 Equation 21: Extraterrestrial radiation Ra in mm/day equivalent (MJ/m²/day * 0.408)"""
    lat = math.radians(latitude_deg)
    dr = 1 + 0.033 * math.cos(2 * math.pi * day_of_year / 365)
    delta = 0.409 * math.sin(2 * math.pi * day_of_year / 365 - 1.39)
    ws = math.acos(
        max(-1.0, min(1.0, -math.tan(lat) * math.tan(delta)))
    )
    Gsc = 0.0820  # Solar constant MJ/m²/min
    ra_mj = (24 * 60 / math.pi) * Gsc * dr * (
        ws * math.sin(lat) * math.sin(delta) +
        math.cos(lat) * math.cos(delta) * math.sin(ws)
    )
    # Convert MJ/m²/day to mm/day equivalent evaporation (FAO-56 Chapter 3)
    return ra_mj * 0.408

# ── Kc Interpolation between phenological stages ──
KC_STAGES_STANDARD = [
    ("DORMANCE", 0.45),
    ("DEBOURREMENT", 0.55),
    ("FLORAISON", 0.60),
    ("NOUAISON", 0.65),
    ("CROISSANCE", 0.70),
    ("VERAISON", 0.55),
    ("RECOLTE", 0.50),
]

KC_STAGES_SHD = [
    ("DORMANCE", 0.40),
    ("DEBOURREMENT", 0.48),
    ("FLORAISON", 0.55),
    ("NOUAISON", 0.58),
    ("CROISSANCE", 0.65),
    ("VERAISON", 0.50),
    ("RECOLTE", 0.45),
]

def interpolate_kc(stage: str, gdd_progress_pct: float, is_shd: bool) -> float:
    """Smooth linear interpolation of Kc between current and next phenological stage."""
    stages = KC_STAGES_SHD if is_shd else KC_STAGES_STANDARD
    stage_upper = stage.upper()
    
    current_idx = None
    for i, (s, _) in enumerate(stages):
        if s == stage_upper:
            current_idx = i
            break
    
    if current_idx is None:
        return 0.55
    
    current_kc = stages[current_idx][1]
    
    if current_idx < len(stages) - 1:
        next_kc = stages[current_idx + 1][1]
        progress = max(0.0, min(1.0, gdd_progress_pct))
        return current_kc + (next_kc - current_kc) * progress
    
    return current_kc


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
    bearing_status: str
    latitude: Optional[float] = None
    day_of_year: Optional[int] = None
    gdd_progress_pct: Optional[float] = None
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
        gdd_pct = request.gdd_progress_pct if request.gdd_progress_pct is not None else 0.5
        kc = interpolate_kc(request.stage, gdd_pct, is_shd)

    # ── 2. Query NPK rules from Memgraph ──
    query_rules = """
    MATCH (r:NPKRule {crop: "Olive"})
    RETURN r
    """
    res_rules = session.run(query_rules).single()
    if res_rules:
        rules = dict(res_rules["r"])
    else:
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
        }

    # ── 3. Irrigation Calculations (FAO-56 with dynamic Ra) ──
    tavg = (request.tmax + request.tmin) / 2
    temp_diff = max(0.1, request.tmax - request.tmin)

    # Dynamic Ra based on latitude and day of year
    lat = request.latitude if request.latitude is not None else 33.0  # Default: central Morocco
    doy = request.day_of_year if request.day_of_year is not None else date.today().timetuple().tm_yday
    ra = compute_ra(lat, doy)
    
    # Hargreaves-Samani ET0
    et0 = 0.0023 * (tavg + 17.8) * math.pow(temp_diff, 0.5) * ra

    # Ground Cover Reduction Factor Kr
    if request.canopy_cover_pct is not None and request.canopy_cover_pct > 0:
        kr = min(1.0, max(0.2, 2.0 * (request.canopy_cover_pct / 100.0)))
    else:
        kr = 0.60 if is_shd else 0.80

    etc = et0 * kc * kr
    net_water_depth = max(0.0, etc - request.precipitation)

    density = request.tree_density if request.tree_density > 0 else 200.0

    liters_per_tree = 0.0
    duration_minutes = 0
    
    if density > 0:
        liters_per_tree = (net_water_depth * 10000) / density
        
        drippers = max(1, request.drippers_per_tree)
        flow_rate = max(0.5, request.dripper_flow_rate)
        eff = max(0.5, min(1.0, request.efficiency))

        divider = drippers * flow_rate * eff
        if divider > 0:
            hours = liters_per_tree / divider
            duration_minutes = int(round(hours * 60))

    # ── 4. NPK Fertilization ──
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
    
    n_gross = n_export * request.target_yield
    p_gross = p_export * request.target_yield
    k_gross = k_export * request.target_yield
    
    n_soil = 0.0
    p_soil = 0.0
    k_soil = 0.0
    
    if request.soil_organic_matter is not None:
        n_soil = request.soil_organic_matter * rules.get("soil_n_per_pct_om", 10.0)
    if request.soil_phosphorus is not None:
        p_soil = request.soil_phosphorus * rules.get("soil_p_per_ppm_olsen", 0.5)
    if request.soil_potassium is not None:
        k_soil = request.soil_potassium * rules.get("soil_k_per_ppm_exchangeable", 0.3)
        
    n_rec = max(0.0, n_gross - n_soil) / 0.7
    p_rec = max(0.0, p_gross - p_soil) / 0.5
    k_rec = max(0.0, k_gross - k_soil) / 0.6

    # Monthly NPK Distribution (February to September active season)
    monthly_weights = [
        {"month": "Février", "month_num": 2, "n_pct": 0.15, "p_pct": 0.30, "k_pct": 0.10, "stage": "Débourrement"},
        {"month": "Mars", "month_num": 3, "n_pct": 0.20, "p_pct": 0.20, "k_pct": 0.10, "stage": "Floraison"},
        {"month": "Avril", "month_num": 4, "n_pct": 0.20, "p_pct": 0.15, "k_pct": 0.10, "stage": "Nouaison"},
        {"month": "Mai", "month_num": 5, "n_pct": 0.15, "p_pct": 0.10, "k_pct": 0.15, "stage": "Croissance"},
        {"month": "Juin", "month_num": 6, "n_pct": 0.15, "p_pct": 0.10, "k_pct": 0.20, "stage": "Durcissement du noyau"},
        {"month": "Juillet", "month_num": 7, "n_pct": 0.10, "p_pct": 0.10, "k_pct": 0.20, "stage": "Accumulation d'huile"},
        {"month": "Août", "month_num": 8, "n_pct": 0.05, "p_pct": 0.05, "k_pct": 0.10, "stage": "Véraison"},
        {"month": "Septembre", "month_num": 9, "n_pct": 0.00, "p_pct": 0.00, "k_pct": 0.05, "stage": "Maturation"},
    ]

    monthly_schedule = [
        {
            "month": w["month"],
            "monthNum": w["month_num"],
            "stage": w["stage"],
            "n_kg": round(n_rec * w["n_pct"], 1),
            "p_kg": round(p_rec * w["p_pct"], 1),
            "k_kg": round(k_rec * w["k_pct"], 1),
        }
        for w in monthly_weights
    ]

    # Micronutrients Calculation
    stg_upper = request.stage.upper()
    boron_g_tree = 25.0 if stg_upper in ["DEBOURREMENT", "FLORAISON", "NOUAISON"] else 0.0
    zinc_g_tree = 15.0 if stg_upper in ["DEBOURREMENT", "FLORAISON"] else 0.0
    iron_g_tree = 10.0 if (request.soil_ph is not None and request.soil_ph > 7.8) else 0.0
    mg_kg_ha = 20.0 if (request.soil_potassium is not None and request.soil_potassium > 300) else 0.0

    micronutrients = {
        "boron_g_per_tree": boron_g_tree,
        "zinc_g_per_tree": zinc_g_tree,
        "iron_chelate_g_per_tree": iron_g_tree,
        "magnesium_kg_per_ha": mg_kg_ha,
    }

    # Seasonal Foliar Sprays Guidelines
    foliar_sprays = []
    if stg_upper in ["DEBOURREMENT", "FLORAISON"]:
        foliar_sprays.append({
            "target": "البورون + الزنك (Bore + Zinc)",
            "timing": "قبل الإزهار بـ 10-15 يوماً (Stade Boutons Rose)",
            "dose": "200g B + 150g Zn لكل 100 لتر ماء",
            "purpose": "تحسين جودة اللقاح ونسبة العقد ومنع تساقط الأزهار"
        })
    if request.soil_ph is not None and request.soil_ph > 7.8:
        foliar_sprays.append({
            "target": "الحديد المخلبي (Chélate de Fer EDDHA)",
            "timing": "عند بداية النمو الخضري الربيعي",
            "dose": "50g لكل شجرة في المحلول أو رش ورقي 1.5g/L",
            "purpose": "علاج منع اصفرار الأوراق الناجم عن التكلس"
        })
    if stg_upper in ["CROISSANCE", "VERAISON"]:
        foliar_sprays.append({
            "target": "البوتاسيوم الورقي (Sulfate ou Nitrate de Potassium)",
            "timing": "مرحلة نماء الثمار والتصلب",
            "dose": "2kg-3kg لكل 100 لتر ماء",
            "purpose": "زيادة حجم الثمار وتحفيز نسبة استخلاص الزيت"
        })

    return {
        "irrigation": {
            "et0": round(et0, 2),
            "kc": round(kc, 2),
            "kr": round(kr, 2),
            "ra": round(ra, 2),
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
            "k_soil_contrib": round(k_soil, 1),
            "monthlySchedule": monthly_schedule,
            "micronutrients": micronutrients,
            "foliarSprays": foliar_sprays
        }
    }
