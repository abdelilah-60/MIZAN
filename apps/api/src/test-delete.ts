import { prisma } from "./lib/prisma";

async function main() {
  const fields = await prisma.field.findMany({
    where: { name: "TALLA" }
  });
  console.log(`Found ${fields.length} fields named 'TALLA'`);

  for (const field of fields) {
    console.log(`Attempting to delete 'TALLA' field: ${field.id}`);
    try {
      await prisma.field.delete({
        where: { id: field.id }
      });
      console.log(`SUCCESS: Deleted field ${field.id}`);
    } catch (e: any) {
      console.error(`FAILURE: Failed to delete field ${field.id}:`, e.message || e);
    }
  }
}

main().catch(console.error);
