import { Hono } from "hono";
import { prisma } from "../lib/prisma";

type Variables = {
  jwtPayload: {
    userId: string;
  };
};

export const reportsRoute = new Hono<{ Variables: Variables }>();

// GET /api/reports/:fieldId/seasonal - Generate comprehensive seasonal field report
reportsRoute.get("/:fieldId/seasonal", async (c) => {
  const payload = c.get("jwtPayload");
  const fieldId = c.req.param("fieldId");

  // Verify field ownership and fetch deep relational context
  const field = await prisma.field.findFirst({
    where: { id: fieldId, farm: { userId: payload.userId } },
    include: {
      farm: true,
      seasonSummary: true,
      snapshots: {
        orderBy: { captureDate: "desc" },
        take: 10,
      },
    },
  });

  if (!field) {
    return c.json({ error: "Parcelle non trouvée / الحقل غير موجود" }, 404);
  }

  // Fetch recent operations
  const operations = await prisma.operation.findMany({
    where: { fieldId },
    orderBy: { date: "desc" },
    take: 20,
  });

  // Fetch daily GDD metrics count
  const metricsCount = await prisma.fieldDailyMetrics.count({
    where: { fieldId },
  });

  const summary = field.seasonSummary[0];
  const latestSnapshot = field.snapshots[0];

  const reportPayload = {
    generatedAt: new Date().toISOString(),
    field: {
      id: field.id,
      name: field.name,
      cropType: field.cropType || "Picholine Marocaine",
      areaHa: field.area,
      plantingDate: field.plantingDate,
      farmName: field.farm?.name || "Ferme Mizan",
    },
    phenology: {
      currentStage: summary?.currentStage || "CROISSANCE",
      accumulatedGdd: summary?.accumulatedGdd || 0,
      accumulatedChilling: summary?.accumulatedChilling || 0,
      bioFixReached: summary?.bioFixReached || false,
      predictedHarvestDate: summary?.predictedHarvestDate,
      totalDaysTracked: metricsCount,
    },
    satelliteSummary: latestSnapshot
      ? {
          lastPassDate: latestSnapshot.captureDate,
          dataSource: latestSnapshot.dataSource,
          meanSavi: latestSnapshot.meanSavi,
          meanNdvi: latestSnapshot.meanNdvi,
          meanNdwi: latestSnapshot.meanNdwi,
          canopyCoverPct: latestSnapshot.canopyCoverPct,
          phenologyClass: latestSnapshot.phenologyClass,
        }
      : null,
    operationsSummary: {
      totalLogged: operations.length,
      recent: operations.slice(0, 5),
    },
  };

  return c.json({ status: "success", report: reportPayload });
});
