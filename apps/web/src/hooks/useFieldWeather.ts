import { useState, useCallback } from "react";
import centroid from "@turf/centroid";
import { polygon } from "@turf/helpers";
import type { Field, WeatherData } from "../lib/types";
import { getHeaders } from "../lib/api";

interface UseFieldWeatherProps {
  token: string | null;
}

export function useFieldWeather({ token }: UseFieldWeatherProps) {
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [loadingWeather, setLoadingWeather] = useState<Record<string, boolean>>({});

  const fetchWeather = useCallback(
    async (field: Field, force = false) => {
      if (!field || (!force && (weatherData[field.id] || loadingWeather[field.id]))) {
        return;
      }

      setLoadingWeather((prev) => ({ ...prev, [field.id]: true }));
      try {
        const rawPoly = typeof field.geoPolygon === "string" ? JSON.parse(field.geoPolygon) : field.geoPolygon;
        const coords = rawPoly?.coordinates || rawPoly?.geometry?.coordinates;
        if (!coords) return;

        const poly = polygon(coords);
        const center = centroid(poly);
        const [lng, lat] = center.geometry.coordinates;

        const res = await fetch(`/api/weather?lat=${lat}&lon=${lng}`, {
          headers: getHeaders(token),
        });

        if (res.ok) {
          const data = (await res.json()) as WeatherData;
          setWeatherData((prev) => ({ ...prev, [field.id]: data }));
        }
      } catch (err) {
        console.warn(`Weather fetch error for field ${field.id}:`, err);
      } finally {
        setLoadingWeather((prev) => ({ ...prev, [field.id]: false }));
      }
    },
    [token, weatherData, loadingWeather]
  );

  return { weatherData, loadingWeather, fetchWeather };
}
