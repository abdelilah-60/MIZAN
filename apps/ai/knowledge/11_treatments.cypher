// ============================================================
// MIZAN — Olive Knowledge Graph
// 11: Treatments (العلاجات والمبيدات)
// ============================================================
// Each Treatment node represents a real product available
// in the Moroccan market. TREATABLE_BY relationships connect
// diseases to their recommended treatments.
// ============================================================

// ── Fungicides (مبيدات الفطريات) ─────────────────────────────

CREATE (:Treatment {
  name: "Bouillie Bordelaise",
  name_ar: "خليط بوردو",
  type: "fungicide",
  active_ingredient: "Sulfate de cuivre + chaux",
  formulation: "WP (poudre mouillable)",
  dose_per_ha: "5-10 kg",
  dose_per_100l: "500-1000 g",
  preharvest_interval_days: 21,
  mode_of_action: "contact",
  organic_approved: true,
  timing: "preventive",
  application_season: "automne, hiver, début printemps",
  notes: "Traitement cuivrique classique universel. Appliquer avant les pluies. Ne pas dépasser 6 kg Cu/ha/an."
});

CREATE (:Treatment {
  name: "Oxychlorure de Cuivre",
  name_ar: "أوكسيكلوريد النحاس",
  type: "fungicide",
  active_ingredient: "Oxychlorure de cuivre 50%",
  formulation: "WP",
  dose_per_ha: "3-5 kg",
  dose_per_100l: "300-500 g",
  preharvest_interval_days: 21,
  mode_of_action: "contact",
  organic_approved: true,
  timing: "preventive",
  application_season: "automne, printemps",
  notes: "Alternative à la bouillie bordelaise. Meilleure adhérence sur le feuillage."
});

CREATE (:Treatment {
  name: "Mancozèbe",
  name_ar: "مانكوزيب",
  type: "fungicide",
  active_ingredient: "Mancozèbe 80%",
  formulation: "WP",
  dose_per_ha: "2-3 kg",
  dose_per_100l: "200-250 g",
  preharvest_interval_days: 28,
  mode_of_action: "contact",
  organic_approved: false,
  timing: "preventive",
  application_season: "printemps",
  notes: "Efficace contre l'oeil de paon et l'anthracnose. Alterner avec les cuivriques pour éviter la résistance."
});

CREATE (:Treatment {
  name: "Trifloxystrobine",
  name_ar: "تريفلوكسيستروبين",
  type: "fungicide",
  active_ingredient: "Trifloxystrobine 50%",
  formulation: "WG",
  dose_per_ha: "0.15-0.25 L",
  dose_per_100l: "15-20 mL",
  preharvest_interval_days: 14,
  mode_of_action: "systemic",
  organic_approved: false,
  timing: "curative",
  application_season: "printemps, automne",
  notes: "Strobilurine systémique. Efficacité curative contre l'oeil de paon. Maximum 2 applications/saison."
});

CREATE (:Treatment {
  name: "Fosétyl-Aluminium",
  name_ar: "فوسيتيل ألمنيوم",
  type: "fungicide",
  active_ingredient: "Fosétyl-Al 80%",
  formulation: "WP",
  dose_per_ha: "2.5 kg",
  dose_per_100l: "250 g",
  preharvest_interval_days: 28,
  mode_of_action: "systemic",
  organic_approved: false,
  timing: "preventive_curative",
  application_season: "printemps",
  notes: "Partiellement efficace contre la Verticilliose par stimulation des défenses naturelles."
});

// ── Insecticides (مبيدات الحشرات) ────────────────────────────

CREATE (:Treatment {
  name: "Diméthoate",
  name_ar: "ديمثوات",
  type: "insecticide",
  active_ingredient: "Diméthoate 40%",
  formulation: "EC (concentré émulsionnable)",
  dose_per_ha: "0.75-1 L",
  dose_per_100l: "75-100 mL",
  preharvest_interval_days: 28,
  mode_of_action: "systemic",
  organic_approved: false,
  timing: "curative",
  application_season: "été, début automne",
  notes: "Insecticide systémique classique contre la mouche. Usage restreint dans certaines zones. Respecter le DAR."
});

CREATE (:Treatment {
  name: "Spinosad (Success / GF-120)",
  name_ar: "سبينوساد",
  type: "insecticide",
  active_ingredient: "Spinosad 0.024%",
  formulation: "CB (appât concentré)",
  dose_per_ha: "1-1.5 L",
  dose_per_100l: "N/A (application localisée)",
  preharvest_interval_days: 7,
  mode_of_action: "ingestion",
  organic_approved: true,
  timing: "curative",
  application_season: "été, automne",
  notes: "Insecticide biologique par appât. Application en bandes sur la frondaison (pas en plein). Efficace et écologique."
});

