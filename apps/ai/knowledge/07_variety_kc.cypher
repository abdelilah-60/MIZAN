// ============================================================
// MIZAN — Olive Knowledge Graph
// 07: Variety ←HAS_KC_AT→ Stage (معاملات Kc مخصصة لكل صنف)
// ============================================================
// Kc = Crop Coefficient for ETc calculation (ETc = ET0 × Kc)
// Custom per variety based on:
//   - Water demand (table olives > oil olives)
//   - Vigor and canopy size
//   - Drought tolerance
// ============================================================

// ── Picholine Marocaine (Reference / Standard) ─────────────
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:Stage {name:"DORMANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.45}]->(s);
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:Stage {name:"DEBOURREMENT"})
CREATE (v)-[:HAS_KC_AT {kc: 0.55}]->(s);
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:Stage {name:"FLORAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.60}]->(s);
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:Stage {name:"NOUAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.65}]->(s);
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:Stage {name:"CROISSANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.70}]->(s);
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:Stage {name:"VERAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.55}]->(s);
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:Stage {name:"RECOLTE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.50}]->(s);

// ── Haouzia (Drought tolerant → lower Kc) ───────────────────
MATCH (v:Variety {name:"Haouzia"}), (s:Stage {name:"DORMANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.40}]->(s);
MATCH (v:Variety {name:"Haouzia"}), (s:Stage {name:"DEBOURREMENT"})
CREATE (v)-[:HAS_KC_AT {kc: 0.50}]->(s);
MATCH (v:Variety {name:"Haouzia"}), (s:Stage {name:"FLORAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.55}]->(s);
MATCH (v:Variety {name:"Haouzia"}), (s:Stage {name:"NOUAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.60}]->(s);
MATCH (v:Variety {name:"Haouzia"}), (s:Stage {name:"CROISSANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.65}]->(s);
MATCH (v:Variety {name:"Haouzia"}), (s:Stage {name:"VERAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.50}]->(s);
MATCH (v:Variety {name:"Haouzia"}), (s:Stage {name:"RECOLTE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.45}]->(s);

// ── Menara (Similar to Haouzia, slightly higher) ────────────
MATCH (v:Variety {name:"Menara"}), (s:Stage {name:"DORMANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.42}]->(s);
MATCH (v:Variety {name:"Menara"}), (s:Stage {name:"DEBOURREMENT"})
CREATE (v)-[:HAS_KC_AT {kc: 0.52}]->(s);
MATCH (v:Variety {name:"Menara"}), (s:Stage {name:"FLORAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.57}]->(s);
MATCH (v:Variety {name:"Menara"}), (s:Stage {name:"NOUAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.62}]->(s);
MATCH (v:Variety {name:"Menara"}), (s:Stage {name:"CROISSANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.67}]->(s);
MATCH (v:Variety {name:"Menara"}), (s:Stage {name:"VERAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.52}]->(s);
MATCH (v:Variety {name:"Menara"}), (s:Stage {name:"RECOLTE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.47}]->(s);

// ── Dahbia (Table olive → higher water needs at fruit stage) ─
MATCH (v:Variety {name:"Dahbia"}), (s:Stage {name:"DORMANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.45}]->(s);
MATCH (v:Variety {name:"Dahbia"}), (s:Stage {name:"DEBOURREMENT"})
CREATE (v)-[:HAS_KC_AT {kc: 0.55}]->(s);
MATCH (v:Variety {name:"Dahbia"}), (s:Stage {name:"FLORAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.62}]->(s);
MATCH (v:Variety {name:"Dahbia"}), (s:Stage {name:"NOUAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.70}]->(s);
MATCH (v:Variety {name:"Dahbia"}), (s:Stage {name:"CROISSANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.75}]->(s);
MATCH (v:Variety {name:"Dahbia"}), (s:Stage {name:"VERAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.58}]->(s);
MATCH (v:Variety {name:"Dahbia"}), (s:Stage {name:"RECOLTE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.52}]->(s);

// ── Meslala (Largest table olive → highest water needs) ──────
MATCH (v:Variety {name:"Meslala"}), (s:Stage {name:"DORMANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.48}]->(s);
MATCH (v:Variety {name:"Meslala"}), (s:Stage {name:"DEBOURREMENT"})
CREATE (v)-[:HAS_KC_AT {kc: 0.58}]->(s);
MATCH (v:Variety {name:"Meslala"}), (s:Stage {name:"FLORAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.65}]->(s);
MATCH (v:Variety {name:"Meslala"}), (s:Stage {name:"NOUAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.72}]->(s);
MATCH (v:Variety {name:"Meslala"}), (s:Stage {name:"CROISSANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.78}]->(s);
MATCH (v:Variety {name:"Meslala"}), (s:Stage {name:"VERAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.60}]->(s);
MATCH (v:Variety {name:"Meslala"}), (s:Stage {name:"RECOLTE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.55}]->(s);

// ── Arbequina (Small fruit, drought tolerant → lowest Kc) ───
MATCH (v:Variety {name:"Arbequina"}), (s:Stage {name:"DORMANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.40}]->(s);
MATCH (v:Variety {name:"Arbequina"}), (s:Stage {name:"DEBOURREMENT"})
CREATE (v)-[:HAS_KC_AT {kc: 0.48}]->(s);
MATCH (v:Variety {name:"Arbequina"}), (s:Stage {name:"FLORAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.55}]->(s);
MATCH (v:Variety {name:"Arbequina"}), (s:Stage {name:"NOUAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.58}]->(s);
MATCH (v:Variety {name:"Arbequina"}), (s:Stage {name:"CROISSANCE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.65}]->(s);
MATCH (v:Variety {name:"Arbequina"}), (s:Stage {name:"VERAISON"})
CREATE (v)-[:HAS_KC_AT {kc: 0.50}]->(s);
MATCH (v:Variety {name:"Arbequina"}), (s:Stage {name:"RECOLTE"})
CREATE (v)-[:HAS_KC_AT {kc: 0.45}]->(s);
