// ============================================================
// MIZAN — Olive Knowledge Graph
// 10: NPK Export Rules (قواعد التسميد)
// ============================================================
// Single node storing all NPK calculation parameters.
// The code reads these values instead of hardcoding them.
// ============================================================

CREATE (:NPKRule {
  crop: "Olive",
  // Base export per ton of harvested olives (kg of pure element)
  n_export_per_ton: 15,
  p2o5_export_per_ton: 5,
  k2o_export_per_ton: 20,
  // Alternate bearing adjustments (multipliers)
  on_year_n_multiplier: 1.0,
  on_year_p_multiplier: 1.0,
  on_year_k_multiplier: 1.2,
  off_year_n_multiplier: 0.8,
  off_year_p_multiplier: 1.0,
  off_year_k_multiplier: 0.6,
  // Soil contribution deductions
  soil_n_per_pct_om: 10,
  soil_p_per_ppm_olsen: 0.5,
  soil_k_per_ppm_exchangeable: 0.3,
  // Default yield target if not specified (t/ha)
  default_target_yield: 5.0,
  // Hargreaves constant for Morocco
  ra_constant: 12,
  notes: "Méthode du bilan prévisionnel adaptée à l'oléiculture marocaine. Sources: INRA Meknès, références FAO-56."
});

// ============================================================
// Irrigation config defaults
// ============================================================
CREATE (:IrrigationDefault {
  crop: "Olive",
  default_drippers_per_tree: 4,
  default_dripper_flow_rate: 4.0,
  default_efficiency: 0.85,
  default_tree_density: 200,
  notes: "Valeurs par défaut pour le goutte-à-goutte standard au Maroc."
});
