from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from database import get_db_session
from datetime import datetime

router = APIRouter(
    prefix="/api/insights",
    tags=["insights"]
)

# ── Olive-specific scoring weights ──────────────────────────────────────────
DISEASE_SEVERITY_SCORE = {"High": 20, "Medium": 13, "Low": 7}

# Varieties with known higher disease susceptibility
HIGH_SUSCEPTIBILITY_VARIETIES = {"Arbequina", "Dahbia"}

# Optimal olive temperature range
OLIVE_OPTIMAL_TEMP_MIN = 15
OLIVE_OPTIMAL_TEMP_MAX = 32


class DailyMetricInput(BaseModel):
    date: str
    tmax: float
    tmin: float
    humidity: Optional[float] = None
    precipitation: Optional[float] = None
    gddDaily: float
    accumulatedGdd: float
    chillingHoursToday: float
    accumulatedChilling: float
    bioFixReached: bool
    currentStage: Optional[str] = None
    gddToNextStage: Optional[float] = None

class InsightRequest(BaseModel):
    crop: str  # Olive variety name (e.g. "Koroneiki", "Picholine Marocaine")
    condition: str
    temperature: float = 0
    humidity: float = 0
    recent_operations: List[Dict[str, Any]] = []
    planting_date: Optional[str] = None
    agronomic_data: Dict[str, Any] = {}
    accumulated_gdd: float = 0
    current_stage: str = "DORMANCE"
    bio_fix_reached: bool = False
    gdd_to_next_stage: Optional[float] = None
    days_in_current_stage: int = 0
    history: List[DailyMetricInput] = []


