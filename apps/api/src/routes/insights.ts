import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import centroid from "@turf/centroid";
import { polygon } from "@turf/helpers";
import { CircuitBreaker } from "../lib/circuit-breaker";

const AI_BASE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";
const AI_TIMEOUT_MS = parseInt(process.env.AI_TIMEOUT_MS || "5000", 10);

const insightsCircuitBreaker = new CircuitBreaker();

type Variables = {
  jwtPayload: {
    userId: string;
    email: string;
  };
};

const app = new Hono<{ Variables: Variables }>();

app.get("/:fieldId", async (c) => {
  const fieldId = c.req.param("fieldId");
  const payload = c.get("jwtPayload");

  try {
    const field = await prisma.field.findFirst({
      where: { id: fieldId, farm: { userId: payload.userId } }
    });

    if (!field) {
      return c.json({ error: "Field not found or unauthorized" }, 404);
    }

    let lon = 0;
    let lat = 0;
    try {
      const geoData: any = typeof field.geoPolygon === 'string' 
        ? JSON.parse(field.geoPolygon as string) 
        : field.geoPolygon;

      const coords = geoData.coordinates ? geoData.coordinates : geoData;
      const poly = polygon(coords);
      const center = centroid(poly);

      lon = center.geometry.coordinates[0];
      lat = center.geometry.coordinates[1];
    } catch (e) {
      console.error("Invalid geoPolygon format, defaulting coordinates.", e);
    }

    let temperature = 25.0;
    let humidity = 60.0;

    try {
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`;
      const weatherRes = await fetch(weatherUrl);
      if (weatherRes.ok) {
        const weatherData = await weatherRes.json();
        temperature = weatherData?.current?.temperature_2m ?? 25.0;
        humidity = weatherData?.current?.relative_humidity_2m ?? 60.0;
      } else {
        console.warn(`Open-Meteo responded with status ${weatherRes.status}, applying fallbacks.`);
      }
    } catch (e) {
      console.warn("Failed to fetch weather from Open-Meteo, applying default fallbacks:", e);
    }

    const recentOperations = await prisma.operation.findMany({
      where: { fieldId },
      orderBy: { date: 'desc' },
      take: 5
    });

    const summary = await prisma.fieldSeasonSummary.findUnique({
      where: {
        fieldId_season: {
          fieldId,
          season: 2026
        }
      }
    });

    const history = await prisma.fieldDailyMetrics.findMany({
      where: {
        fieldId,
        season: 2026
      },
      orderBy: {
        date: "desc"
      },
      take: 7
    });

    const condition = humidity > 70 ? "High Humidity" : "Normal";

    const aiResponseData = await insightsCircuitBreaker.call(
      async () => {
        const res = await fetch(`${AI_BASE_URL}/api/insights/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(AI_TIMEOUT_MS),
          body: JSON.stringify({
            crop: field.cropType,
            condition,
            temperature,
            humidity,
            recent_operations: recentOperations,
            planting_date: field.plantingDate,
            agronomic_data: field.agronomicData,
            accumulated_gdd: summary?.accumulatedGdd || 0,
            current_stage: summary?.currentStage || "DORMANCE",
            bio_fix_reached: summary?.bioFixReached || false,
            gdd_to_next_stage: summary?.gddToNextStage ?? null,
            days_in_current_stage: summary?.daysInCurrentStage || 0,
            history
          })
        });
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`AI responded with ${res.status}: ${errorText}`);
        }
        return await res.json();
      },
      () => null
    );

    return c.json({
      fieldId,
      temperature,
      humidity,
      ai_analysis: aiResponseData,
      ai_service_status: aiResponseData ? "online" : "temporarily unavailable",
      ai_circuit_state: insightsCircuitBreaker.stateInfo.state
    });

  } catch (error) {
    console.error("Error generating insights:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default app;
