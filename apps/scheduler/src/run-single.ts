import { prisma } from "./lib/prisma";
import { processFieldGdd } from "./services/gdd";

async function main() {
  const fieldId = process.argv[2];
  if (!fieldId) {
    console.error("Missing fieldId");
    process.exit(1);
  }

  console.log(`Starting immediate GDD calculation for field ID: ${fieldId}`);

  const field = await prisma.field.findUnique({
    where: { id: fieldId },
    select: {
      id: true,
      name: true,
      cropType: true,
      geoPolygon: true,
      plantingDate: true
    }
  });

  if (!field) {
    console.error("Field not found in database");
    process.exit(1);
  }

  // Fetch GDD stages and chilling requirements
  let stages: any[] = [];
  let chillingRequired = 350;
  
  try {
    const aiBaseUrl = process.env.AI_SERVICE_URL || "https://mizan-ai-tau.vercel.app";
    const stagesRes = await fetch(`${aiBaseUrl}/api/ontology/stages`);
    if (stagesRes.ok) {
      stages = await stagesRes.json();
    }
    
    const chillingRes = await fetch(`${aiBaseUrl}/api/ontology/chilling-requirement`);
    if (chillingRes.ok) {
      const cData = await chillingRes.json();
      chillingRequired = cData.chilling_hours;
    }
  } catch (e: any) {
    console.warn("Failed to fetch stages from Memgraph, using defaults:", e.message);
  }

  await processFieldGdd(field, stages, chillingRequired);
  console.log(`Successfully completed GDD calculations for field: ${field.name}`);
}

main().catch((err) => {
  console.error("Execution failed:", err);
  process.exit(1);
});
