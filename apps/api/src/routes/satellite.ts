import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const AI_BASE_URL = process.env.AI_SERVICE_URL || "https://mizan-ai-tau.vercel.app";
const AI_TIMEOUT_MS = parseInt(process.env.AI_TIMEOUT_MS || "15000", 10);

type Variables = {
  jwtPayload: {
    userId: string;
    role: string;
  };
};

const satelliteRoute = new Hono<{ Variables: Variables }>();

satelliteRoute.post("/analyze", async (c) => {
  try {
    const body = await c.req.json();
    const res = await fetch(`${AI_BASE_URL}/api/satellite/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(AI_TIMEOUT_MS),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("AI satellite route returned non-200:", res.status, errText);
      return c.json({ error: "AI Satellite Service Error" }, res.status as any);
    }

    const data = await res.json();

    // After getting the AI response, save snapshot
    if (data.status === "success" && data.savi) {
      try {
        await prisma.satelliteSnapshot.upsert({
          where: { fieldId_captureDate: { fieldId: body.fieldId || "unknown", captureDate: new Date(data.lastPassDate || new Date()) } },
          create: {
            fieldId: body.fieldId || "unknown",
            captureDate: new Date(data.lastPassDate || new Date()),
            dataSource: data.dataSource || "synthetic",
            cloudCover: data.cloudCover || null,
            meanSavi: data.savi?.mean || 0,
            meanNdvi: data.ndvi?.mean || 0,
            meanNdwi: data.ndwi?.mean || 0,
            meanNdre: 0,
            canopyCoverPct: data.canopyCover?.meanPct || 0,
            phenologyClass: data.phenologyProfile?.landCoverClass || null,
            rawPayload: data
          },
          update: {
            meanSavi: data.savi?.mean || 0,
            meanNdvi: data.ndvi?.mean || 0,
            meanNdwi: data.ndwi?.mean || 0,
            canopyCoverPct: data.canopyCover?.meanPct || 0,
            phenologyClass: data.phenologyProfile?.landCoverClass || null,
            rawPayload: data
          }
        });
      } catch (e) { /* ignore save errors */ }
    }

    return c.json(data);
  } catch (error: any) {
    console.error("Gateway error proxying satellite request:", error);
    return c.json({ error: "Internal Gateway Error Calling Satellite AI Service" }, 500);
  }
});

// GET /history/:fieldId - Get satellite snapshot history
satelliteRoute.get("/history/:fieldId", async (c) => {
  const payload = c.get("jwtPayload");
  const fieldId = c.req.param("fieldId");
  
  // Verify field ownership
  const field = await prisma.field.findFirst({
    where: { id: fieldId, farm: { userId: payload.userId } }
  });
  if (!field) return c.json({ error: "Field not found" }, 404);
  
  const snapshots = await prisma.satelliteSnapshot.findMany({
    where: { fieldId },
    orderBy: { captureDate: "desc" },
    take: 20
  });
  
  return c.json({ snapshots });
});

export default satelliteRoute;
