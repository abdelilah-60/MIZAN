// ============================================================
// MIZAN — Olive Knowledge Graph
// 06: Variety ←SUSCEPTIBLE_TO→ Disease (حساسية الأصناف)
// ============================================================
// score: 0-100 (0 = immune, 100 = extremely susceptible)
// These scores replace the hardcoded logic in insights.py
// and can be edited live in Memgraph Lab.
// ============================================================

// ── Picholine Marocaine ─────────────────────────────────────
MATCH (v:Variety {name:"Picholine Marocaine"}), (d:Disease {name:"Peacock Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 75, notes: "Très sensible. Principale maladie foliaire observée au Maroc."}]->(d);

MATCH (v:Variety {name:"Picholine Marocaine"}), (d:Disease {name:"Olive Knot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 60, notes: "Sensible après taille en période humide."}]->(d);

MATCH (v:Variety {name:"Picholine Marocaine"}), (d:Disease {name:"Verticillium Wilt"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 40, notes: "Tolérance moyenne. Risque accru en sol argileux irrigué."}]->(d);

MATCH (v:Variety {name:"Picholine Marocaine"}), (d:Disease {name:"Olive Fruit Fly"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 70, notes: "Calibre moyen attractif pour la mouche."}]->(d);

MATCH (v:Variety {name:"Picholine Marocaine"}), (d:Disease {name:"Anthracnose"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 20, notes: "Faible sensibilité. Récolte tardive réduit l'exposition."}]->(d);

MATCH (v:Variety {name:"Picholine Marocaine"}), (d:Disease {name:"Olive Leaf Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 30, notes: "Sensibilité modérée. Souvent masquée par l'oeil de paon."}]->(d);

// ── Haouzia ─────────────────────────────────────────────────
MATCH (v:Variety {name:"Haouzia"}), (d:Disease {name:"Peacock Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 50, notes: "Sensibilité moyenne. Meilleure résistance que Picholine."}]->(d);

MATCH (v:Variety {name:"Haouzia"}), (d:Disease {name:"Olive Knot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 25, notes: "Bonne tolérance naturelle."}]->(d);

MATCH (v:Variety {name:"Haouzia"}), (d:Disease {name:"Verticillium Wilt"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 30, notes: "Tolérance correcte."}]->(d);

MATCH (v:Variety {name:"Haouzia"}), (d:Disease {name:"Olive Fruit Fly"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 65, notes: "Calibre moyen-gros, attractif."}]->(d);

MATCH (v:Variety {name:"Haouzia"}), (d:Disease {name:"Anthracnose"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 70, notes: "Sensibilité élevée. Problème dans les zones humides du Rif."}]->(d);

MATCH (v:Variety {name:"Haouzia"}), (d:Disease {name:"Olive Leaf Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 45, notes: "Sensibilité modérée."}]->(d);

// ── Menara ──────────────────────────────────────────────────
MATCH (v:Variety {name:"Menara"}), (d:Disease {name:"Peacock Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 55, notes: "Sensibilité moyenne."}]->(d);

MATCH (v:Variety {name:"Menara"}), (d:Disease {name:"Olive Knot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 55, notes: "Sensibilité notable après taille sévère."}]->(d);

MATCH (v:Variety {name:"Menara"}), (d:Disease {name:"Verticillium Wilt"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 35, notes: "Tolérance correcte."}]->(d);

MATCH (v:Variety {name:"Menara"}), (d:Disease {name:"Olive Fruit Fly"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 70, notes: "Attractivité normale."}]->(d);

MATCH (v:Variety {name:"Menara"}), (d:Disease {name:"Anthracnose"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 65, notes: "Sensibilité élevée, similaire à Haouzia."}]->(d);

MATCH (v:Variety {name:"Menara"}), (d:Disease {name:"Olive Leaf Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 40, notes: "Sensibilité modérée."}]->(d);

// ── Dahbia ──────────────────────────────────────────────────
MATCH (v:Variety {name:"Dahbia"}), (d:Disease {name:"Peacock Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 80, notes: "Très sensible. Feuillage dense retient l'humidité."}]->(d);

MATCH (v:Variety {name:"Dahbia"}), (d:Disease {name:"Olive Knot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 20, notes: "Faible sensibilité."}]->(d);

MATCH (v:Variety {name:"Dahbia"}), (d:Disease {name:"Verticillium Wilt"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 25, notes: "Bonne tolérance."}]->(d);

MATCH (v:Variety {name:"Dahbia"}), (d:Disease {name:"Olive Fruit Fly"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 75, notes: "Gros calibre très attractif pour la ponte."}]->(d);

MATCH (v:Variety {name:"Dahbia"}), (d:Disease {name:"Anthracnose"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 15, notes: "Récolte précoce limite l'exposition."}]->(d);

MATCH (v:Variety {name:"Dahbia"}), (d:Disease {name:"Olive Leaf Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 35, notes: "Sensibilité modérée."}]->(d);

// ── Meslala ─────────────────────────────────────────────────
MATCH (v:Variety {name:"Meslala"}), (d:Disease {name:"Peacock Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 30, notes: "Bonne résistance naturelle."}]->(d);

MATCH (v:Variety {name:"Meslala"}), (d:Disease {name:"Olive Knot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 70, notes: "Sensible. Bois tendre, plaies de taille cicatrisent lentement."}]->(d);

MATCH (v:Variety {name:"Meslala"}), (d:Disease {name:"Verticillium Wilt"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 20, notes: "Bonne tolérance."}]->(d);

MATCH (v:Variety {name:"Meslala"}), (d:Disease {name:"Olive Fruit Fly"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 60, notes: "Récolte très précoce limite l'exposition."}]->(d);

MATCH (v:Variety {name:"Meslala"}), (d:Disease {name:"Anthracnose"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 10, notes: "Très faible. Récolte avant les pluies d'automne."}]->(d);

MATCH (v:Variety {name:"Meslala"}), (d:Disease {name:"Olive Leaf Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 20, notes: "Faible sensibilité."}]->(d);

// ── Arbequina ───────────────────────────────────────────────
MATCH (v:Variety {name:"Arbequina"}), (d:Disease {name:"Peacock Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 65, notes: "Sensibilité élevée. Plantation dense retient l'humidité."}]->(d);

MATCH (v:Variety {name:"Arbequina"}), (d:Disease {name:"Olive Knot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 30, notes: "Sensibilité modérée."}]->(d);

MATCH (v:Variety {name:"Arbequina"}), (d:Disease {name:"Verticillium Wilt"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 85, notes: "TRÈS SENSIBLE. Problème majeur dans les vergers intensifs au Maroc."}]->(d);

MATCH (v:Variety {name:"Arbequina"}), (d:Disease {name:"Olive Fruit Fly"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 70, notes: "Petit calibre mais production massive compense."}]->(d);

MATCH (v:Variety {name:"Arbequina"}), (d:Disease {name:"Anthracnose"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 25, notes: "Sensibilité modérée."}]->(d);

MATCH (v:Variety {name:"Arbequina"}), (d:Disease {name:"Olive Leaf Spot"})
CREATE (v)-[:SUSCEPTIBLE_TO {score: 50, notes: "Sensibilité modérée à élevée."}]->(d);
