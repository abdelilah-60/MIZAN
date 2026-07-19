import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "../lib/prisma";
import { farmSchema, querySchema } from "../lib/validations";

type Variables = {
  jwtPayload: {
    userId: string;
  };
};

const farmsRoute = new Hono<{ Variables: Variables }>();

// JWT is now handled globally in index.ts for /api/farms/*

// GET /  — Fetch all farms for the authenticated user with pagination & search
farmsRoute.get("/", zValidator("query", querySchema), async (c) => {
  const payload = c.get("jwtPayload");
  const userId = payload.userId;
  const { page, limit, search } = c.req.valid("query");

  const skip = (page - 1) * limit;

  const where: any = { userId };
  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const [farms, total] = await Promise.all([
    prisma.farm.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: {
          select: {
            fullName: true,
            phoneNumber: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.farm.count({ where }),
  ]);

  return c.json({
    data: farms,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// POST /  — Create a new farm with Zod validation
farmsRoute.post("/", zValidator("json", farmSchema), async (c) => {
  try {
    const validData = c.req.valid("json");
    const payload = c.get("jwtPayload");
    const userId = payload.userId;

    // We no longer use validData.userId since it comes from the token,
    // but schema has it. Let's override it or just use the token one.
    // Assuming the frontend still sends it or we can just ignore it and use token.
    const farm = await prisma.farm.create({
      data: {
        name: validData.name,
        userId: userId,
      },
      include: { user: true },
    });

    return c.json(farm, 201);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default farmsRoute;
