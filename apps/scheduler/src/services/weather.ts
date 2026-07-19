import { logger } from "../lib/logger";

export interface DailyWeatherData {
  date: string;
  tmax: number;
  tmin: number;
  precipitation: number;
  humidity: number;
  hourlyTemps: number[];
}

export async function fetchWeatherData(
  lat: number,
  lon: number,
  startDate: string,
  endDate: string
): Promise<DailyWeatherData[]> {
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&hourly=temperature_2m,relative_humidity_2m&timezone=auto`;
  
  logger.info(`Fetching weather from Open-Meteo: ${startDate} to ${endDate} at (${lat}, ${lon})`);
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      // Fallback to forecast API if archive API fails or if date is very recent
      logger.warn(`Archive API failed or date is recent. Trying forecast API...`);
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&hourly=temperature_2m,relative_humidity_2m&timezone=auto`;
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) {
        throw new Error(`Open-Meteo API returned status ${forecastRes.status}`);
      }
      return parseOpenMeteoResponse(await forecastRes.json());
    }
    
    return parseOpenMeteoResponse(await res.json());
  } catch (error: any) {
    logger.error(`Failed to fetch weather data: ${error.message}`);
    throw error;
  }
}

function parseOpenMeteoResponse(data: any): DailyWeatherData[] {
  const daily = data.daily;
  const hourly = data.hourly;
  
  if (!daily || !daily.time) {
    throw new Error("Invalid response format from Open-Meteo");
  }

  const results: DailyWeatherData[] = [];
  
  for (let i = 0; i < daily.time.length; i++) {
    const dateStr = daily.time[i];
    
    // Extract hourly temperatures for this specific day (24 hours)
    const dayStartHour = i * 24;
    const dayEndHour = dayStartHour + 24;
    
    const dayHourlyTemps = hourly.temperature_2m ? hourly.temperature_2m.slice(dayStartHour, dayEndHour) : [];
    const dayHourlyHumidity = hourly.relative_humidity_2m ? hourly.relative_humidity_2m.slice(dayStartHour, dayEndHour) : [];
    
    // Average humidity for the day
    const avgHumidity = dayHourlyHumidity.length > 0
      ? dayHourlyHumidity.reduce((sum: number, val: number) => sum + val, 0) / dayHourlyHumidity.length
      : 0;

    results.push({
      date: dateStr,
      tmax: daily.temperature_2m_max[i] ?? 0,
      tmin: daily.temperature_2m_min[i] ?? 0,
      precipitation: daily.precipitation_sum[i] ?? 0,
      humidity: avgHumidity,
      hourlyTemps: dayHourlyTemps
    });
  }
  
  return results;
}
