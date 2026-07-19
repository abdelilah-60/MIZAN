import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const AI_BASE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";
const AI_TIMEOUT_MS = parseInt(process.env.AI_TIMEOUT_MS || "5000", 10);

const adminRoute = new Hono();

// Enforce Developer role check on all admin API calls
adminRoute.use("/*", async (c, next) => {
  const payload = c.get("jwtPayload") as any;
  if (payload?.role !== "DEVELOPER") {
    return c.json({ error: "Access Denied: Developers Only (حظر: للمطورين فقط)" }, 403);
  }
  await next();
});

adminRoute.delete("/varieties/:name", async (c) => {
  const name = c.req.param("name");

  try {
    const fieldsCount = await prisma.field.count({
      where: { cropType: name }
    });

    if (fieldsCount > 0) {
      return c.json({
        error: `Cannot delete variety '${name}' because it is in use by ${fieldsCount} active fields.`
      }, 400);
    }

    const url = `${AI_BASE_URL}/api/admin/varieties/${encodeURIComponent(name)}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(AI_TIMEOUT_MS),
    });

    const data = await res.json();
    return c.json(data, res.status as any);
  } catch (error) {
    console.error(`Error deleting variety ${name}:`, error);
    return c.json({ error: "Internal Gateway Error" }, 500);
  }
});

adminRoute.all("/*", async (c) => {
  // c.req.path contains the full URL path, e.g. /api/admin/varieties
  // We want to forward it exactly to the AI service
  const path = c.req.path;
  const queryString = c.req.url.includes("?") ? "?" + c.req.url.split("?")[1] : "";
  const url = `${AI_BASE_URL}${path}${queryString}`;

  const method = c.req.method;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  let body: string | undefined = undefined;
  if (method !== "GET" && method !== "HEAD") {
    try {
      body = await c.req.text();
    } catch (e) {
      console.warn("Failed to read request body text:", e);
    }
  }

  try {
    const res = await fetch(url, {
      method,
      headers,
      body,
      signal: AbortSignal.timeout(AI_TIMEOUT_MS),
    });

    const data = await res.json();
    return c.json(data, res.status as any);
  } catch (error) {
    console.error(`Gateway error calling AI admin path ${url}:`, error);
    return c.json({ error: "Internal Gateway Error Calling AI Service" }, 500);
  }
});

export default adminRoute;
