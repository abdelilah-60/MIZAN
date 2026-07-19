import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "../lib/prisma";
import { registerSchema, loginSchema } from "../lib/validations";
import * as bcrypt from "bcryptjs";
import { sign } from "hono/jwt";

const authRoute = new Hono();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-mizan";

// POST /register
authRoute.post("/register", zValidator("json", registerSchema), async (c) => {
  try {
    const validData = c.req.valid("json");

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validData.email },
    });

    if (existingUser) {
      return c.json({ error: "Email already registered" }, 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const user = await prisma.user.create({
      data: {
        fullName: validData.fullName,
        email: validData.email,
        password: hashedPassword,
        phoneNumber: validData.phoneNumber,
        role: "USER",
        farms: {
          create: {
            name: validData.farmName || `Ferme de ${validData.fullName} (ضيعة ${validData.fullName})`,
          },
        },
      },
    });

    // Don't return the password
    const { password, ...userWithoutPassword } = user;
    return c.json(userWithoutPassword, 201);
  } catch (error) {
    console.error("Register error:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// POST /login
authRoute.post("/login", zValidator("json", loginSchema), async (c) => {
  try {
    const validData = c.req.valid("json");

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validData.email },
    });

    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Verify password
    const isValid = await bcrypt.compare(validData.password, user.password);
    if (!isValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Generate JWT
    const payload = {
      userId: user.id,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
    };
    const token = await sign(payload, JWT_SECRET);

    return c.json({ token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } }, 200);
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default authRoute;
