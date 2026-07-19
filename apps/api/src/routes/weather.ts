import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const weatherRoute = new Hono();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-mizan";

// JWT is now handled globally in index.ts for /api/weather/*

const weatherQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
});

// GET /api/weather
weatherRoute.get("/", zValidator("query", weatherQuerySchema), async (c) => {
  try {
    const { lat, lon } = c.req.valid("query");

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.error("Weather fetch error:", error);
    return c.json({ error: "Failed to retrieve weather data" }, 500);
  }
});

export default weatherRoute;
