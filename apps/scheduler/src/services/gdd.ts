import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";
import { fetchWeatherData, DailyWeatherData } from "./weather";
import { VARIETIES, getStageForGdd } from "../config/varieties";
import centroid from "@turf/centroid";
import { polygon } from "@turf/helpers";

/**
 * Helper to format Date objects as YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Calculates GDD for a single day using Cut-off method (upper threshold 35C)
 */
export function calculateGddDaily(tmax: number, tmin: number, baseTemp: number = 10): number {
  // Olive trees stop metabolic growth above 35°C
  const boundedTmax = Math.min(tmax, 35);
  const boundedTmin = Math.min(tmin, 35);
  const avg = (boundedTmax + boundedTmin) / 2;
  return Math.max(avg - baseTemp, 0);
}

/**
 * Calculates chilling units using the Utah Chilling Model
 */
export function calculateChillingHoursToday(hourlyTemps: number[]): number {
  let units = 0;
  for (const temp of hourlyTemps) {
    if (temp <= 1.4) {
      units += 0;
    } else if (temp <= 2.4) {
      units += 0.5;
    } else if (temp <= 9.1) {
      units += 1.0;
    } else if (temp <= 12.4) {
      units += 0.5;
    } else if (temp <= 15.9) {
      units += 0;
    } else if (temp <= 18.0) {
      units -= 0.5;
    } else {
      units -= 1.0;
    }
  }
  return Math.max(0, units);
}

interface FieldWithSummary {
  id: string;
  name: string;
  cropType: string;
  geoPolygon: any;
  plantingDate: Date | null;
}

/**
 * Processes GDD and chilling hours for a given field from a start date to yesterday
 */
