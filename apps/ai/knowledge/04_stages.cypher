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
  gdd_end: 150,
  description: "Repos hivernal. Accumulation de froid nécessaire pour lever la dormance des bourgeons."
});

CREATE (:Stage {
  name: "DEBOURREMENT",
  name_fr: "Débourrement",
  name_ar: "تفتح البراعم",
  order: 2,
  gdd_start: 150,
  gdd_end: 400,
  description: "Gonflement et éclatement des bourgeons. Début de la croissance végétative printanière."
});

CREATE (:Stage {
  name: "FLORAISON",
  name_fr: "Floraison",
  name_ar: "الإزهار",
  order: 3,
  gdd_start: 400,
  gdd_end: 700,
  description: "Ouverture des fleurs et pollinisation. Stade très sensible au stress hydrique et thermique."
});

CREATE (:Stage {
  name: "NOUAISON",
  name_fr: "Nouaison",
  name_ar: "العقد",
  order: 4,
  gdd_start: 700,
  gdd_end: 1100,
  description: "Chute des pétales et nouage des fruits. Taux de nouaison détermine le rendement potentiel."
});

CREATE (:Stage {
  name: "CROISSANCE",
  name_fr: "Grossissement du Fruit",
  name_ar: "نمو الثمار",
  order: 5,
  gdd_start: 1100,
  gdd_end: 2200,
  description: "Croissance cellulaire active du fruit. Période de plus forte demande en eau et en potasse."
});

CREATE (:Stage {
  name: "VERAISON",
  name_fr: "Véraison",
  name_ar: "التلوين",
  order: 6,
  gdd_start: 2200,
  gdd_end: 2800,
  description: "Changement de couleur du vert au violet. Début de l'accumulation d'huile dans la pulpe."
});

CREATE (:Stage {
  name: "RECOLTE",
  name_fr: "Maturité / Récolte",
  name_ar: "النضج والجني",
  order: 7,
  gdd_start: 2800,
  gdd_end: 3200,
  description: "Maturité physiologique. Récolte selon l'indice de maturité visé (table vs huile)."
});
