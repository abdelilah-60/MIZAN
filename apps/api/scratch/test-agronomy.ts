import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://mizan_user:mizan_password@localhost:5434/mizan_db?schema=public",
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function runTest() {
  const fieldId = "39f0e2bb-7c78-46a1-a69d-407ad6016c5b"; // Field P1
  console.log("Starting agronomy calculations test for P1...");

  // Setup mock configs in database
  await prisma.irrigationConfig.upsert({
    where: { fieldId },
    update: {
      dripperFlowRate: 4.0,
      drippersPerTree: 2,
      treeDensity: 200,
      efficiency: 0.85
    },
    create: {
      fieldId,
      dripperFlowRate: 4.0,
      drippersPerTree: 2,
      treeDensity: 200,
      efficiency: 0.85
    }
  });

  await prisma.yieldConfig.upsert({
    where: { fieldId },
    update: {
      targetYield: 8.0, // 8 tons per hectare
      bearingStatus: "ON_YEAR"
    },
    create: {
      fieldId,
      targetYield: 8.0,
      bearingStatus: "ON_YEAR"
    }
  });

  await prisma.soilAnalysis.create({
    data: {
      fieldId,
      analysisDate: new Date(),
      ph: 7.2,
      organicMatter: 2.5, // 2.5% OM
      nitrogen: 25.0,
      phosphorus: 12.0, // 12 ppm Olsen
      potassium: 150.0 // 150 ppm K
    }
  });

  // Now, calculate
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

  console.log("Retrieved Configs:", { irrConfig, soilTest: soilAnalyses[0], yieldConfig, latestDaily });

  let waterRec = { et0: 0, etc: 0, netWaterDepthMm: 0, litersPerTree: 0, durationMinutes: 0 };
  if (latestDaily) {
    const tmax = latestDaily.tmax;
    const tmin = latestDaily.tmin;
    const tavg = (tmax + tmin) / 2;
    const precip = latestDaily.precipitation ?? 0;
    const stage = latestDaily.currentStage;

    const et0 = 0.0023 * (tavg + 17.8) * Math.pow(Math.max(0.1, tmax - tmin), 0.5) * 12;
    const kc = 0.65; // VERAISON
    const etc = et0 * kc;
    const netWaterDepth = Math.max(0, etc - precip);

    waterRec.et0 = et0;
    waterRec.etc = etc;
    waterRec.netWaterDepthMm = netWaterDepth;

    if (irrConfig) {
      const liters = (netWaterDepth * 10000) / irrConfig.treeDensity;
      const hours = (liters / (irrConfig.drippersPerTree * irrConfig.dripperFlowRate)) / irrConfig.efficiency;
      
      waterRec.litersPerTree = liters;
      waterRec.durationMinutes = Math.round(hours * 60);
    }
  }

  console.log("Calculated Irrigation Recommendation:", waterRec);

  // NPK calculation
  const targetYield = yieldConfig?.targetYield ?? 5.0;
  const bearingStatus = yieldConfig?.bearingStatus ?? "NORMAL";

  let nExportPerTon = 15.0;
  let pExportPerTon = 5.0;
  let kExportPerTon = 20.0;

  if (bearingStatus === "ON_YEAR") {
    kExportPerTon *= 1.2;
  }

  const nExportTotal = nExportPerTon * targetYield;
  const pExportTotal = pExportPerTon * targetYield;
  const kExportTotal = kExportPerTon * targetYield;

  let nContribution = 15.0;
  let pContribution = 5.0;
  let kContribution = 20.0;

  const soilTest = soilAnalyses[0];
  if (soilTest) {
    if (soilTest.organicMatter) nContribution = soilTest.organicMatter * 10;
    if (soilTest.phosphorus) pContribution = soilTest.phosphorus * 0.5;
    if (soilTest.potassium) kContribution = soilTest.potassium * 0.3;
  }

  const nRec = Math.max(0, nExportTotal - nContribution) / 0.7;
  const pRec = Math.max(0, pExportTotal - pContribution) / 0.5;
  const kRec = Math.max(0, kExportTotal - kContribution) / 0.6;

  console.log("Calculated NPK Recommendation:", {
    n: Math.round(nRec),
    p: Math.round(pRec),
    k: Math.round(kRec),
    nExportTotal,
    nContribution,
    pExportTotal,
    pContribution,
    kExportTotal,
    kContribution
  });

  process.exit(0);
}

runTest();
