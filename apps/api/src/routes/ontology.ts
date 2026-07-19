import { Hono } from "hono";
import { CircuitBreaker } from "../lib/circuit-breaker";

const AI_BASE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";
const AI_TIMEOUT_MS = parseInt(process.env.AI_TIMEOUT_MS || "5000", 10);

const ontologyCircuitBreaker = new CircuitBreaker();

const ontologyRoute = new Hono();

ontologyRoute.get("/operation-requirements", async (c) => {
  try {
    const crop_name = c.req.query("crop_name");
    const operation_type = c.req.query("operation_type");

    if (!crop_name || !operation_type) {
      return c.json({ error: "Missing required query parameters" }, 400);
    }

    const data = await ontologyCircuitBreaker.call(
      async () => {
        const res = await fetch(
          `${AI_BASE_URL}/api/ontology/operation-requirements?crop_name=${encodeURIComponent(crop_name)}&operation_type=${encodeURIComponent(operation_type)}`,
          { signal: AbortSignal.timeout(AI_TIMEOUT_MS) }
        );
        if (!res.ok) throw new Error(`AI responded with ${res.status}`);
        return await res.json();
      },
      () => []
    );

    return c.json(data);
  } catch (error) {
    console.error("Gateway error fetching ontology:", error);
    return c.json({ error: "Internal Gateway Error" }, 500);
  }
});

ontologyRoute.get("/field-requirements", async (c) => {
  try {
    const crop_name = c.req.query("crop_name");
    if (!crop_name) return c.json({ error: "Missing crop_name" }, 400);

    const data = await ontologyCircuitBreaker.call(
      async () => {
        const res = await fetch(
          `${AI_BASE_URL}/api/ontology/field-requirements?crop_name=${encodeURIComponent(crop_name)}`,
          { signal: AbortSignal.timeout(AI_TIMEOUT_MS) }
        );
        if (!res.ok) throw new Error(`AI responded with ${res.status}`);
        return await res.json();
      },
      () => []
    );

    return c.json(data);
  } catch (error) {
    console.error("Gateway error fetching field requirements:", error);
    return c.json({ error: "Internal Gateway Error" }, 500);
  }
});

export default ontologyRoute;
