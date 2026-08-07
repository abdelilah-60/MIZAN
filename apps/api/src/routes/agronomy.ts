import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const AI_BASE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";
const AI_TIMEOUT_MS = parseInt(process.env.AI_TIMEOUT_MS || "5000", 10);

type Variables = {
  jwtPayload: {
    userId: string;
  };
};

const agronomyRoute = new Hono<{ Variables: Variables }>();

// Helper function to verify field ownership before accessing agronomic data (BOLA mitigation)
async function verifyFieldOwnership(fieldId: string, userId: string): Promise<boolean> {
  const field = await prisma.field.findFirst({
    where: { id: fieldId, farm: { userId } }
  });
  return !!field;
}

// Helper to get Kc (Crop Coefficient) based on growth stage
function getKcForStage(stage?: string | null): number {
  if (!stage) return 0.55;
  switch (stage.toUpperCase()) {
    case "DORMANCE":
      return 0.50;
    case "DEBOURREMENT":
      return 0.60;
    case "FLORAISON":
    case "NOUAISON":
      return 0.70;
    case "CROISSANCE":
      return 0.75;
    case "VERAISON":
      return 0.65;
    case "RECOLTE":
      return 0.55;
    default:
      return 0.60;
  }
}

// GET /:fieldId/config — Fetch all agronomic configurations
agronomyRoute.get("/:fieldId/config", async (c) => {
  const fieldId = c.req.param("fieldId");
  const payload = c.get("jwtPayload");
  const userId = payload.userId;

  try {
    if (!(await verifyFieldOwnership(fieldId, userId))) {
      return c.json({ error: "Field not found or unauthorized" }, 404);
    }

    const irrigationConfig = await prisma.irrigationConfig.findUnique({
      where: { fieldId }
    });

    const soilAnalysis = await prisma.soilAnalysis.findMany({
      where: { fieldId },
      orderBy: { analysisDate: "desc" }
    });

    const yieldConfig = await prisma.yieldConfig.findUnique({
      where: { fieldId }
    });

    return c.json({
      irrigationConfig,
      soilAnalysis,
      yieldConfig
    });
  } catch (error: any) {
    return c.json({ error: "Failed to fetch configurations", details: error.message }, 500);
  }
});

// POST /:fieldId/irrigation — Create or update irrigation config
agronomyRoute.post("/:fieldId/irrigation", async (c) => {
  const fieldId = c.req.param("fieldId");
  const payload = c.get("jwtPayload");
  const userId = payload.userId;
  const body = await c.req.json();

  try {
    if (!(await verifyFieldOwnership(fieldId, userId))) {
      return c.json({ error: "Field not found or unauthorized" }, 404);
    }

    const config = await prisma.irrigationConfig.upsert({
      where: { fieldId },
      update: {
        dripperFlowRate: parseFloat(body.dripperFlowRate),
        drippersPerTree: parseInt(body.drippersPerTree, 10),
        treeDensity: parseInt(body.treeDensity, 10),
        efficiency: body.efficiency ? parseFloat(body.efficiency) : 0.85
      },
      create: {
        fieldId,
        dripperFlowRate: parseFloat(body.dripperFlowRate),
        drippersPerTree: parseInt(body.drippersPerTree, 10),
        treeDensity: parseInt(body.treeDensity, 10),
        efficiency: body.efficiency ? parseFloat(body.efficiency) : 0.85
      }
    });

    return c.json(config, 200);
  } catch (error: any) {
    return c.json({ error: "Failed to save irrigation config", details: error.message }, 500);
  }
});