@router.post("/")
def generate_insights(request: InsightRequest, session=Depends(get_db_session)):
    # ── Query Memgraph: match Variety and pull susceptibility + triggers ──
    query = """
    MATCH (v:Variety {name: $crop})-[r:SUSCEPTIBLE_TO]->(d:Disease)
    RETURN d.name AS disease, d.severity AS severity, d.pathogen AS pathogen,
           r.score AS susceptibility_score,
           d.temp_min AS temp_min, d.temp_max AS temp_max,
           d.humidity_min AS humidity_min, d.rain_min_mm AS rain_min_mm,
           d.leaf_wetness_days_threshold AS leaf_wetness_days_threshold,
           d.suppressed_above_temp AS suppressed_above_temp,
           d.requires_wound AS requires_wound,
           d.fruit_stage_only AS fruit_stage_only,
           d.requires_clay_soil AS requires_clay_soil
    """
    result = session.run(query, crop=request.crop)
    risks_raw = [record for record in result]
    
    # Legacy fallback if no variety matching Variety label
    if not risks_raw:
        query_fallback = """
        MATCH (c)-[v:VULNERABLE_TO]->(d:Disease)
        WHERE (c:OliveVariety OR c:Crop OR c:Variety) AND c.name = $crop
        RETURN d.name AS disease, d.severity AS severity, d.pathogen AS pathogen,
               75 AS susceptibility_score,
               10.0 AS temp_min, 22.0 AS temp_max, 75.0 AS humidity_min, 1.0 AS rain_min_mm,
               2 AS leaf_wetness_days_threshold, 30.0 AS suppressed_above_temp,
               false AS requires_wound, false AS fruit_stage_only, false AS requires_clay_soil
        """
        result = session.run(query_fallback, crop=request.crop)
        risks_raw = [record for record in result]

    risks = []
    for r in risks_raw:
        risks.append({
            "disease": r["disease"],
            "severity": r["severity"],
            "pathogen": r.get("pathogen", "Unknown"),
            "susceptibility_score": r.get("susceptibility_score") if r.get("susceptibility_score") is not None else 50,
            "temp_min": r.get("temp_min"),
            "temp_max": r.get("temp_max"),
            "humidity_min": r.get("humidity_min"),
            "rain_min_mm": r.get("rain_min_mm"),
            "leaf_wetness_days_threshold": r.get("leaf_wetness_days_threshold"),
            "suppressed_above_temp": r.get("suppressed_above_temp"),
            "requires_wound": r.get("requires_wound", False),
            "fruit_stage_only": r.get("fruit_stage_only", False),
            "requires_clay_soil": r.get("requires_clay_soil", False)
        })

    # ── Compute tree age in years ────────────────────────────────────────────
    age_years = 0
    if request.planting_date:
        try:
            p_date = datetime.fromisoformat(
                request.planting_date.replace("Z", "+00:00")
            )
            age_years = (datetime.now() - p_date.replace(tzinfo=None)).days / 365.25
        except Exception:
            pass

    soil_texture = request.agronomic_data.get("Texture du Sol", "")
    irrigation_system = request.agronomic_data.get("Système d Irrigation", "")
    exposition = request.agronomic_data.get("Exposition", "")

    considered_recent = len(request.recent_operations) > 0
    recent_types = [op.get("type", "") for op in request.recent_operations]

    # ── Build context-aware advice list ─────────────────────────────────────
    advice_parts = []

    if considered_recent:
        ops_summary = ", ".join([op.get("type", "UNKNOWN") for op in request.recent_operations])
        advice_parts.append(f"Contexte: Actions récentes analysées ({ops_summary}).")

    # Young tree warning (< 3 years)
    if 0 < age_years < 3:
        advice_parts.append(
            "⚠️ Jeune olivier (< 3 ans) : irrigation régulière essentielle "
            "pour l'établissement racinaire. Éviter les stress hydriques."
        )
    # Very old trees (> 50 years)
    elif age_years > 50:
        advice_parts.append(
            "🌳 Olivier centenaire : taille de rajeunissement recommandée "
            "tous les 5 ans pour maintenir la productivité."
        )

    # Soil-specific recommendations
    if soil_texture == "Sablonneux":
        advice_parts.append(
            "🧪 Sol sablonneux : augmenter la fréquence d'irrigation avec "
            "de petits volumes pour éviter le lessivage des nutriments."
        )
    elif soil_texture == "Argileux":
        advice_parts.append(
            "🧪 Sol argileux : surveiller l'engorgement en eau après les pluies. "
            "Drains conseillés si pente < 2%."
        )

    # Irrigation system advice
    if irrigation_system == "Gravitaire":
        advice_parts.append(
            "💧 Irrigation gravitaire : risque de sur-irrigation. "
            "Contrôler le calendrier selon l'humidité du sol."
        )

    # High-susceptibility variety warning (dynamic from risks)
    has_high_susceptibility = any(r["susceptibility_score"] >= 70 for r in risks)
    if has_high_susceptibility:
        advice_parts.append(
            f"🫒 La variété {request.crop} présente une sensibilité "
            f"élevée aux maladies fongiques. Surveillance renforcée conseillée."
        )

    # North-facing exposition + humidity warning
    if exposition == "Nord" and request.humidity > 70:
        advice_parts.append(
            "🧭 Exposition Nord + forte humidité : risque accru de maladies "
            "fongiques. Application préventive de fongicide recommandée."
        )

    # Growth Stage Specific Advice
    if request.current_stage == "DORMANCE":
        advice_parts.append(
            "🌿 Période de repos végétatif (Dormance). Idéal pour la taille d'hiver (Pruning) "
            "et les fumures de fond organo-minérales."
        )
    elif request.current_stage == "DEBOURREMENT":
        advice_parts.append(
            "🌱 Stade de débourrement (gonflement des bourgeons). Fort risque d'oeil de paon (Peacock Spot) "
            "si les pluies printanières s'installent. Traitement fongicide recommandé."
        )
    elif request.current_stage == "FLORAISON":
        advice_parts.append(
            "🌸 Floraison en cours. Stade extrêmement sensible. Éviter absolument les traitements kystiques, "
            "le lessivage du pollen et les irrigations excessives (risque de coulure des fleurs)."
        )
    elif request.current_stage == "NOUAISON":
        advice_parts.append(
            "👶 Nouaison (chute des pétales et nouage des fruits). Maintenir un approvisionnement en eau régulier "
            "pour soutenir la croissance cellulaire initiale."
        )
    elif request.current_stage == "CROISSANCE":
        advice_parts.append(
            "📈 Grossissement de l'olive. Période de forte demande en potasse et en azote. "
            "Installer des pièges de surveillance pour la mouche de l'olive (Bactrocera oleae)."
        )
    elif request.current_stage == "VERAISON":
        advice_parts.append(
            "🎨 Véraison (changement de couleur). Limiter l'eau pour stimuler la synthèse d'huile dans la pulpe "
            "et stopper les apports azotés."
        )
    elif request.current_stage == "RECOLTE":
        advice_parts.append(
            "🫒 Stade de récolte (Maturité). Récolter sans tarder pour les olives de table (Meslala). "
            "Pour les huiles fines, cibler l'indice optimal de coloration."
        )

    if request.gdd_to_next_stage is not None and request.gdd_to_next_stage < 50:
        advice_parts.append(
            f"⏱️ Prochaine étape phénologique estimée dans {round(request.gdd_to_next_stage)} GDD."
        )

    # ── Proactive Disease Alerting: 48h High Humidity Period Detector ──
    consecutive_high_humidity_days = 0
    max_consecutive = 0
    for day in request.history:
        day_hum = day.humidity if day.humidity is not None else 0
        day_tavg = (day.tmax + day.tmin) / 2
        if day_hum > 80 and 12 <= day_tavg <= 26:
            consecutive_high_humidity_days += 1
            if consecutive_high_humidity_days > max_consecutive:
                max_consecutive = consecutive_high_humidity_days
        else:
            consecutive_high_humidity_days = 0

    proactive_alerts = []
    proactive_score_bonus = 0
    if max_consecutive >= 2:
        # High humidity period detected. Match with vulnerable diseases for the variety.
        vulnerable_diseases = [r for r in risks if r["disease"] in ["Peacock Spot", "Anthracnose"] and r["susceptibility_score"] >= 65]
        for v_dis in vulnerable_diseases:
            proactive_alerts.append(
                f"🚨 ALERTE RISQUE ÉLEVÉ : Climat favorable à {v_dis['disease']} détecté sur 48h (Humidité > 80%)."
            )
            advice_parts.insert(0, 
                f"🚨 [ALERTE DANGER] Risque d'infection par {v_dis['disease']} ! "
                f"Les conditions des dernières 48h favorisent ce pathogène. Traitement préventif recommandé."
            )
            proactive_score_bonus += 25

    # ── Risk Scoring Engine ──────────────────────────────────────────────────
    score = 0
    risk_factors = []
    active_diseases = []

    for risk in risks:
        tmin = risk["temp_min"]
        tmax = risk["temp_max"]
        hmin = risk["humidity_min"]
        suppressed = risk["suppressed_above_temp"]
        req_wound = risk["requires_wound"]
        fruit_only = risk["fruit_stage_only"]
        clay_only = risk["requires_clay_soil"]
        s_score = risk["susceptibility_score"]

        is_active = True

        # Weather thresholds checks
        if tmin is not None and tmin != -1 and request.temperature < tmin:
            is_active = False
        if tmax is not None and tmax != -1 and request.temperature > tmax:
            is_active = False
        if suppressed is not None and suppressed != -1 and request.temperature > suppressed:
            is_active = False
        if hmin is not None and hmin != -1 and request.humidity < hmin:
            is_active = False

        # Physical and operational preconditions
        if fruit_only and request.current_stage not in ["CROISSANCE", "VERAISON", "RECOLTE"]:
            is_active = False
        if clay_only and soil_texture not in ["Argileux", "Argilo-limoneux", "Argilo-sableux"]:
            is_active = False
        if req_wound and not any(t in ["PRUNING", "HARVEST"] for t in recent_types):
            is_active = False

        if is_active:
            active_diseases.append(risk["disease"])
            sev_score = DISEASE_SEVERITY_SCORE.get(risk["severity"], 13)
            # Adjust severity by the variety susceptibility score (0-100)
            adjusted_score = sev_score * (s_score / 100.0)
            score += adjusted_score
            risk_factors.append(
                f"Maladie: {risk['disease']} active "
                f"({risk['severity']} severity, Variety Susceptibility: {s_score}%)"
            )

    # Temperature scoring (olive-specific thresholds)
    if request.temperature < 0:
        score += 30
        risk_factors.append(f"🧊 Gel critique : {request.temperature}°C — risque de mortalité")
    elif request.temperature < 5:
        score += 20
        risk_factors.append(f"❄️ Risque de gel : {request.temperature}°C < 5°C")
    elif request.temperature > 40:
        score += 20
        risk_factors.append(f"🔥 Stress thermique extrême : {request.temperature}°C > 40°C")
    elif request.temperature > 35:
        score += 12
        risk_factors.append(f"🌡️ Stress thermique : {request.temperature}°C > 35°C")

    # Humidity scoring
    if request.humidity > 85:
        score += 18
        risk_factors.append(f"💧 Humidité très élevée : {request.humidity}% — conditions propices aux champignons")
    elif request.humidity > 70:
        score += 10
        risk_factors.append(f"💧 Humidité élevée : {request.humidity}% > 70%")

    # Soil penalty
    if soil_texture == "Sablonneux":
        score += 5
        risk_factors.append("🧪 Sol sablonneux : rétention d'eau insuffisante (+5)")

    # Variety susceptibility bonus
    if has_high_susceptibility:
        score += 8
        risk_factors.append(f"🫒 Variété à risque élevé : {request.crop} (+8)")

    # Mitigation: recent protective treatments reduce score
    if any(t in ["PESTICIDE", "FUNGICIDE"] for t in recent_types):
        score = max(0, score - 15)
        risk_factors.append("🛡️ Atténuation : traitement fongicide/pesticide récent (-15)")
    if any(t == "PRUNING" for t in recent_types):
        score = max(0, score - 5)
        risk_factors.append("✂️ Atténuation : taille récente favorise l'aération (-5)")

    score += proactive_score_bonus
    risk_factors.extend(proactive_alerts)
    score = min(100, score)

    # ── Determine Risk Level ─────────────────────────────────────────────────
    if score >= 70:
        risk_level = "CRITICAL"
    elif score >= 50:
        risk_level = "HIGH"
    elif score >= 25:
        risk_level = "MODERATE"
    else:
        risk_level = "LOW"

    # ── Final Advice Assembly ────────────────────────────────────────────────
    if active_diseases:
        advice_parts.append(
            f"🦠 Risque élevé de : {', '.join(active_diseases)} "
            f"dans les conditions actuelles ({request.condition})."
        )
        if any(t in ["PESTICIDE", "FUNGICIDE", "FERTILIZER"] for t in recent_types):
            advice_parts.append(
                "Les applications chimiques récentes peuvent atténuer ce risque. "
                "Maintenir une surveillance étroite."
            )
        else:
            advice_parts.append(
                "Action préventive immédiate recommandée : "
                "application de fongicide cuivrique ou traitement adapté."
            )
    else:
        advice_parts.append(
            f"✅ L'olivier est en bonne santé dans les conditions actuelles ({request.condition})."
        )

    # ── Disease Forecasting Models ───────────────────────────────────────────
    disease_forecast = {}
    
    # 1. Peacock Spot (عين الطاووس)
    peacock_config = next((r for r in risks if r["disease"] == "Peacock Spot"), None)
    p_tmin = peacock_config["temp_min"] if peacock_config and peacock_config["temp_min"] is not None else 10.0
    p_tmax = peacock_config["temp_max"] if peacock_config and peacock_config["temp_max"] is not None else 22.0
    p_hmin = peacock_config["humidity_min"] if peacock_config and peacock_config["humidity_min"] is not None else 75.0
    p_rmin = peacock_config["rain_min_mm"] if peacock_config and peacock_config["rain_min_mm"] is not None else 1.0
    p_score = peacock_config["susceptibility_score"] if peacock_config else 75.0

    wet_leaf_days = 0
    for day in request.history:
        day_temp = (day.tmax + day.tmin) / 2
        day_humidity = day.humidity if day.humidity is not None else 0
        day_precip = day.precipitation if day.precipitation is not None else 0
        
        if (p_tmin <= day_temp <= p_tmax and day_humidity > p_hmin) or day_precip > p_rmin:
            wet_leaf_days += 1
            
    peacock_score = 0
    if wet_leaf_days >= 4:
        peacock_score = 80
    elif wet_leaf_days >= 2:
        peacock_score = 60
    elif wet_leaf_days >= 1:
        peacock_score = 35
    else:
        peacock_score = 10
        
    # Variety susceptibility adjustment
    peacock_score = peacock_score * (p_score / 75.0)
        
    # Fungicide mitigation
    if "FUNGICIDE" in recent_types:
        peacock_score = max(0, peacock_score - 50)
        
    peacock_score = min(100, peacock_score)
    peacock_level = "CRITICAL" if peacock_score >= 75 else "HIGH" if peacock_score >= 50 else "MODERATE" if peacock_score >= 25 else "LOW"
    
    peacock_advice = (
        "Traitement fongicide cuivrique immédiat recommandé car les conditions humides récentes "
        "favorisent fortement le développement du champignon." if peacock_level in ["CRITICAL", "HIGH"]
        else "Risque modéré. Maintenir une surveillance visuelle sur le feuillage bas." if peacock_level == "MODERATE"
        else "Risque faible. Les conditions sèches actuelles limitent le développement des spores."
    )
    disease_forecast["Peacock Spot"] = {"score": round(peacock_score), "level": peacock_level, "advice": peacock_advice}
    
    # 2. Olive Knot (سل الزيتون)
    knot_config = next((r for r in risks if r["disease"] == "Olive Knot"), None)
    k_rmin = knot_config["rain_min_mm"] if knot_config and knot_config["rain_min_mm"] is not None else 5.0
    k_score = knot_config["susceptibility_score"] if knot_config else 60.0

    has_wound = "PRUNING" in recent_types or "HARVEST" in recent_types
    total_precip_7d = sum([day.precipitation if day.precipitation is not None else 0 for day in request.history])
    
    knot_score = 0
    if has_wound:
        if total_precip_7d > k_rmin:
            knot_score = 90
        elif total_precip_7d > 1.0:
            knot_score = 70
        else:
            knot_score = 40
    else:
        if total_precip_7d > 15.0:
            knot_score = 30
        else:
            knot_score = 10
            
    # Variety susceptibility adjustment
    knot_score = knot_score * (k_score / 60.0)
    knot_score = min(100, knot_score)
    knot_level = "CRITICAL" if knot_score >= 75 else "HIGH" if knot_score >= 50 else "MODERATE" if knot_score >= 25 else "LOW"
    knot_advice = (
        "Alerte : blessures fraîches d'élagage/récolte sous la pluie ! Application immédiate de bouillie "
        "bordelaise pour désinfecter les plaies." if knot_level in ["CRITICAL", "HIGH"]
        else "Risque modéré suite à des blessures récentes. Éviter d'élaguer par temps humide." if knot_level == "MODERATE"
        else "Risque très faible. Aucune plaie d'élagage sous la pluie signalée."
    )
    disease_forecast["Olive Knot"] = {"score": round(knot_score), "level": knot_level, "advice": knot_advice}
    
    # 3. Verticillium Wilt (ذبول الفيرتيسيليوم)
    vert_config = next((r for r in risks if r["disease"] == "Verticillium Wilt"), None)
    v_tmin = vert_config["temp_min"] if vert_config and vert_config["temp_min"] is not None else 15.0
    v_tmax = vert_config["temp_max"] if vert_config and vert_config["temp_max"] is not None else 25.0
    v_score = vert_config["susceptibility_score"] if vert_config else 40.0

    is_clayey = soil_texture in ["Argileux", "Argilo-limoneux", "Argilo-sableux"]
    avg_temp_7d = sum([(day.tmax + day.tmin) / 2 for day in request.history]) / max(1, len(request.history))
    
    vert_score = 0
    if is_clayey:
        if v_tmin <= avg_temp_7d <= v_tmax:
            if total_precip_7d > 20.0:
                vert_score = 80
            elif total_precip_7d > 5.0:
                vert_score = 55
            else:
                vert_score = 30
        else:
            vert_score = 20
    else:
        vert_score = 10
        
    # Variety susceptibility adjustment
    vert_score = vert_score * (v_score / 40.0)
    vert_score = min(100, vert_score)
    vert_level = "CRITICAL" if vert_score >= 75 else "HIGH" if vert_score >= 50 else "MODERATE" if vert_score >= 25 else "LOW"
    vert_advice = (
        "Risque critique de verticilliose. Excès d'eau dans un sol argileux à température optimale. "
        "Réduire drastiquement l'irrigation et vérifier le drainage." if vert_level in ["CRITICAL", "HIGH"]
        else "Risque modéré. Éviter la stagnation d'eau au pied des arbres." if vert_level == "MODERATE"
        else "Risque faible. Humidité du sol et drainage corrects."
    )
    disease_forecast["Verticillium Wilt"] = {"score": round(vert_score), "level": vert_level, "advice": vert_advice}
    
    # 4. Olive Fruit Fly (ذبابة الزيتون)
    fly_config = next((r for r in risks if r["disease"] == "Olive Fruit Fly"), None)
    f_tmin = fly_config["temp_min"] if fly_config and fly_config["temp_min"] is not None else 20.0
    f_tmax = fly_config["temp_max"] if fly_config and fly_config["temp_max"] is not None else 32.0
    f_suppressed = fly_config["suppressed_above_temp"] if fly_config and fly_config["suppressed_above_temp"] is not None else 35.0
    f_score = fly_config["susceptibility_score"] if fly_config else 70.0

    has_fruit = request.current_stage in ["CROISSANCE", "VERAISON", "RECOLTE"]
    
    fly_score = 0
    if has_fruit:
        optimal_days = 0
        hot_days = 0
        for day in request.history:
            if f_tmin <= day.tmax <= f_tmax:
                optimal_days += 1
            if f_suppressed is not None and f_suppressed != -1 and day.tmax > f_suppressed:
                hot_days += 1
                
        fly_score = optimal_days * 15
        
        # Heat suppression
        if hot_days >= 2:
            fly_score = max(0, fly_score - 45)
            
        # Pesticide mitigation
        if "PESTICIDE" in recent_types:
            fly_score = max(0, fly_score - 55)
    else:
        fly_score = 5
        
    # Variety susceptibility adjustment
    fly_score = fly_score * (f_score / 70.0)
    fly_score = min(100, fly_score)
    fly_level = "CRITICAL" if fly_score >= 75 else "HIGH" if fly_score >= 50 else "MODERATE" if fly_score >= 25 else "LOW"
    fly_advice = (
        "Conditions optimales pour les pontes de la mouche de l'olive. Installer immédiatement des pièges "
        "d'attraction et envisager un traitement si le seuil de nuisibilité est dépassé." if fly_level in ["CRITICAL", "HIGH"]
        else "Risque modéré. Activité ralentie par les températures ou les traitements." if fly_level == "MODERATE"
        else "Risque faible. Pas de fruits disponibles ou forte chaleur défavorable au ravageur."
    )
    disease_forecast["Olive Fruit Fly"] = {"score": round(fly_score), "level": fly_level, "advice": fly_advice}

    return {
        "crop": request.crop,
        "condition": request.condition,
        "temperature": request.temperature,
        "humidity": request.humidity,
        "age_years": round(age_years, 1),
        "risks_found": active_diseases,
        "score": round(score),
        "risk_level": risk_level,
        "risk_factors": risk_factors,
        "advice": " ".join(advice_parts),
        "consideredRecentActions": considered_recent,
        "disease_forecast": disease_forecast,
    }
