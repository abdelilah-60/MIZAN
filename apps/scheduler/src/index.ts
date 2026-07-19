import cron from "node-cron";
import { prisma } from "./lib/prisma";
import { logger } from "./lib/logger";
import { processFieldGdd } from "./services/gdd";
import dotenv from "dotenv";

dotenv.config();

async function runScheduler() {
  logger.info("Scheduler job started. Running GDD calculations for all fields...");
  
  try {
    let stages: any[] = [];
    let chillingRequired = 350;
    
    try {
      const stagesRes = await fetch("http://localhost:8000/api/ontology/stages");
      if (stagesRes.ok) {
        stages = await stagesRes.json();
      }
      
      const chillingRes = await fetch("http://localhost:8000/api/ontology/chilling-requirement");
      if (chillingRes.ok) {
        const cData = await chillingRes.json();
        chillingRequired = cData.chilling_hours;
      }
      logger.info(`Successfully loaded GDD stages (${stages.length} stages) and chilling (${chillingRequired} hrs) from Memgraph.`);
    } catch (e: any) {
      logger.warn(`Failed to fetch parameters from Memgraph AI Service, applying default configuration fallbacks: ${e.message}`);
    }

    const fields = await prisma.field.findMany({
      select: {
        id: true,
        name: true,
        cropType: true,
        geoPolygon: true,
        plantingDate: true
      }
    });

    logger.info(`Found ${fields.length} fields to process.`);
    for (const field of fields) {
      try {
        await processFieldGdd(field, stages, chillingRequired);
      } catch (err: any) {
        logger.error(`Error processing GDD for field ${field.name} (${field.id}): ${err.message}`);
      }
    }
    logger.info("GDD processing run completed successfully.");
  } catch (error: any) {
    logger.error(`Failed to execute GDD scheduler job: ${error.message}`);
  }
}

// Setup Cron Job: 23:54 every night
cron.schedule("54 23 * * *", async () => {
  logger.info("Cron trigger: Daily GDD calculation...");
  await runScheduler();
});

// Run once immediately on start to ensure up-to-date values
runScheduler().then(() => {
  logger.info("Scheduler is active. Cron schedule: 23:54 daily.");
});
