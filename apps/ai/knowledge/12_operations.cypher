// ============================================================
// MIZAN — Olive Knowledge Graph
// 12: Operation Templates & Parameters (قوالب العمليات)
// ============================================================
// Preserves existing UI-driving ontology for dynamic forms.
// ============================================================

// ── Operation Templates ─────────────────────────────────────
CREATE (:OperationTemplate {type: "IRRIGATION"});
CREATE (:OperationTemplate {type: "FERTILIZER"});
CREATE (:OperationTemplate {type: "PRUNING"});
CREATE (:OperationTemplate {type: "HARVEST"});
CREATE (:OperationTemplate {type: "PESTICIDE"});
CREATE (:OperationTemplate {type: "FUNGICIDE"});

// ── Parameters ──────────────────────────────────────────────
CREATE (:Parameter {name: "Volume",               unit: "Liters",    type: "number"});
CREATE (:Parameter {name: "Duration",             unit: "Minutes",   type: "number"});
CREATE (:Parameter {name: "ProductName",          unit: null,        type: "text"});
CREATE (:Parameter {name: "Quantity",             unit: "kg",        type: "number"});
CREATE (:Parameter {name: "Technique",            unit: null,        type: "select",
  options: "Taille de formation,Taille de fructification,Taille de rajeunissement"});
CREATE (:Parameter {name: "IntensityLevel",       unit: null,        type: "select",
  options: "Légère,Modérée,Sévère"});
CREATE (:Parameter {name: "Method",               unit: null,        type: "select",
  options: "Manuel,Mécanique,Mixte"});
CREATE (:Parameter {name: "YieldEstimate",        unit: "kg/ha",     type: "number"});
CREATE (:Parameter {name: "Variété",              unit: null,        type: "select",
  options: "Picholine Marocaine,Haouzia,Menara,Dahbia,Meslala,Arbequina"});
CREATE (:Parameter {name: "Porte-greffe",         unit: null,        type: "text"});
CREATE (:Parameter {name: "Texture du Sol",       unit: null,        type: "select",
  options: "Sablonneux,Argileux,Limoneux,Argilo-limoneux,Argilo-sableux"});
CREATE (:Parameter {name: "Système d Irrigation", unit: null,        type: "select",
  options: "Goutte à goutte,Aspersion,Gravitaire,Micro-aspersion"});
CREATE (:Parameter {name: "Exposition",           unit: null,        type: "select",
  options: "Nord,Sud,Est,Ouest,Sud-Est,Sud-Ouest"});
CREATE (:Parameter {name: "Densité de Plantation", unit: "arbres/ha", type: "number"});

// ── Operation → Parameter links ─────────────────────────────
MATCH (ot:OperationTemplate {type:"IRRIGATION"}), (p:Parameter {name:"Volume"})     CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"IRRIGATION"}), (p:Parameter {name:"Duration"})   CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"FERTILIZER"}), (p:Parameter {name:"ProductName"}) CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"FERTILIZER"}), (p:Parameter {name:"Quantity"})   CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"PRUNING"}),    (p:Parameter {name:"Technique"})  CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"PRUNING"}),    (p:Parameter {name:"IntensityLevel"}) CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"HARVEST"}),    (p:Parameter {name:"Method"})     CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"HARVEST"}),    (p:Parameter {name:"YieldEstimate"}) CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"PESTICIDE"}),  (p:Parameter {name:"ProductName"}) CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"PESTICIDE"}),  (p:Parameter {name:"Quantity"})   CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"FUNGICIDE"}),  (p:Parameter {name:"ProductName"}) CREATE (ot)-[:REQUIRES_PARAMETER]->(p);
MATCH (ot:OperationTemplate {type:"FUNGICIDE"}),  (p:Parameter {name:"Quantity"})   CREATE (ot)-[:REQUIRES_PARAMETER]->(p);

// ── Variety → Operation links ───────────────────────────────
MATCH (v:Variety), (ot:OperationTemplate)
CREATE (v)-[:HAS_OPERATION]->(ot);

// ── Variety → Field Requirement links ───────────────────────
MATCH (v:Variety), (p:Parameter)
WHERE p.name IN ["Variété", "Porte-greffe", "Texture du Sol", "Système d Irrigation", "Exposition", "Densité de Plantation"]
CREATE (v)-[:HAS_FIELD_REQUIREMENT]->(p);
