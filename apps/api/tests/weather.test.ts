import { describe, expect, test } from "bun:test";
import { app } from "../src/index";

describe("Weather API", () => {
  test("GET /api/weather should return 401 if no JWT token is provided", async () => {
    const res = await app.request("/api/weather?lat=33&lon=-7");
    expect(res.status).toBe(401);
  });

  test("GET /api/weather should return 400 if lat/lon are missing (with mocked token)", async () => {
    // Generate a quick valid JWT just to pass the 401 check
    // We can use hono/jwt sign, but since we just need to test validation, we could mock it.
    // However, the test requires Zod to fail, which runs AFTER JWT middleware.
    // If we don't pass a valid token, we'll get 401 instead of 400.
    // To properly test the 400 without setting up a full auth token process in the test,
    // we can either generate a token here, or simply test the endpoint logic independently.
    
    // Let's generate a valid token using the same secret.
    const { sign } = await import("hono/jwt");
    const secret = process.env.JWT_SECRET || "super-secret-mizan";
    const token = await sign({ userId: "test-user" }, secret);

    const res = await app.request("/api/weather", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Should fail validation since lat and lon are missing
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
  });
});
