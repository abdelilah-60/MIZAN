import { test, describe, expect } from "bun:test";
import { prisma } from "../src/lib/prisma";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";

const API_URL = "http://localhost:3000";

describe("End-to-End Microservices Pipeline", () => {
  test("Sequential Flow: Auth -> Metadata -> Write -> Insights", async () => {
    let token: string;
    let testFieldId: string;

    // 1. Find or create a test user
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: { email: "test-integration@example.com", fullName: "Test User", password: await bcrypt.hash("password", 10) }
      });
    }

    // 2. Find or create a farm
    let farm = await prisma.farm.findFirst({ where: { userId: user.id } });
    if (!farm) {
      farm = await prisma.farm.create({
        data: { name: "Test Farm", userId: user.id }
      });
    }

    // 3. Find or create a field
    let field = await prisma.field.findFirst({ where: { farmId: farm.id } });
    if (!field) {
      field = await prisma.field.create({
        data: { name: "Test Field", cropType: "Olive", area: 10, farmId: farm.id, geoPolygon: "[]" }
      });
    }
    testFieldId = field.id;
    token = await sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "super-secret-mizan");
    expect(token).toBeDefined();
    const resB = await fetch(`${API_URL}/api/ontology/operation-requirements?crop_name=Olive&operation_type=IRRIGATION`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (resB.status !== 200) {
      console.error("Step B Failed:", resB.status, await resB.text());
    }
    expect(resB.status).toBe(200);

    // --- Step C: Database Write ---
    const payloadC = {
      type: "IRRIGATION",
      fieldId: testFieldId,
      metadata: { volume: 50, unit: "Liters" }
    };
    const resC = await fetch(`${API_URL}/api/operations`, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payloadC)
    });
    if (resC.status < 200 || resC.status >= 300) {
      console.error("Step C Failed:", resC.status, await resC.text());
    }
    expect(resC.status === 201 || resC.status === 200).toBe(true);

    // --- Step D: Context-Aware AI ---
    const resD = await fetch(`${API_URL}/api/insights/${testFieldId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (resD.status !== 200) {
      console.error("Step D Failed:", resD.status, await resD.text());
    }
    expect(resD.status).toBe(200);
  });
});