// POST /:fieldId/soil — Add a new soil analysis record
agronomyRoute.post("/:fieldId/soil", async (c) => {
  const fieldId = c.req.param("fieldId");
  const payload = c.get("jwtPayload");
  const userId = payload.userId;
  const body = await c.req.json();

  try {
    if (!(await verifyFieldOwnership(fieldId, userId))) {
      return c.json({ error: "Field not found or unauthorized" }, 404);
    }

    const record = await prisma.soilAnalysis.create({
      data: {
        fieldId,
        analysisDate: new Date(body.analysisDate),
        ph: body.ph ? parseFloat(body.ph) : null,
        organicMatter: body.organicMatter ? parseFloat(body.organicMatter) : null,
        nitrogen: body.nitrogen ? parseFloat(body.nitrogen) : null,
        phosphorus: body.phosphorus ? parseFloat(body.phosphorus) : null,
        potassium: body.potassium ? parseFloat(body.potassium) : null
      }
    });

    return c.json(record, 201);
  } catch (error: any) {
    return c.json({ error: "Failed to save soil analysis", details: error.message }, 500);
  }
});

// POST /:fieldId/yield — Create or update yield config
agronomyRoute.post("/:fieldId/yield", async (c) => {
  const fieldId = c.req.param("fieldId");
  const payload = c.get("jwtPayload");
  const userId = payload.userId;
  const body = await c.req.json();

  try {
    if (!(await verifyFieldOwnership(fieldId, userId))) {
      return c.json({ error: "Field not found or unauthorized" }, 404);
    }

    const config = await prisma.yieldConfig.upsert({
      where: { fieldId },
      update: {
        targetYield: parseFloat(body.targetYield),
        bearingStatus: body.bearingStatus
      },
      create: {
        fieldId,
        targetYield: parseFloat(body.targetYield),
        bearingStatus: body.bearingStatus
      }
    });

    return c.json(config, 200);
  } catch (error: any) {
    return c.json({ error: "Failed to save yield config", details: error.message }, 500);
  }
});

