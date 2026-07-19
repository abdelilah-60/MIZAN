// ============================================================
// MIZAN — Olive Knowledge Graph
// 01: Clear Database & Create Indexes
// ============================================================

// Clear all existing nodes and relationships
MATCH (n) DETACH DELETE n;

// Performance indexes on all node labels
CREATE INDEX ON :Variety(name);
CREATE INDEX ON :Disease(name);
CREATE INDEX ON :Stage(name);
CREATE INDEX ON :SoilType(name);
CREATE INDEX ON :Treatment(name);
CREATE INDEX ON :OperationTemplate(type);
CREATE INDEX ON :Parameter(name);
