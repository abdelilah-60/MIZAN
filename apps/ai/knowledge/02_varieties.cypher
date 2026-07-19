// ============================================================
// MIZAN — Olive Knowledge Graph
// 02: Olive Varieties (الأصناف)
// ============================================================
// Source: INRA Marrakech & Meknès references
// Each variety carries agronomic metadata used downstream
// by the scoring engine and recommendation system.
// ============================================================

CREATE (:Variety {
  name: "Picholine Marocaine",
  name_ar: "البيشولين المغربية",
  origin: "Morocco",
  use: "dual",
  oil_content_pct: 22,
  avg_fruit_weight_g: 3.5,
  harvest_season: "November-December",
  drought_tolerance: "medium",
  cold_tolerance: "medium",
  vigor: "high",
  pollination: "partially_self_fertile",
  density_recommended: 200,
  notes: "Variété dominante au Maroc (96% du verger national). Double aptitude huile/table."
});

CREATE (:Variety {
  name: "Haouzia",
  name_ar: "الحوزية",
  origin: "Morocco",
  use: "dual",
  oil_content_pct: 20,
  avg_fruit_weight_g: 4.0,
  harvest_season: "November-December",
  drought_tolerance: "high",
  cold_tolerance: "medium",
  vigor: "medium",
  pollination: "partially_self_fertile",
  density_recommended: 250,
  notes: "Sélection INRA. Bonne adaptation aux zones arides. Mise à fruit rapide."
});

CREATE (:Variety {
  name: "Menara",
  name_ar: "المنارة",
  origin: "Morocco",
  use: "oil",
  oil_content_pct: 21,
  avg_fruit_weight_g: 3.0,
  harvest_season: "November-December",
  drought_tolerance: "high",
  cold_tolerance: "medium",
  vigor: "medium",
  pollination: "partially_self_fertile",
  density_recommended: 250,
  notes: "Sélection INRA orientée huile. Productivité régulière, bonne alternance."
});

CREATE (:Variety {
  name: "Dahbia",
  name_ar: "الذهبية",
  origin: "Morocco",
  use: "table",
  oil_content_pct: 16,
  avg_fruit_weight_g: 5.5,
  harvest_season: "October-November",
  drought_tolerance: "low",
  cold_tolerance: "medium",
  vigor: "high",
  pollination: "self_sterile",
  density_recommended: 200,
  notes: "Olive de table par excellence. Gros calibre. Exigeante en eau pendant la croissance du fruit."
});

CREATE (:Variety {
  name: "Meslala",
  name_ar: "المسلالة",
  origin: "Morocco",
  use: "table",
  oil_content_pct: 19,
  avg_fruit_weight_g: 6.0,
  harvest_season: "September-October",
  drought_tolerance: "low",
  cold_tolerance: "low",
  vigor: "high",
  pollination: "self_sterile",
  density_recommended: 180,
  notes: "Plus gros calibre marocain. Récolte précoce. Très exigeante en eau et irrigation."
});

CREATE (:Variety {
  name: "Arbequina",
  name_ar: "الأربكينا",
  origin: "Spain",
  use: "oil",
  oil_content_pct: 20,
  avg_fruit_weight_g: 1.8,
  harvest_season: "October-November",
  drought_tolerance: "high",
  cold_tolerance: "low",
  vigor: "low",
  pollination: "self_fertile",
  density_recommended: 400,
  notes: "Variété espagnole à haute densité. Petit fruit, huile fruitée. Sensible au Verticillium au Maroc."
});
