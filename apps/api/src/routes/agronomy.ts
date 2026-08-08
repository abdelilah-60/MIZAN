import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import centroid from "@turf/centroid";
import { polygon } from "@turf/helpers";

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
    const soilTest = soilAnalyses[0];
    const yieldConfig = await prisma.yieldConfig.findUnique({ where: { fieldId } });
    
    const latestDaily = await prisma.fieldDailyMetrics.findFirst({
      where: { fieldId, season: 2026 },
      orderBy: { date: "desc" }
    });

    // 2. Extract latitude from field geoPolygon for dynamic Ra computation
    let latitude = 33.0; // Default: central Morocco
    try {
      const geoData: any = typeof field.geoPolygon === 'string'
        ? JSON.parse(field.geoPolygon as string)
        : field.geoPolygon;
      const coords = geoData.coordinates ? geoData.coordinates : geoData;
      const poly = polygon(coords);
      const center = centroid(poly);
      latitude = center.geometry.coordinates[1];
    } catch (e) {
      console.warn("Could not extract latitude from geoPolygon, using default 33.0");
    }

    // Compute GDD progress within current stage for Kc interpolation
    const accGdd = latestDaily?.accumulatedGdd ?? 0;
    const gddToNext = latestDaily?.gddToNextStage ?? 100;
    const gddProgressPct = gddToNext > 0 ? Math.min(1.0, accGdd / (accGdd + gddToNext)) : 0.5;

    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / 86400000);

    // 3. Prepare payload for the Python AI calculation service
    const payloadData = {
      crop: field.cropType || "Picholine Marocaine",
      stage: latestDaily?.currentStage || "DORMANCE",
      tmax: latestDaily?.tmax ?? 25,
      tmin: latestDaily?.tmin ?? 15,
      precipitation: latestDaily?.precipitation ?? 0,
      tree_density: irrConfig?.treeDensity ?? 200,
      drippers_per_tree: irrConfig?.drippersPerTree ?? 4,
      dripper_flow_rate: irrConfig?.dripperFlowRate ?? 4.0,
      efficiency: irrConfig?.efficiency ?? 0.85,
      target_yield: yieldConfig?.targetYield ?? 5.0,
      bearing_status: yieldConfig?.bearingStatus ?? "NORMAL",
      latitude: latitude,
      day_of_year: dayOfYear,
      gdd_progress_pct: gddProgressPct,
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
      kc: result.irrigation.kc,
      kr: result.irrigation.kr,
      ra: result.irrigation.ra,
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
      configured: !!yieldConfig,
      monthlySchedule: result.fertilization.monthlySchedule || [],
      micronutrients: result.fertilization.micronutrients || null,
      foliarSprays: result.fertilization.foliarSprays || []
    };

    return c.json({
      water: waterRec,
      npk: npkRec
    });

  } catch (error: any) {
    console.error("Failed to generate recommendations via AI service, applying fallback:", error);
    
    // ── FALLBACK: Real Hargreaves computation using stored weather data ──
    const fbField = await prisma.field.findUnique({ where: { id: fieldId } });
    const fbIrrConfig = await prisma.irrigationConfig.findUnique({ where: { fieldId } });
    const fbSoilAnalyses = await prisma.soilAnalysis.findMany({
      where: { fieldId },
      orderBy: { analysisDate: "desc" },
      take: 1
    });
    const fbYieldConfig = await prisma.yieldConfig.findUnique({ where: { fieldId } });
    const fbLatestDaily = await prisma.fieldDailyMetrics.findFirst({
      where: { fieldId, season: new Date().getFullYear() },
      orderBy: { date: "desc" }
    });

    // Extract latitude for dynamic Ra
    let fbLat = 33.0;
    try {
      const geoData: any = typeof fbField?.geoPolygon === 'string'
        ? JSON.parse(fbField.geoPolygon as string)
        : fbField?.geoPolygon;
      if (geoData) {
        const coords = geoData.coordinates ? geoData.coordinates : geoData;
        const poly = polygon(coords);
        const center = centroid(poly);
        fbLat = center.geometry.coordinates[1];
      }
    } catch { /* default latitude */ }

    // FAO-56 dynamic Ra computation
    const fbToday = new Date();
    const fbStartOfYear = new Date(fbToday.getFullYear(), 0, 0);
    const fbDoy = Math.floor((fbToday.getTime() - fbStartOfYear.getTime()) / 86400000);
    const latRad = fbLat * Math.PI / 180;
    const dr = 1 + 0.033 * Math.cos(2 * Math.PI * fbDoy / 365);
    const delta = 0.409 * Math.sin(2 * Math.PI * fbDoy / 365 - 1.39);
    const ws = Math.acos(Math.max(-1, Math.min(1, -Math.tan(latRad) * Math.tan(delta))));
    const Gsc = 0.0820;
    const fbRa = (24 * 60 / Math.PI) * Gsc * dr * (
      ws * Math.sin(latRad) * Math.sin(delta) +
      Math.cos(latRad) * Math.cos(delta) * Math.sin(ws)
    );

    // Use real weather data from FieldDailyMetrics if available
    const fbTmax = fbLatestDaily?.tmax ?? 25;
    const fbTmin = fbLatestDaily?.tmin ?? 15;
    const fbPrecip = fbLatestDaily?.precipitation ?? 0;
    const fbTavg = (fbTmax + fbTmin) / 2;
    const fbTdiff = Math.max(0.1, fbTmax - fbTmin);

    const fbEt0 = 0.0023 * (fbTavg + 17.8) * Math.pow(fbTdiff, 0.5) * fbRa;

    // Determine Kc from stage
    const fbCropLower = (fbField?.cropType || "").toLowerCase();
    const fbIsShd = ["arbequina", "arbosana", "koroneiki"].some(k => fbCropLower.includes(k));
    const fbStage = fbLatestDaily?.currentStage || "DORMANCE";
    const fbKcMap: Record<string, number> = fbIsShd
      ? { DORMANCE: 0.40, DEBOURREMENT: 0.48, FLORAISON: 0.55, NOUAISON: 0.58, CROISSANCE: 0.65, VERAISON: 0.50, RECOLTE: 0.45 }
      : { DORMANCE: 0.45, DEBOURREMENT: 0.55, FLORAISON: 0.60, NOUAISON: 0.65, CROISSANCE: 0.70, VERAISON: 0.55, RECOLTE: 0.50 };
    const fbKc = fbKcMap[fbStage] ?? 0.55;
    const fbKr = fbIsShd ? 0.60 : 0.80;

    const fbEtc = fbEt0 * fbKc * fbKr;
    const fbNetMm = Math.max(0, fbEtc - fbPrecip);

    const density = fbIrrConfig?.treeDensity || 277;
    const drippers = (fbIrrConfig?.drippersPerTree && fbIrrConfig.drippersPerTree > 0) ? fbIrrConfig.drippersPerTree : 4;
    const flowRate = (fbIrrConfig?.dripperFlowRate && fbIrrConfig.dripperFlowRate > 0) ? fbIrrConfig.dripperFlowRate : 8.0;
    const eff = (fbIrrConfig?.efficiency && fbIrrConfig.efficiency > 0) ? fbIrrConfig.efficiency : 0.85;

    const liters = (fbNetMm * 10000) / density;
    const hours = liters / (drippers * flowRate * eff);

    const waterRec = {
      et0: parseFloat(fbEt0.toFixed(2)),
      kc: fbKc,
      kr: fbKr,
      ra: parseFloat(fbRa.toFixed(2)),
      etc: parseFloat(fbEtc.toFixed(2)),
      precipitation: fbPrecip,
      netWaterDepthMm: parseFloat(fbNetMm.toFixed(2)),
      litersPerTree: parseFloat(liters.toFixed(1)),
      durationMinutes: Math.round(hours * 60),
      configured: !!fbIrrConfig
    };

    const soilTest = fbSoilAnalyses[0];
    const targetYield = fbYieldConfig?.targetYield ?? 5.0;
    const fbNRec = Math.round((15.0 * targetYield) / 0.7);
    const fbPRec = Math.round((5.0 * targetYield) / 0.5);
    const fbKRec = Math.round((20.0 * targetYield) / 0.6);

    const fbMonthlyWeights = [
      { month: "Février", monthNum: 2, nPct: 0.15, pPct: 0.30, kPct: 0.10, stage: "Débourrement" },
      { month: "Mars", monthNum: 3, nPct: 0.20, pPct: 0.20, kPct: 0.10, stage: "Floraison" },
      { month: "Avril", monthNum: 4, nPct: 0.20, pPct: 0.15, kPct: 0.10, stage: "Nouaison" },
      { month: "Mai", monthNum: 5, nPct: 0.15, pPct: 0.10, kPct: 0.15, stage: "Croissance" },
      { month: "Juin", monthNum: 6, nPct: 0.15, pPct: 0.10, kPct: 0.20, stage: "Durcissement du noyau" },
      { month: "Juillet", monthNum: 7, nPct: 0.10, pPct: 0.10, kPct: 0.20, stage: "Accumulation d'huile" },
      { month: "Août", monthNum: 8, nPct: 0.05, pPct: 0.05, kPct: 0.10, stage: "Véraison" },
      { month: "Septembre", monthNum: 9, nPct: 0.00, pPct: 0.00, kPct: 0.05, stage: "Maturation" },
    ];

    const fbMonthlySchedule = fbMonthlyWeights.map(w => ({
      month: w.month,
      monthNum: w.monthNum,
      stage: w.stage,
      n_kg: parseFloat((fbNRec * w.nPct).toFixed(1)),
      p_kg: parseFloat((fbPRec * w.pPct).toFixed(1)),
      k_kg: parseFloat((fbKRec * w.kPct).toFixed(1)),
    }));

    const npkRec = {
      n: fbNRec,
      p: fbPRec,
      k: fbKRec,
      targetYield,
      bearingStatus: fbYieldConfig?.bearingStatus ?? "NORMAL",
      soilTestDate: soilTest ? soilTest.analysisDate : null,
      configured: !!fbYieldConfig,
      monthlySchedule: fbMonthlySchedule,
      micronutrients: {
        boron_g_per_tree: fbStage === "FLORAISON" ? 25.0 : 0.0,
        zinc_g_per_tree: fbStage === "FLORAISON" ? 15.0 : 0.0,
        iron_chelate_g_per_tree: (soilTest?.ph ?? 7.0) > 7.8 ? 10.0 : 0.0,
        magnesium_kg_per_ha: (soilTest?.potassium ?? 0) > 300 ? 20.0 : 0.0
      },
      foliarSprays: []
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
