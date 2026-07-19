// ============================================================
// MIZAN — Olive Knowledge Graph
// 09: Disease ←RISK_PEAKS_AT→ Stage (خطر المرض حسب المرحلة)
// ============================================================
// multiplier: risk amplification factor at this stage (1.0 = baseline)
// ============================================================

// ── Peacock Spot: worst during wet spring (DEBOURREMENT/FLORAISON) ─
MATCH (d:Disease {name:"Peacock Spot"}), (s:Stage {name:"DORMANCE"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 0.8, notes: "Spores hivernantes, risque modéré."}]->(s);
MATCH (d:Disease {name:"Peacock Spot"}), (s:Stage {name:"DEBOURREMENT"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.5, notes: "Période critique. Feuilles jeunes très réceptives."}]->(s);
MATCH (d:Disease {name:"Peacock Spot"}), (s:Stage {name:"FLORAISON"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.3, notes: "Risque élevé si pluies printanières."}]->(s);
MATCH (d:Disease {name:"Peacock Spot"}), (s:Stage {name:"CROISSANCE"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 0.6, notes: "Chaleur estivale inhibe le champignon."}]->(s);
MATCH (d:Disease {name:"Peacock Spot"}), (s:Stage {name:"VERAISON"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.2, notes: "Retour automnal de l'humidité."}]->(s);

// ── Olive Knot: worst after pruning season ──────────────────
MATCH (d:Disease {name:"Olive Knot"}), (s:Stage {name:"DORMANCE"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.4, notes: "Taille d'hiver + pluies = infection."}]->(s);
MATCH (d:Disease {name:"Olive Knot"}), (s:Stage {name:"RECOLTE"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.5, notes: "Blessures de récolte + pluies automnales."}]->(s);

// ── Verticillium: worst in wet spring on clay ───────────────
MATCH (d:Disease {name:"Verticillium Wilt"}), (s:Stage {name:"DEBOURREMENT"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.5, notes: "Sol humide + T° printanière optimale pour le champignon."}]->(s);
MATCH (d:Disease {name:"Verticillium Wilt"}), (s:Stage {name:"FLORAISON"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.3, notes: "Risque persistant si irrigation excessive."}]->(s);

// ── Olive Fruit Fly: only during fruit stages ───────────────
MATCH (d:Disease {name:"Olive Fruit Fly"}), (s:Stage {name:"CROISSANCE"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.3, notes: "Début des pontes si T° optimale."}]->(s);
MATCH (d:Disease {name:"Olive Fruit Fly"}), (s:Stage {name:"VERAISON"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.5, notes: "Pic d'activité. Fruits mûrissants très attractifs."}]->(s);
MATCH (d:Disease {name:"Olive Fruit Fly"}), (s:Stage {name:"RECOLTE"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.4, notes: "Pression maximale avant la récolte."}]->(s);

// ── Anthracnose: worst at fruit maturity ────────────────────
MATCH (d:Disease {name:"Anthracnose"}), (s:Stage {name:"VERAISON"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.4, notes: "Fruits tournants très sensibles."}]->(s);
MATCH (d:Disease {name:"Anthracnose"}), (s:Stage {name:"RECOLTE"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.5, notes: "Fruits mûrs sous la pluie = pourriture."}]->(s);

// ── Olive Leaf Spot: similar to Peacock Spot ────────────────
MATCH (d:Disease {name:"Olive Leaf Spot"}), (s:Stage {name:"DEBOURREMENT"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.3, notes: "Feuilles jeunes réceptives."}]->(s);
MATCH (d:Disease {name:"Olive Leaf Spot"}), (s:Stage {name:"VERAISON"})
CREATE (d)-[:RISK_PEAKS_AT {multiplier: 1.2, notes: "Retour de l'humidité automnale."}]->(s);
