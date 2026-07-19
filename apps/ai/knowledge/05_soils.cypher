// ============================================================
// MIZAN — Olive Knowledge Graph
// 05: Soil Types (أنواع التربة)
// ============================================================

CREATE (:SoilType {
  name: "Sablonneux",
  name_ar: "رملية",
  drainage: "excessive",
  water_retention: "low",
  nutrient_retention: "low",
  aeration: "high",
  risk_leaching: true,
  risk_waterlogging: false,
  notes: "Drainage rapide. Risque de lessivage des engrais. Irrigations fréquentes à faible dose."
});

CREATE (:SoilType {
  name: "Argileux",
  name_ar: "طينية",
  drainage: "poor",
  water_retention: "high",
  nutrient_retention: "high",
  aeration: "low",
  risk_leaching: false,
  risk_waterlogging: true,
  notes: "Rétention élevée. Risque d'asphyxie racinaire et de Verticilliose. Drains recommandés."
});

CREATE (:SoilType {
  name: "Limoneux",
  name_ar: "طمية",
  drainage: "moderate",
  water_retention: "moderate",
  nutrient_retention: "moderate",
  aeration: "moderate",
  risk_leaching: false,
  risk_waterlogging: false,
  notes: "Sol équilibré, idéal pour l'olivier. Bonne structure et fertilité naturelle."
});

CREATE (:SoilType {
  name: "Argilo-limoneux",
  name_ar: "طينية طمية",
  drainage: "moderate",
  water_retention: "high",
  nutrient_retention: "high",
  aeration: "moderate",
  risk_leaching: false,
  risk_waterlogging: false,
  notes: "Bon compromis rétention/drainage. Très répandu dans les plaines marocaines oléicoles."
});

CREATE (:SoilType {
  name: "Argilo-sableux",
  name_ar: "طينية رملية",
  drainage: "moderate",
  water_retention: "moderate",
  nutrient_retention: "moderate",
  aeration: "moderate",
  risk_leaching: false,
  risk_waterlogging: false,
  notes: "Structure mixte. Bonne adaptabilité. Commun dans le Haouz et le Saïs."
});
