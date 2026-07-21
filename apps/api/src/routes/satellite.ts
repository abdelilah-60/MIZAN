import { Hono } from "hono";

const AI_BASE_URL = process.env.AI_SERVICE_URL || "https://mizan-ai-tau.vercel.app";
const AI_TIMEOUT_MS = parseInt(process.env.AI_TIMEOUT_MS || "15000", 10);

const satelliteRoute = new Hono();

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
    return c.json(data);
  } catch (error: any) {
    console.error("Gateway error proxying satellite request:", error);
    return c.json({ error: "Internal Gateway Error Calling Satellite AI Service" }, 500);
  }
});

export default satelliteRoute;
