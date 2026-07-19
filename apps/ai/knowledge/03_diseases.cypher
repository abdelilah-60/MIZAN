// ============================================================
// MIZAN — Olive Knowledge Graph
// 03: Diseases & Pests (الأمراض والآفات)
// ============================================================
// Each disease node carries its weather trigger thresholds
// so the scoring engine reads them from the graph instead
// of hardcoding them in Python.
// ============================================================

CREATE (:Disease {
  name: "Peacock Spot",
  name_fr: "Oeil de Paon",
  name_ar: "عين الطاووس",
  pathogen: "Spilocaea oleagina",
  pathogen_type: "fungus",
  severity: "Medium",
  affected_organ: "leaves",
  // Weather trigger thresholds
  temp_min: 10,
  temp_max: 22,
  humidity_min: 75,
  rain_min_mm: 1.0,
  leaf_wetness_days_threshold: 2,
  suppressed_above_temp: 30,
  requires_wound: false,
  fruit_stage_only: false,
  description: "Maladie foliaire causant des taches circulaires sur les feuilles. Provoque la défoliation et réduit la photosynthèse."
});

CREATE (:Disease {
  name: "Olive Knot",
  name_fr: "Tuberculose de l'Olivier",
  name_ar: "سل الزيتون",
  pathogen: "Pseudomonas savastanoi",
  pathogen_type: "bacterium",
  severity: "High",
  affected_organ: "branches",
  temp_min: 5,
  temp_max: 25,
  humidity_min: 80,
  rain_min_mm: 5.0,
  leaf_wetness_days_threshold: -1,
  suppressed_above_temp: -1,
  requires_wound: true,
  fruit_stage_only: false,
  description: "Bactériose provoquant des tumeurs (galles) sur les rameaux. Pénètre exclusivement par les plaies de taille ou de récolte."
});

CREATE (:Disease {
  name: "Verticillium Wilt",
  name_fr: "Verticilliose",
  name_ar: "ذبول الفيرتيسيليوم",
  pathogen: "Verticillium dahliae",
  pathogen_type: "fungus",
  severity: "High",
  affected_organ: "vascular",
  temp_min: 15,
  temp_max: 25,
  humidity_min: -1,
  rain_min_mm: 5.0,
  leaf_wetness_days_threshold: -1,
  suppressed_above_temp: 30,
  requires_wound: false,
  fruit_stage_only: false,
  requires_clay_soil: true,
  description: "Champignon tellurique qui bloque les vaisseaux conducteurs. Mortel pour les jeunes arbres. Sol argileux humide = risque maximal."
});

CREATE (:Disease {
  name: "Olive Fruit Fly",
  name_fr: "Mouche de l'Olive",
  name_ar: "ذبابة الزيتون",
  pathogen: "Bactrocera oleae",
  pathogen_type: "insect",
  severity: "High",
  affected_organ: "fruit",
  temp_min: 20,
  temp_max: 32,
  humidity_min: -1,
  rain_min_mm: -1,
  leaf_wetness_days_threshold: -1,
  suppressed_above_temp: 35,
  requires_wound: false,
  fruit_stage_only: true,
  description: "Ravageur majeur mondial de l'olive. La femelle pond dans le fruit. Dégâts qualitatifs (acidité de l'huile) et quantitatifs."
});

CREATE (:Disease {
  name: "Anthracnose",
  name_fr: "Anthracnose de l'Olive",
  name_ar: "أنثراكنوز الزيتون",
  pathogen: "Colletotrichum acutatum",
  pathogen_type: "fungus",
  severity: "High",
  affected_organ: "fruit",
  temp_min: 15,
  temp_max: 25,
  humidity_min: 80,
  rain_min_mm: 3.0,
  leaf_wetness_days_threshold: -1,
  suppressed_above_temp: 28,
  requires_wound: false,
  fruit_stage_only: true,
  description: "Pourriture des fruits mûrs. Provoque la momification et chute massive. Grave impact sur la qualité de l'huile."
});

CREATE (:Disease {
  name: "Olive Leaf Spot",
  name_fr: "Cercosporiose",
  name_ar: "تبقع أوراق الزيتون",
  pathogen: "Mycocentrospora cladosporioides",
  pathogen_type: "fungus",
  severity: "Medium",
  affected_organ: "leaves",
  temp_min: 12,
  temp_max: 24,
  humidity_min: 75,
  rain_min_mm: 2.0,
  leaf_wetness_days_threshold: -1,
  suppressed_above_temp: 28,
  requires_wound: false,
  fruit_stage_only: false,
  description: "Taches foliaires grises sur la face inférieure. Défoliation modérée. Souvent confondue avec l'oeil de paon."
});
