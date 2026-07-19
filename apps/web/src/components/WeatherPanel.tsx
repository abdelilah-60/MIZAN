import React from "react";
import type { WeatherData } from "../lib/types";

interface WeatherPanelProps {
  data: WeatherData;
}

export const WeatherPanel = React.memo(function WeatherPanel({ data }: WeatherPanelProps) {
  if (!data.current) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
        <div className="text-xs text-slate-400 mb-1">Temperature</div>
        <div className="text-lg font-semibold text-white">{data.current.temperature_2m}°C</div>
      </div>
      <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
        <div className="text-xs text-slate-400 mb-1">Humidity</div>
        <div className="text-lg font-semibold text-blue-300">{data.current.relative_humidity_2m}%</div>
      </div>
      <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
        <div className="text-xs text-slate-400 mb-1">Wind Speed</div>
        <div className="text-lg font-semibold text-slate-300">{data.current.wind_speed_10m} km/h</div>
      </div>
      <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
        <div className="text-xs text-slate-400 mb-1">Precipitation</div>
        <div className="text-lg font-semibold text-teal-300">{data.current.precipitation} mm</div>
      </div>
    </div>
  );
});