CREATE (:Treatment {
  name: "Kaolin (Surround WP)",
  name_ar: "كاولين",
  type: "insecticide",
  active_ingredient: "Kaolin calciné 95%",
  formulation: "WP",
  dose_per_ha: "25-50 kg",
  dose_per_100l: "5 kg",
  preharvest_interval_days: 0,
  mode_of_action: "physical_barrier",
  organic_approved: true,
  timing: "preventive",
  application_season: "été (avant activité de la mouche)",
  notes: "Barrière physique argileuse. Couvre le fruit d'un film blanc qui repousse la mouche. Renouveler après pluie."
});

// ── TREATABLE_BY Relationships ───────────────────────────────
// Disease → Treatment with efficacy and timing

// Peacock Spot treatments
MATCH (d:Disease {name:"Peacock Spot"}), (t:Treatment {name:"Bouillie Bordelaise"})
CREATE (d)-[:TREATABLE_BY {efficacy: "high", timing: "preventive", priority: 1}]->(t);
MATCH (d:Disease {name:"Peacock Spot"}), (t:Treatment {name:"Oxychlorure de Cuivre"})
CREATE (d)-[:TREATABLE_BY {efficacy: "high", timing: "preventive", priority: 2}]->(t);
MATCH (d:Disease {name:"Peacock Spot"}), (t:Treatment {name:"Mancozèbe"})
CREATE (d)-[:TREATABLE_BY {efficacy: "high", timing: "preventive", priority: 3}]->(t);
MATCH (d:Disease {name:"Peacock Spot"}), (t:Treatment {name:"Trifloxystrobine"})
CREATE (d)-[:TREATABLE_BY {efficacy: "high", timing: "curative", priority: 1}]->(t);

// Olive Knot treatments
MATCH (d:Disease {name:"Olive Knot"}), (t:Treatment {name:"Bouillie Bordelaise"})
CREATE (d)-[:TREATABLE_BY {efficacy: "medium", timing: "preventive_post_wound", priority: 1}]->(t);
MATCH (d:Disease {name:"Olive Knot"}), (t:Treatment {name:"Oxychlorure de Cuivre"})
CREATE (d)-[:TREATABLE_BY {efficacy: "medium", timing: "preventive_post_wound", priority: 2}]->(t);

// Verticillium treatments
MATCH (d:Disease {name:"Verticillium Wilt"}), (t:Treatment {name:"Fosétyl-Aluminium"})
CREATE (d)-[:TREATABLE_BY {efficacy: "low", timing: "preventive", priority: 1, notes: "Efficacité partielle. La prévention culturale (drainage, rotation) reste essentielle."}]->(t);

// Anthracnose treatments
MATCH (d:Disease {name:"Anthracnose"}), (t:Treatment {name:"Bouillie Bordelaise"})
CREATE (d)-[:TREATABLE_BY {efficacy: "medium", timing: "preventive", priority: 1}]->(t);
MATCH (d:Disease {name:"Anthracnose"}), (t:Treatment {name:"Mancozèbe"})
CREATE (d)-[:TREATABLE_BY {efficacy: "high", timing: "preventive", priority: 2}]->(t);

// Olive Leaf Spot treatments
MATCH (d:Disease {name:"Olive Leaf Spot"}), (t:Treatment {name:"Bouillie Bordelaise"})
CREATE (d)-[:TREATABLE_BY {efficacy: "medium", timing: "preventive", priority: 1}]->(t);
MATCH (d:Disease {name:"Olive Leaf Spot"}), (t:Treatment {name:"Mancozèbe"})
CREATE (d)-[:TREATABLE_BY {efficacy: "high", timing: "preventive", priority: 2}]->(t);

// Olive Fruit Fly treatments
MATCH (d:Disease {name:"Olive Fruit Fly"}), (t:Treatment {name:"Spinosad (Success / GF-120)"})
CREATE (d)-[:TREATABLE_BY {efficacy: "high", timing: "curative_bait", priority: 1}]->(t);
MATCH (d:Disease {name:"Olive Fruit Fly"}), (t:Treatment {name:"Kaolin (Surround WP)"})
CREATE (d)-[:TREATABLE_BY {efficacy: "high", timing: "preventive_barrier", priority: 1}]->(t);
MATCH (d:Disease {name:"Olive Fruit Fly"}), (t:Treatment {name:"Diméthoate"})
CREATE (d)-[:TREATABLE_BY {efficacy: "high", timing: "curative_systemic", priority: 2, notes: "Usage restreint. Vérifier la réglementation locale ONSSA."}]->(t);
