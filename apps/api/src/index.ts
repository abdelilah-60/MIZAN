import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import { swaggerUI } from "@hono/swagger-ui";
import { prisma } from "./lib/prisma";
import usersRoute from "./routes/users";
import farmsRoute from "./routes/farms";
import fieldsRoute from "./routes/fields";

import authRoute from "./routes/auth";
import weatherRoute from "./routes/weather";
import insightsRoute from "./routes/insights";
import operationsRoute from "./routes/operations";
import ontologyRoute from "./routes/ontology";
import agronomyRoute from "./routes/agronomy";
import adminRoute from "./routes/admin";
import satelliteRoute from "./routes/satellite";
import { reportsRoute } from "./routes/reports";
import { notificationsRoute } from "./routes/notifications";
import { openApiSpec } from "./docs/swagger";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());

import { HTTPException } from "hono/http-exception";

// Global Error Handlers
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }
  console.error(`[Unhandled Error] ${err.message}`, err.stack);
  return c.json(
    {
      error: "Internal Server Error",
      code: "INTERNAL_ERROR",
      message: process.env.NODE_ENV === "production" ? undefined : err.message,
    },
    500
  );
});

app.notFound((c) => {
  return c.json({ error: "Endpoint Not Found", code: "NOT_FOUND" }, 404);
});

// 1. PUBLIC ROUTES (Directly on main app)
app.get("/", (c) => {
  return c.text("Welcome to Mizan API 🚀");
});

app.get("/api/health", async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return c.json({ status: "ok", db: "connected" });
  } catch (error) {
    return c.json({ status: "error", db: "disconnected" }, 500);
  }
});

// OpenAPI & Swagger Docs
app.get("/api/docs/json", (c) => c.json(openApiSpec));
app.get("/api/docs", swaggerUI({ url: "/api/docs/json" }));

app.route("/api/auth", authRoute);

// 2. PROTECTED ZONE
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-mizan";
const protectedApi = new Hono();

// Apply JWT middleware to this entire group
protectedApi.use("/*", jwt({ secret: JWT_SECRET, alg: "HS256" }));

// Mount Sub-Routers into the Protected Zone
protectedApi.route("/users", usersRoute);
protectedApi.route("/farms", farmsRoute);
protectedApi.route("/fields", fieldsRoute);
protectedApi.route("/weather", weatherRoute);
protectedApi.route("/insights", insightsRoute);
protectedApi.route("/operations", operationsRoute);
protectedApi.route("/ontology", ontologyRoute);
protectedApi.route("/agronomy", agronomyRoute);
protectedApi.route("/admin", adminRoute);
protectedApi.route("/satellite", satelliteRoute);
protectedApi.route("/reports", reportsRoute);
protectedApi.route("/notifications", notificationsRoute);

// 3. MOUNT PROTECTED ZONE TO MAIN APP
app.route("/api", protectedApi);

// Server startup
const port = Number(process.env.PORT) || 3000;

console.log(`🌱 Mizan API running on http://localhost:${port}`);

export { app };

export default {
  port,
  hostname: "0.0.0.0",
  fetch: app.fetch,
};