// GET /:fieldId/recommendations — Compute irrigation & NPK recommendations
agronomyRoute.get("/:fieldId/recommendations", async (c) => {
  const fieldId = c.req.param("fieldId");
  const payload = c.get("jwtPayload");
  const userId = payload.userId;

  try {
    if (!(await verifyFieldOwnership(fieldId, userId))) {
      return c.json({ error: "Field not found or unauthorized" }, 404);
    }

    // 1. Get configurations and field details
    const field = await prisma.field.findUnique({ where: { id: fieldId } });
    if (!field) {
      return c.json({ error: "Field not found" }, 404);
    }

    const irrConfig = await prisma.irrigationConfig.findUnique({ where: { fieldId } });
    const soilAnalyses = await prisma.soilAnalysis.findMany({
      where: { fieldId },
      orderBy: { analysisDate: "desc" },
      take: 1
    });
    const yieldConfig = await prisma.yieldConfig.findUnique({ where: { fieldId } });
    
    const latestDaily = await prisma.fieldDailyMetrics.findFirst({
      where: { fieldId, season: 2026 },
      orderBy: { date: "desc" }
    });

    const cropName = (field.cropType || "Picholine Marocaine").toLowerCase();
    const isSHD = cropName.includes("arbequina") || cropName.includes("arbosana") || cropName.includes("koroneiki");
    const defaultDensity = isSHD ? 1666 : 200;

    // 2. Prepare payload for the Python AI calculation service
    const payloadData = {
      crop: field.cropType || "Picholine Marocaine",
      stage: latestDaily?.currentStage || "DORMANCE",
      tmax: latestDaily?.tmax ?? 25,
      tmin: latestDaily?.tmin ?? 15,
      precipitation: latestDaily?.precipitation ?? 0,
      tree_density: (irrConfig?.treeDensity && irrConfig.treeDensity >= 50 && irrConfig.treeDensity <= 3500)
        ? (irrConfig.treeDensity === 200 && isSHD ? 1666 : irrConfig.treeDensity)
        : defaultDensity,
      drippers_per_tree: irrConfig?.drippersPerTree ?? 4,
      dripper_flow_rate: irrConfig?.dripperFlowRate ?? 4.0,
      efficiency: irrConfig?.efficiency ?? 0.85,
      target_yield: yieldConfig?.targetYield ?? 5.0,
      bearing_status: yieldConfig?.bearingStatus ?? "NORMAL",
      soil_ph: soilTest?.ph ?? null,
      soil_organic_matter: soilTest?.organicMatter ?? null,
      soil_nitrogen: soilTest?.nitrogen ?? null,
      soil_phosphorus: soilTest?.phosphorus ?? null,
      soil_potassium: soilTest?.potassium ?? null
    };

    // 3. Request calculation from AI Service (Memgraph backed)
    const url = `${AI_BASE_URL}/api/agronomy/calculate`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadData),
      signal: AbortSignal.timeout(AI_TIMEOUT_MS)
    });

    if (!res.ok) {
      throw new Error(`AI service responded with status ${res.status}`);
    }

    const result = await res.json();

    const waterRec = {
      et0: result.irrigation.et0,
      etc: result.irrigation.etc,
      precipitation: result.irrigation.precipitation,
      netWaterDepthMm: result.irrigation.netWaterDepthMm,
      litersPerTree: result.irrigation.litersPerTree,
      durationMinutes: result.irrigation.durationMinutes,
      configured: !!irrConfig
    };

    const npkRec = {
      n: Math.round(result.fertilization.n_rec),
      p: Math.round(result.fertilization.p_rec),
      k: Math.round(result.fertilization.k_rec),
      targetYield: yieldConfig?.targetYield ?? 5.0,
      bearingStatus: yieldConfig?.bearingStatus ?? "NORMAL",
      soilTestDate: soilTest ? soilTest.analysisDate : null,
      configured: !!yieldConfig
    };

    return c.json({
      water: waterRec,
      npk: npkRec
    });

  } catch (error: any) {
    console.error("Failed to generate recommendations via AI service, applying fallback:", error);
    
    // ── FALLBACK COMPUTATION IF AI SERVICE IS DOWN ──
    const irrConfig = await prisma.irrigationConfig.findUnique({ where: { fieldId } });
    const soilAnalyses = await prisma.soilAnalysis.findMany({
      where: { fieldId },
      orderBy: { analysisDate: "desc" },
      take: 1
    });
    const yieldConfig = await prisma.yieldConfig.findUnique({ where: { fieldId } });

    const cropName = (field.cropType || "").toLowerCase();
    const isSHD = cropName.includes("arbequina") || cropName.includes("arbosana") || cropName.includes("koroneiki");
    const rawDensity = irrConfig?.treeDensity || (isSHD ? 1666 : 200);
    const density = (rawDensity >= 50 && rawDensity <= 3500) ? (rawDensity === 200 && isSHD ? 1666 : rawDensity) : (isSHD ? 1666 : 200);
    const drippers = (irrConfig?.drippersPerTree && irrConfig.drippersPerTree > 0) ? irrConfig.drippersPerTree : 4;
    const flowRate = (irrConfig?.dripperFlowRate && irrConfig.dripperFlowRate > 0) ? irrConfig.dripperFlowRate : 4.0;
    const eff = (irrConfig?.efficiency && irrConfig.efficiency > 0) ? irrConfig.efficiency : 0.85;

    // Kr canopy reduction factor: 0.65 for SHD Arbequina, 0.85 for standard mature trees
    const kr = isSHD ? 0.65 : 0.85;
    const et0 = 5.7;
    const kc = isSHD ? 0.55 : 0.70;
    const netWaterDepthMm = parseFloat((et0 * kc * kr).toFixed(2));

    const liters = (netWaterDepthMm * 10000) / density;
    const hours = liters / (drippers * flowRate * eff);

    const waterRec = {
      et0: et0,
      etc: netWaterDepthMm,
      precipitation: 0,
      netWaterDepthMm: netWaterDepthMm,
      litersPerTree: parseFloat(liters.toFixed(1)),
      durationMinutes: Math.round(hours * 60),
      configured: !!irrConfig
    };

    const soilTest = soilAnalyses[0];
    const targetYield = yieldConfig?.targetYield ?? 5.0;
    const npkRec = {
      n: Math.round((15.0 * targetYield) / 0.7),
      p: Math.round((5.0 * targetYield) / 0.5),
      k: Math.round((20.0 * targetYield) / 0.6),
      targetYield,
      bearingStatus: yieldConfig?.bearingStatus ?? "NORMAL",
      soilTestDate: soilTest ? soilTest.analysisDate : null,
      configured: !!yieldConfig
    };

    return c.json({
      water: waterRec,
      npk: npkRec,
      fallback: true
    });
  }
});

