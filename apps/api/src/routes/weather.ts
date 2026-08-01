import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { apiCache } from "../lib/cache";

const weatherRoute = new Hono();

const weatherQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
});

// GET /api/weather
weatherRoute.get("/", zValidator("query", weatherQuerySchema), async (c) => {
  try {
    const { lat, lon } = c.req.valid("query");
    const cacheKey = `weather:${lat.toFixed(2)}:${lon.toFixed(2)}`;

    const cachedData = apiCache.get(cacheKey);
    if (cachedData) {
      return c.json(cachedData);
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    apiCache.set(cacheKey, data, 900); // 15 mins cache
    return c.json(data);
  } catch (error) {
    console.error("Weather fetch error:", error);
    return c.json({ error: "Failed to retrieve weather data" }, 500);
  }
});

export default weatherRoute;
