import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma";
import { fieldSchema, querySchema } from "../lib/validations";

type Variables = {
  jwtPayload: {
    userId: string;
  };
};

const fieldsRoute = new Hono<{ Variables: Variables }>();

// JWT is now handled globally in index.ts for /api/fields/*

// GET /  — Fetch all fields for farms owned by the authenticated user with pagination & search
fieldsRoute.get("/", zValidator("query", querySchema), async (c) => {
  const payload = c.get("jwtPayload");
  const userId = payload.userId;
  const { page, limit, search } = c.req.valid("query");

  const skip = (page - 1) * limit;

  const where: any = {
    farm: {
      userId: userId,
    },
  };
  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const [fields, total] = await Promise.all([
    prisma.field.findMany({
      where,
      skip,
      take: limit,
      include: {
        farm: {
          select: {
            name: true,
          },
        },
        seasonSummary: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.field.count({ where }),
  ]);

  return c.json({
    data: fields,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// POST /  — Create a new field with Zod validation
fieldsRoute.post("/", zValidator("json", fieldSchema), async (c) => {
  try {
    const validData = c.req.valid("json");
    const payload = c.get("jwtPayload");
    const userId = payload.userId;

    // Verify farm ownership directly in the query
    const farm = await prisma.farm.findFirst({ 
      where: { id: validData.farmId, userId } 
    });
    
    if (!farm) {
      return c.json({ error: "Farm not found or unauthorized" }, 404);
    }

    const { agronomicData, equipmentConfig, soilMetadata, ...restOfData } = validData;

    const field = await prisma.field.create({
      data: {
        ...restOfData,
        agronomicData: agronomicData ? (agronomicData as Prisma.InputJsonValue) : Prisma.JsonNull,
        equipmentConfig: equipmentConfig ? (equipmentConfig as Prisma.InputJsonValue) : Prisma.JsonNull,
        soilMetadata: soilMetadata ? (soilMetadata as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
      include: { farm: true },
    });

    // Auto-create relations if agronomic configs are sent on creation
    const agro = validData.agronomicData as Record<string, any> | undefined;
    if (agro) {
      try {
        const dripperFlowRate = parseFloat(agro["dripperFlowRate"] || agro["Débit du goutteur (L/h)"]);
        const drippersPerTree = parseInt(agro["drippersPerTree"] || agro["Nombre de goutteurs/arbre"], 10);
        const treeDensity = parseInt(agro["treeDensity"] || agro["Densité de Plantation"], 10);
        
        if (!isNaN(dripperFlowRate) && !isNaN(drippersPerTree) && !isNaN(treeDensity)) {
          await prisma.irrigationConfig.create({
            data: {
              fieldId: field.id,
              dripperFlowRate,
              drippersPerTree,
              treeDensity,
              efficiency: parseFloat(agro["efficiency"] || "0.85")
            }
          });
        }

        const ph = parseFloat(agro["ph"] || agro["pH du Sol"]);
        const organicMatter = parseFloat(agro["organicMatter"] || agro["Matière Organique (%)"] || agro["Matière Organique"]);
        const nitrogen = parseFloat(agro["nitrogen"] || agro["N (ppm)"] || agro["Nitrogène"]);
        const phosphorus = parseFloat(agro["phosphorus"] || agro["P (ppm)"] || agro["Phosphore"]);
        const potassium = parseFloat(agro["potassium"] || agro["K (ppm)"] || agro["Potassium"]);

        if (!isNaN(ph) || !isNaN(organicMatter) || !isNaN(nitrogen) || !isNaN(phosphorus) || !isNaN(potassium)) {
          await prisma.soilAnalysis.create({
            data: {
              fieldId: field.id,
              analysisDate: new Date(),
              ph: isNaN(ph) ? null : ph,
              organicMatter: isNaN(organicMatter) ? null : organicMatter,
              nitrogen: isNaN(nitrogen) ? null : nitrogen,
              phosphorus: isNaN(phosphorus) ? null : phosphorus,
              potassium: isNaN(potassium) ? null : potassium
            }
          });
        }

        const targetYield = parseFloat(agro["targetYield"] || agro["Rendement Visé (t/ha)"]);
        if (!isNaN(targetYield)) {
          await prisma.yieldConfig.create({
            data: {
              fieldId: field.id,
              targetYield,
              bearingStatus: agro["bearingStatus"] || agro["Statut de la charge (Alternance)"] || "NORMAL"
            }
          });
        }
      } catch (err) {
        console.error("Failed to auto-create agronomic configs on field creation:", err);
      }
    }

    // Spawn background GDD calculation for the newly created field immediately
    const { exec } = require("child_process");
    exec(`bun run src/run-single.ts ${field.id}`, { cwd: "../scheduler" }, (err: any, stdout: any, stderr: any) => {
      if (err) {
        console.error(`Failed to trigger immediate GDD calculation for field ${field.id}:`, err);
      } else {
        console.log(`Triggered immediate GDD calculation for field ${field.id}.`);
      }
    });

    return c.json(field, 201);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// DELETE /:id — Remove a field
fieldsRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const payload = c.get("jwtPayload");
  const userId = payload.userId;

  try {
    const field = await prisma.field.findFirst({
      where: { id, farm: { userId } }
    });
    
    if (!field) return c.json({ error: "Field not found or unauthorized" }, 404);

    await prisma.field.delete({ where: { id: field.id } });
    return c.json({ success: true, message: "Field and all related data deleted" }, 200);
  } catch (error) {
    console.error("Error deleting field:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default fieldsRoute;
