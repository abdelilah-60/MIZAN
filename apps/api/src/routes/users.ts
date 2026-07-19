import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "../lib/prisma";
import { userSchema } from "../lib/validations";

const usersRoute = new Hono();

// GET /  — Fetch all users
usersRoute.get("/", async (c) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" },
  });
  return c.json(users);
});


export default usersRoute;