const VARIETIES_CONFIG: Record<string, { gddFlower: number; gddTotal: number }> = {
  "Picholine Marocaine": { gddFlower: 650, gddTotal: 3400 },
  "Haouzia": { gddFlower: 620, gddTotal: 3200 },
  "Menara": { gddFlower: 630, gddTotal: 3200 },
  "Dahbia": { gddFlower: 580, gddTotal: 2800 },
  "Meslala": { gddFlower: 560, gddTotal: 2600 },
  "Arbequina": { gddFlower: 550, gddTotal: 3000 }
};

function calculateStageForGdd(variety: string, gdd: number): { stage: string; nextStageGdd: number | null } {
  const config = VARIETIES_CONFIG[variety] || VARIETIES_CONFIG["Picholine Marocaine"];
  const flowerStart = config.gddFlower * 0.4;
  const nouaisonStart = config.gddFlower * 1.2;
  const croissanceStart = config.gddFlower * 1.6;
  const veraisonStart = config.gddTotal * 0.75;
  const recolteStart = config.gddTotal;

  if (gdd < flowerStart) return { stage: "DEBOURREMENT", nextStageGdd: flowerStart };
  else if (gdd < nouaisonStart) return { stage: "FLORAISON", nextStageGdd: nouaisonStart };
  else if (gdd < croissanceStart) return { stage: "NOUAISON", nextStageGdd: croissanceStart };
  else if (gdd < veraisonStart) return { stage: "CROISSANCE", nextStageGdd: veraisonStart };
  else if (gdd < recolteStart) return { stage: "VERAISON", nextStageGdd: recolteStart };
  else return { stage: "RECOLTE", nextStageGdd: null };
}

agronomyRoute.post("/recalculate", async (c) => {
  try {
    const fields = await prisma.field.findMany({
      include: {
        seasonSummary: true
      }
    });

    let updatedCount = 0;
    const results: any[] = [];

    for (const field of fields) {
      const summary = field.seasonSummary?.[0];
      if (summary) {
        const stageInfo = calculateStageForGdd(field.cropType, summary.accumulatedGdd);
        const gddToNextStage = stageInfo.nextStageGdd !== null ? Math.max(0, stageInfo.nextStageGdd - summary.accumulatedGdd) : null;
        
        await prisma.fieldSeasonSummary.update({
          where: { id: summary.id },
          data: {
            currentStage: stageInfo.stage,
            gddToNextStage: gddToNextStage,
            lastUpdated: new Date()
          }
        });

        const latestDaily = await prisma.fieldDailyMetrics.findFirst({
          where: { fieldId: field.id },
          orderBy: { date: "desc" }
        });

        if (latestDaily) {
          await prisma.fieldDailyMetrics.update({
            where: { id: latestDaily.id },
            data: {
              currentStage: stageInfo.stage,
              gddToNextStage: gddToNextStage
            }
          });
        }

        updatedCount++;
        results.push({ fieldName: field.name, cropType: field.cropType, accumulatedGdd: summary.accumulatedGdd, newStage: stageInfo.stage });
      }
    }

    return c.json({ status: "success", message: `Successfully recalculated GDD stage for ${updatedCount} fields.`, updatedCount, results });
  } catch (err: any) {
    console.error("Recalculate error:", err);
    return c.json({ error: err.message }, 500);
  }
});

export default agronomyRoute;
