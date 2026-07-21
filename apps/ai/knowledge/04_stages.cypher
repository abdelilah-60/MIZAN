// ============================================================
// MIZAN — Olive Knowledge Graph
// 04: Phenological Stages (المراحل الفينولوجية)
// ============================================================
// GDD thresholds (base 10°C) for Moroccan olive cultivation.
// Each stage stores its GDD boundaries.
// ============================================================

CREATE (:Stage {
  name: "DORMANCE",
  name_fr: "Repos Végétatif",
  name_ar: "السكون الشتوي",
  order: 1,
  gdd_start: 0,
  gdd_end: 200,
  description: "Repos hivernal. Accumulation de froid nécessaire pour lever la dormance des bourgeons."
});

CREATE (:Stage {
  name: "DEBOURREMENT",
  name_fr: "Débourrement",
  name_ar: "تفتح البراعم",
  order: 2,
  gdd_start: 200,
  gdd_end: 500,
  description: "Gonflement et éclatement des bourgeons. Début de la croissance végétative printanière."
});

CREATE (:Stage {
  name: "FLORAISON",
  name_fr: "Floraison",
  name_ar: "الإزهار",
  order: 3,
  gdd_start: 500,
  gdd_end: 800,
  description: "Ouverture des fleurs et pollinisation. Stade très sensible au stress hydrique et thermique."
});

CREATE (:Stage {
  name: "NOUAISON",
  name_fr: "Nouaison",
  name_ar: "العقد",
  order: 4,
  gdd_start: 800,
  gdd_end: 1200,
  description: "Chute des pétales et nouage des fruits. Taux de nouaison détermine le rendement potentiel."
});

CREATE (:Stage {
  name: "CROISSANCE",
  name_fr: "Grossissement du Fruit",
  name_ar: "نمو الثمار",
  order: 5,
  gdd_start: 1200,
  gdd_end: 2200,
  description: "Croissance cellulaire active du fruit. Période de plus forte demande en eau et en potasse."
});

CREATE (:Stage {
  name: "VERAISON",
  name_fr: "Véraison",
  name_ar: "التلوين",
  order: 6,
  gdd_start: 2200,
  gdd_end: 2900,
  description: "Changement de couleur du vert au violet. Début de l'accumulation d'huile dans la pulpe."
});

CREATE (:Stage {
  name: "RECOLTE",
  name_fr: "Maturité / Récolte",
  name_ar: "النضج والجني",
  order: 7,
  gdd_start: 2900,
  gdd_end: 3500,
  description: "Maturité physiologique. Récolte selon l'indice de maturité visé (table vs huile)."
});
