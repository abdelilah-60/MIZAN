// ============================================================
// MIZAN — Olive Knowledge Graph
// 08: Variety ←SUITED_FOR→ SoilType (توافق التربة)
// ============================================================
// fitness: "IDEAL" | "GOOD" | "POOR"
// ============================================================

// ── Picholine Marocaine (Adaptable, prefers loamy) ──────────
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:SoilType {name:"Sablonneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Acceptable avec irrigation fréquente."}]->(s);
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:SoilType {name:"Argileux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Tolère si drainage assuré."}]->(s);
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:SoilType {name:"Limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "IDEAL", notes: "Sol idéal pour cette variété."}]->(s);
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:SoilType {name:"Argilo-limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "IDEAL", notes: "Excellent. Sols du Saïs et du Haouz."}]->(s);
MATCH (v:Variety {name:"Picholine Marocaine"}), (s:SoilType {name:"Argilo-sableux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Bon compromis."}]->(s);

// ── Haouzia (Drought adapted) ───────────────────────────────
MATCH (v:Variety {name:"Haouzia"}), (s:SoilType {name:"Sablonneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Bonne adaptation grâce à sa tolérance sécheresse."}]->(s);
MATCH (v:Variety {name:"Haouzia"}), (s:SoilType {name:"Argileux"})
CREATE (v)-[:SUITED_FOR {fitness: "POOR", notes: "Risque d'asphyxie. Drainage impératif."}]->(s);
MATCH (v:Variety {name:"Haouzia"}), (s:SoilType {name:"Limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "IDEAL", notes: "Sol optimal."}]->(s);
MATCH (v:Variety {name:"Haouzia"}), (s:SoilType {name:"Argilo-limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Acceptable."}]->(s);
MATCH (v:Variety {name:"Haouzia"}), (s:SoilType {name:"Argilo-sableux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Bon compromis."}]->(s);

// ── Menara ──────────────────────────────────────────────────
MATCH (v:Variety {name:"Menara"}), (s:SoilType {name:"Sablonneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Acceptable."}]->(s);
MATCH (v:Variety {name:"Menara"}), (s:SoilType {name:"Argileux"})
CREATE (v)-[:SUITED_FOR {fitness: "POOR", notes: "Éviter. Risque de Verticilliose élevé."}]->(s);
MATCH (v:Variety {name:"Menara"}), (s:SoilType {name:"Limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "IDEAL", notes: "Sol optimal."}]->(s);
MATCH (v:Variety {name:"Menara"}), (s:SoilType {name:"Argilo-limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Acceptable avec bon drainage."}]->(s);
MATCH (v:Variety {name:"Menara"}), (s:SoilType {name:"Argilo-sableux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Bon compromis."}]->(s);

// ── Dahbia (Table olive, needs good water) ──────────────────
MATCH (v:Variety {name:"Dahbia"}), (s:SoilType {name:"Sablonneux"})
CREATE (v)-[:SUITED_FOR {fitness: "IDEAL", notes: "Excellent drainage pour cette variété vigoureuse."}]->(s);
MATCH (v:Variety {name:"Dahbia"}), (s:SoilType {name:"Argileux"})
CREATE (v)-[:SUITED_FOR {fitness: "POOR", notes: "Trop humide. Risques sanitaires."}]->(s);
MATCH (v:Variety {name:"Dahbia"}), (s:SoilType {name:"Limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Bon si irrigation maîtrisée."}]->(s);
MATCH (v:Variety {name:"Dahbia"}), (s:SoilType {name:"Argilo-limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Acceptable."}]->(s);
MATCH (v:Variety {name:"Dahbia"}), (s:SoilType {name:"Argilo-sableux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Bon compromis."}]->(s);

// ── Meslala (Large fruit, needs drainage) ───────────────────
MATCH (v:Variety {name:"Meslala"}), (s:SoilType {name:"Sablonneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Acceptable avec irrigation soutenue."}]->(s);
MATCH (v:Variety {name:"Meslala"}), (s:SoilType {name:"Argileux"})
CREATE (v)-[:SUITED_FOR {fitness: "POOR", notes: "Éviter absolument. Asphyxie racinaire."}]->(s);
MATCH (v:Variety {name:"Meslala"}), (s:SoilType {name:"Limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "IDEAL", notes: "Sol optimal."}]->(s);
MATCH (v:Variety {name:"Meslala"}), (s:SoilType {name:"Argilo-limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Acceptable."}]->(s);
MATCH (v:Variety {name:"Meslala"}), (s:SoilType {name:"Argilo-sableux"})
CREATE (v)-[:SUITED_FOR {fitness: "IDEAL", notes: "Excellent. Commun dans les zones de production traditionnelle."}]->(s);

// ── Arbequina (Intensive, prefers light soils) ──────────────
MATCH (v:Variety {name:"Arbequina"}), (s:SoilType {name:"Sablonneux"})
CREATE (v)-[:SUITED_FOR {fitness: "IDEAL", notes: "Préfère les sols légers bien drainés."}]->(s);
MATCH (v:Variety {name:"Arbequina"}), (s:SoilType {name:"Argileux"})
CREATE (v)-[:SUITED_FOR {fitness: "POOR", notes: "DANGER: Verticilliose quasi certaine en sol argileux humide."}]->(s);
MATCH (v:Variety {name:"Arbequina"}), (s:SoilType {name:"Limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Acceptable."}]->(s);
MATCH (v:Variety {name:"Arbequina"}), (s:SoilType {name:"Argilo-limoneux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Acceptable si drainage assuré."}]->(s);
MATCH (v:Variety {name:"Arbequina"}), (s:SoilType {name:"Argilo-sableux"})
CREATE (v)-[:SUITED_FOR {fitness: "GOOD", notes: "Acceptable."}]->(s);
