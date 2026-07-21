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
      if (!force && (weatherData[field.id] || loadingWeather[field.id])) {
        return;
      }

      setLoadingWeather((prev) => ({ ...prev, [field.id]: true }));
      try {
        const poly = polygon((field.geoPolygon as GeoJSON.Polygon).coordinates);
        const center = centroid(poly);
        const [lng, lat] = center.geometry.coordinates;

        const res = await fetch(`/api/weather?lat=${lat}&lon=${lng}`, {
          headers: getHeaders(token),
        });

        if (res.ok) {
          const data = (await res.json()) as WeatherData;
          setWeatherData((prev) => ({ ...prev, [field.id]: data }));
        }
      } catch {
        // silent
      } finally {
        setLoadingWeather((prev) => ({ ...prev, [field.id]: false }));
      }
    },
    [token, weatherData, loadingWeather]
  );

  return { weatherData, loadingWeather, fetchWeather };
}
