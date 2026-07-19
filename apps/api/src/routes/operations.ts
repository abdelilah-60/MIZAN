import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";



type Variables = {
  jwtPayload: {
    userId: string;
    email: string;
  };
};

const app = new Hono<{ Variables: Variables }>();

// JWT is now handled globally in index.ts for /api/operations/*

const createOperationSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("IRRIGATION"),
    fieldId: z.string().uuid(),
    date: z.string().datetime().optional(),
    metadata: z.object({ volume: z.number(), unit: z.string() })
  }),
  z.object({
    type: z.literal("FERTILIZER"),
    fieldId: z.string().uuid(),
    date: z.string().datetime().optional(),
    metadata: z.object({
      productName: z.string().optional(),
      fertilizerType: z.string().optional(),
      quantity: z.number(),
      unit: z.string(),
      n_percent: z.number().optional(),
      p_percent: z.number().optional(),
      k_percent: z.number().optional(),
      net_n_per_tree_g: z.number().optional(),
      net_p_per_tree_g: z.number().optional(),
      net_k_per_tree_g: z.number().optional()
    })
  }),
  z.object({
    type: z.literal("PESTICIDE"),
    fieldId: z.string().uuid(),
    date: z.string().datetime().optional(),
    metadata: z.object({
      productName: z.string().optional(),
      activeIngredient: z.string().optional(),
      targetPest: z.string().optional(),
      quantity: z.number(),
      unit: z.string(),
      darDays: z.number().optional(),
      harvestBlockedUntil: z.string().optional()
    })
  }),
  z.object({
    type: z.literal("FUNGICIDE"),
    fieldId: z.string().uuid(),
    date: z.string().datetime().optional(),
    metadata: z.object({
      productName: z.string().optional(),
      activeIngredient: z.string().optional(),
      targetPest: z.string().optional(),
      quantity: z.number(),
      unit: z.string(),
      darDays: z.number().optional(),
      harvestBlockedUntil: z.string().optional()
    })
  }),
  z.object({
    type: z.literal("PRUNING"),
    fieldId: z.string().uuid(),
    date: z.string().datetime().optional(),
    metadata: z.object({ technique: z.string(), intensityLevel: z.string() })
  }),
  z.object({
    type: z.literal("HARVEST"),
    fieldId: z.string().uuid(),
    date: z.string().datetime().optional(),
    metadata: z.any()
  }),
  z.object({
    type: z.literal("TILLAGE"),
    fieldId: z.string().uuid(),
    date: z.string().datetime().optional(),
    metadata: z.object({
      technique: z.string(),
      depth: z.string().optional()
    })
  }),
  z.object({
    type: z.literal("ORGANIC_AMENDMENT"),
    fieldId: z.string().uuid(),
    date: z.string().datetime().optional(),
    metadata: z.object({
      fertilizerType: z.string(),
      state: z.string(),
      quantity: z.number(),
      unit: z.string()
    })
  }),
  z.object({
    type: z.literal("WEEDING"),
    fieldId: z.string().uuid(),
    date: z.string().datetime().optional(),
    metadata: z.object({
      method: z.string(),
      activeIngredient: z.string().optional(),
      quantity: z.number().optional(),
      unit: z.string().optional()
    })
  })
]);

app.post("/", zValidator("json", createOperationSchema, (result, c) => {
  if (!result.success) {
    return c.json({ error: "Invalid metadata or operation format", details: result.error.issues }, 400);
  }
}), async (c) => {
  const { type, fieldId, date, metadata } = c.req.valid("json");
  const payload = c.get("jwtPayload");

  try {
    const field = await prisma.field.findFirst({
      where: { id: fieldId, farm: { userId: payload.userId } }
    });

    if (!field) {
      return c.json({ error: "Field not found or unauthorized" }, 404);
    }

    const operation = await prisma.operation.create({
      data: {
        type,
        fieldId,
        metadata: metadata as Prisma.InputJsonValue,
        date: date ? new Date(date) : undefined
      }
    });

    return c.json(operation, 201);
  } catch (error) {
    console.error("Error creating operation:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.get("/:fieldId", async (c) => {
  const fieldId = c.req.param("fieldId");
  const payload = c.get("jwtPayload");

  try {
    const field = await prisma.field.findFirst({
      where: { id: fieldId, farm: { userId: payload.userId } }
    });

    if (!field) {
      return c.json({ error: "Field not found or unauthorized" }, 404);
    }

    const operations = await prisma.operation.findMany({
      where: { fieldId },
      orderBy: { date: "desc" },
      take: 10
    });

    return c.json({ data: operations });
  } catch (error) {
    console.error("Error fetching operations:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// DELETE /:id — Remove an operation
app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const payload = c.get("jwtPayload");

  try {
    const operation = await prisma.operation.findFirst({
      where: { id, field: { farm: { userId: payload.userId } } }
    });

    if (!operation) return c.json({ error: "Operation not found or unauthorized" }, 404);

    await prisma.operation.delete({ where: { id: operation.id } });
    return c.json({ success: true, message: "Operation deleted" }, 200);
  } catch (error) {
    console.error("Error deleting operation:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default app;
