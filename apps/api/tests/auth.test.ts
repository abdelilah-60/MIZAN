import { describe, expect, test } from "bun:test";
import { app } from "../src/index";

describe("Auth API", () => {
  test("POST /api/auth/register should return 400 for missing fields", async () => {
    const res = await app.request("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "invalid-email" }), // missing password & fullName
    });

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false); // Zod validator returns success: false on error
  });

  test("POST /api/auth/login should return 401 for incorrect password or non-existent user", async () => {
    const res = await app.request("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "fake@user.com", password: "wrongpassword" }),
    });

    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("Invalid credentials");
  });
});