export async function processFieldGdd(
  field: FieldWithSummary,
  stages: { name: string; min_gdd: number; max_gdd: number; order: number }[],
  chillingRequired: number,
  targetYear: number = 2026
) {
  logger.info(`Processing GDD for field "${field.name}" (Crop: ${field.cropType})`);

  // Parse geoPolygon to get latitude/longitude
  let lon = 0;
  let lat = 0;
  try {
    const geoData: any = typeof field.geoPolygon === 'string'
      ? JSON.parse(field.geoPolygon as string)
      : field.geoPolygon;

    const coords = geoData.coordinates ? geoData.coordinates : geoData;
    const poly = polygon(coords);
    const center = centroid(poly);

    lon = center.geometry.coordinates[0];
    lat = center.geometry.coordinates[1];
  } catch (e: any) {
    logger.error(`Invalid geoPolygon format for field ${field.name}: ${e.message}`);
    return;
  }

  // Find the latest daily metric we have for this field
  const latestMetric = await prisma.fieldDailyMetrics.findFirst({
    where: { fieldId: field.id, season: targetYear },
    orderBy: { date: "desc" }
  });

  // Yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  // Define calculation start date
  let startDateStr = `${targetYear - 1}-11-01`; // Start chilling accumulation from Nov 1st of previous year
  let accumulatedGdd = 0;
  let accumulatedChilling = 0;
  let bioFixReached = false;
  let bioFixDate: Date | null = null;
  let currentStage = "DORMANCE";
  let gddToNextStage: number | null = null;

  if (latestMetric) {
    // If we already have metrics, we start from the day after the latest metric
    const nextDay = new Date(latestMetric.date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    if (nextDay > yesterday) {
      logger.info(`Field "${field.name}" is already up to date.`);
      return;
    }
    
    startDateStr = formatDate(nextDay);
    accumulatedGdd = latestMetric.accumulatedGdd;
    accumulatedChilling = latestMetric.accumulatedChilling;
    bioFixReached = latestMetric.bioFixReached;
    currentStage = latestMetric.currentStage || "DORMANCE";
    gddToNextStage = latestMetric.gddToNextStage;
    
    // Retrieve bioFixDate from season summary if available
    const summary = await prisma.fieldSeasonSummary.findUnique({
      where: {
        fieldId_season: { fieldId: field.id, season: targetYear }
      }
    });
    if (summary && summary.bioFixDate) {
      bioFixDate = summary.bioFixDate;
    }
  } else {
    // No metrics yet - start from Nov 1st of previous year or plantingDate (whichever is later)
    const defaultStart = new Date(`${targetYear - 1}-11-01`);
    if (field.plantingDate && new Date(field.plantingDate) > defaultStart) {
      startDateStr = formatDate(field.plantingDate);
    } else {
      startDateStr = `${targetYear - 1}-11-01`;
    }
    logger.info(`No existing metrics. Starting calculation from ${startDateStr}`);
  }

  // Fetch weather data for the period
  let weatherData: DailyWeatherData[] = [];
  try {
    weatherData = await fetchWeatherData(lat, lon, startDateStr, formatDate(yesterday));
  } catch (err: any) {
    logger.error(`Failed to fetch weather data for field ${field.name}: ${err.message}`);
    return;
  }

  logger.info(`Processing ${weatherData.length} daily metrics for field "${field.name}"...`);

  // Track seasonal stats for summary updates
  let totalPrecipitation = latestMetric?.accumulatedGdd ? (await prisma.fieldSeasonSummary.findUnique({
    where: { fieldId_season: { fieldId: field.id, season: targetYear } }
  }))?.totalPrecipitation || 0 : 0;

  let tempSum = 0;
  let tempDaysCount = 0;

  // Growing season start for precipitation accumulation (from Nov 1st)
  const growingSeasonStart = new Date(`${targetYear - 1}-11-01`);

  for (const dayData of weatherData) {
    const currentDate = new Date(dayData.date);
    const gddDaily = calculateGddDaily(dayData.tmax, dayData.tmin);
    const chillingHoursToday = calculateChillingHoursToday(dayData.hourlyTemps);

    // Accumulate season precipitation
    if (currentDate >= growingSeasonStart) {
      totalPrecipitation += dayData.precipitation;
      tempSum += (dayData.tmax + dayData.tmin) / 2;
      tempDaysCount++;
    }

    // Chilling accumulation
    if (!bioFixReached) {
      accumulatedChilling += chillingHoursToday;
      const isPastCutoff = currentDate.getMonth() >= 2; // Force break dormancy starting March 1st if not met yet
      if (accumulatedChilling >= chillingRequired || isPastCutoff) {
        bioFixReached = true;
        bioFixDate = currentDate;
        if (isPastCutoff && accumulatedChilling < chillingRequired) {
          logger.info(`[BIO-FIX FORCED] Field "${field.name}" forced bio-fix on ${dayData.date} because it passed March 1st (Chilling: ${accumulatedChilling}/${chillingRequired} hrs)`);
        } else {
          logger.info(`[BIO-FIX] Field "${field.name}" reached chilling requirement of ${chillingRequired} hrs on ${dayData.date}`);
        }
      }
    }

    // GDD accumulation (only after Bio-Fix)
    if (bioFixReached) {
      accumulatedGdd += gddDaily;
    }

    // Determine current stage dynamically from Memgraph Stage boundaries
    currentStage = "DORMANCE";
    gddToNextStage = null;

    if (!bioFixReached) {
      currentStage = "DORMANCE";
      gddToNextStage = 0;
    } else {
      if (stages && stages.length > 0) {
        const activeStage = stages.find(s => accumulatedGdd >= s.min_gdd && accumulatedGdd < s.max_gdd);
        if (activeStage) {
          currentStage = activeStage.name;
          gddToNextStage = Math.max(0, activeStage.max_gdd - accumulatedGdd);
        } else {
          // If accumulatedGdd exceeds the highest max_gdd
          const maxStage = stages[stages.length - 1];
          if (accumulatedGdd >= maxStage.max_gdd) {
            currentStage = "RECOLTE";
            gddToNextStage = null;
          } else {
            currentStage = "DORMANCE";
            gddToNextStage = 0;
          }
        }
      } else {
        // Fallback to varieties config
        const stageInfo = getStageForGdd(field.cropType, accumulatedGdd, bioFixReached);
        currentStage = stageInfo.stage;
        gddToNextStage = stageInfo.nextStageGdd !== null ? Math.max(0, stageInfo.nextStageGdd - accumulatedGdd) : null;
      }
    }

    // Save Daily Metric
    await prisma.fieldDailyMetrics.upsert({
      where: {
        fieldId_date: {
          fieldId: field.id,
          date: currentDate
        }
      },
      update: {
        tmax: dayData.tmax,
        tmin: dayData.tmin,
        humidity: dayData.humidity,
        precipitation: dayData.precipitation,
        gddDaily,
        accumulatedGdd,
        chillingHoursToday,
        accumulatedChilling,
        bioFixReached,
        currentStage,
        gddToNextStage
      },
      create: {
        fieldId: field.id,
        date: currentDate,
        season: targetYear,
        tmax: dayData.tmax,
        tmin: dayData.tmin,
        humidity: dayData.humidity,
        precipitation: dayData.precipitation,
        gddDaily,
        accumulatedGdd,
        chillingHoursToday,
        accumulatedChilling,
        bioFixReached,
        currentStage,
        gddToNextStage
      }
    });
  }

  // Calculate days in current stage for the summary
  let daysInCurrentStage = 1;
  if (weatherData.length > 0) {
    const latestDaily = await prisma.fieldDailyMetrics.findFirst({
      where: { fieldId: field.id, season: targetYear, currentStage },
      orderBy: { date: "asc" }
    });
    if (latestDaily) {
      const msDiff = yesterday.getTime() - latestDaily.date.getTime();
      daysInCurrentStage = Math.max(1, Math.floor(msDiff / (1000 * 60 * 60 * 24)) + 1);
    }
  }

  // Average temperature
  const avgTemp = tempDaysCount > 0 ? tempSum / tempDaysCount : null;

  // Estimate flowering and harvest dates based on historical speed
  let predictedFloweringDate: Date | null = null;
  let predictedHarvestDate: Date | null = null;

  const configFlowerGdd = stages.find(s => s.name === "FLORAISON")?.max_gdd || 700;
  const configTotalGdd = stages.find(s => s.name === "RECOLTE")?.max_gdd || 3200;

  if (bioFixReached && accumulatedGdd > 0 && weatherData.length > 0) {
    const totalDaysSinceBioFix = bioFixDate ? Math.max(1, Math.floor((yesterday.getTime() - bioFixDate.getTime()) / (1000 * 60 * 60 * 24))) : 1;
    const avgGddPerDay = accumulatedGdd / totalDaysSinceBioFix;

    if (avgGddPerDay > 0) {
      if (accumulatedGdd < configFlowerGdd) {
        const daysToFlower = Math.ceil((configFlowerGdd - accumulatedGdd) / avgGddPerDay);
        predictedFloweringDate = new Date(yesterday);
        predictedFloweringDate.setDate(predictedFloweringDate.getDate() + daysToFlower);
      }
      if (accumulatedGdd < configTotalGdd) {
        const daysToHarvest = Math.ceil((configTotalGdd - accumulatedGdd) / avgGddPerDay);
        predictedHarvestDate = new Date(yesterday);
        predictedHarvestDate.setDate(predictedHarvestDate.getDate() + daysToHarvest);
      }
    }
  }

  // Update Season Summary (O(1) dashboard cache)
  await prisma.fieldSeasonSummary.upsert({
    where: {
      fieldId_season: {
        fieldId: field.id,
        season: targetYear
      }
    },
    update: {
      currentStage,
      accumulatedGdd,
      accumulatedChilling,
      bioFixReached,
      bioFixDate,
      gddToNextStage,
      daysInCurrentStage,
      lastUpdated: new Date(),
      predictedFloweringDate,
      predictedHarvestDate,
      totalPrecipitation: { increment: totalPrecipitation },
      avgTemperature: avgTemp
    },
    create: {
      fieldId: field.id,
      season: targetYear,
      currentStage,
      accumulatedGdd,
      accumulatedChilling,
      bioFixReached,
      bioFixDate,
      gddToNextStage,
      daysInCurrentStage,
      lastUpdated: new Date(),
      predictedFloweringDate,
      predictedHarvestDate,
      totalPrecipitation,
      avgTemperature: avgTemp
    }
  });

  logger.info(`Finished processing "${field.name}". Stage: ${currentStage}, GDD: ${accumulatedGdd.toFixed(1)}`);
}
