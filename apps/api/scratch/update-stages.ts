import { prisma } from "../src/lib/prisma";

const VARIETIES_CONFIG: Record<string, { gddFlower: number; gddTotal: number }> = {
  "Picholine Marocaine": { gddFlower: 650, gddTotal: 3400 },
  "Haouzia": { gddFlower: 620, gddTotal: 3200 },
  "Menara": { gddFlower: 630, gddTotal: 3200 },
  "Dahbia": { gddFlower: 580, gddTotal: 2800 },
  "Meslala": { gddFlower: 560, gddTotal: 2600 },
  "Arbequina": { gddFlower: 550, gddTotal: 3000 }
};

function calculateStageForGdd(variety: string, gdd: number): { stage: string; nextStageGdd: number | null } {
  const config = VARIETIES_CONFIG[variety] || VARIETIES_CONFIG["Picholine Marocaine"];
  const flowerStart = config.gddFlower * 0.4;
  const nouaisonStart = config.gddFlower * 1.2;
  const croissanceStart = config.gddFlower * 1.6;
  const veraisonStart = config.gddTotal * 0.75;
  const recolteStart = config.gddTotal;

  if (gdd < flowerStart) return { stage: "DEBOURREMENT", nextStageGdd: flowerStart };
  else if (gdd < nouaisonStart) return { stage: "FLORAISON", nextStageGdd: nouaisonStart };
  else if (gdd < croissanceStart) return { stage: "NOUAISON", nextStageGdd: croissanceStart };
  else if (gdd < veraisonStart) return { stage: "CROISSANCE", nextStageGdd: veraisonStart };
  else if (gdd < recolteStart) return { stage: "VERAISON", nextStageGdd: recolteStart };
  else return { stage: "RECOLTE", nextStageGdd: null };
}

async function main() {
  console.log("Connecting to Supabase PostgreSQL database...");
  const fields = await prisma.field.findMany({
    include: {
      seasonSummary: true
    }
  });

  console.log(`Found ${fields.length} fields in database.`);

  for (const field of fields) {
    const summary = field.seasonSummary?.[0];
    if (summary) {
      const stageInfo = calculateStageForGdd(field.cropType, summary.accumulatedGdd);
      const gddToNextStage = stageInfo.nextStageGdd !== null ? Math.max(0, stageInfo.nextStageGdd - summary.accumulatedGdd) : null;
      
      console.log(`Field "${field.name}" (${field.cropType}): accumulatedGdd = ${summary.accumulatedGdd}, oldStage = ${summary.currentStage} -> NEW STAGE = ${stageInfo.stage}`);

      await prisma.fieldSeasonSummary.update({
        where: { id: summary.id },
        data: {
          currentStage: stageInfo.stage,
          gddToNextStage: gddToNextStage,
          lastUpdated: new Date()
        }
      });

      const latestDaily = await prisma.fieldDailyMetrics.findFirst({
        where: { fieldId: field.id },
        orderBy: { date: "desc" }
      });

      if (latestDaily) {
        await prisma.fieldDailyMetrics.update({
          where: { id: latestDaily.id },
          data: {
            currentStage: stageInfo.stage,
            gddToNextStage: gddToNextStage
          }
        });
      }
    }
  }

  console.log("Successfully updated all field stages in Supabase PostgreSQL!");
}

main()
  .catch((err) => {
    console.error("Error updating stages:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
