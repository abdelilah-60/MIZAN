import { prisma } from "./lib/prisma";
import * as bcrypt from "bcryptjs";

async function createDeveloper() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error("Usage: bun run src/create-developer.ts <email> <fullName> <password> [phoneNumber]");
    process.exit(1);
  }

  const [email, fullName, password, phoneNumber] = args;

  try {
    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      console.log(`[!] User with email ${email} already exists. Promoting to DEVELOPER...`);
      await prisma.user.update({
        where: { email },
        data: { role: "DEVELOPER" },
      });
      console.log(`[OK] User ${email} promoted successfully to DEVELOPER!`);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        phoneNumber: phoneNumber || null,
        role: "DEVELOPER",
        farms: {
          create: {
            name: `Ferme de ${fullName} (ضيعة ${fullName})`,
          },
        },
      },
    });

    console.log(`[OK] Developer account created successfully!`);
    console.log(` - Name: ${user.fullName}`);
    console.log(` - Email: ${user.email}`);
    console.log(` - Role: ${user.role}`);
  } catch (error) {
    console.error("Error creating developer:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createDeveloper();
