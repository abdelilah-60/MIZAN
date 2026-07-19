import { RadarMiniMap } from "./RadarMiniMap";
import type { Field, InsightData, WeatherData } from "../lib/types";

interface SidebarRightProps {
  fields: Field[];
  insightsData: { [fieldId: string]: InsightData | undefined };
  weatherData: { [fieldId: string]: WeatherData | undefined };
  onSelectField: (id: string) => void;
  onFetchWeather: (field: Field) => void;
  onFetchInsights: (field: Field) => void;
}

export function SidebarRight({
  fields,
  insightsData,
  weatherData,
  onSelectField,
  onFetchWeather,
  onFetchInsights,
}: SidebarRightProps) {
  // Find all active risks across all fields
  const activeAlerts: { fieldName: string; fieldId: string; risk: string }[] = [];
  fields.forEach((field) => {
    const insights = insightsData[field.id];
    if (insights?.ai_analysis?.risks_found) {
      insights.ai_analysis.risks_found.forEach((risk) => {
        activeAlerts.push({
          fieldName: field.name,
          fieldId: field.id,
          risk,
        });
      });
    }
  });

  // Get weather summary from first field or default
  const firstFieldWithWeather = fields.find((f) => weatherData[f.id] !== undefined);
  const currentTemp = firstFieldWithWeather
    ? weatherData[firstFieldWithWeather.id]?.current.temperature_2m
    : null;
  const currentWind = firstFieldWithWeather
    ? weatherData[firstFieldWithWeather.id]?.current.wind_speed_10m
    : null;

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Radar Map Component */}
      <RadarMiniMap fields={fields} insightsData={insightsData} onSelectField={onSelectField} />

      {/* Active Alerts Panel */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl">
        <h5 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <span>🚨</span> الإنذارات النشطة (Alertes)
        </h5>
        
        {activeAlerts.length === 0 ? (
          <p className="text-[10px] text-slate-500 leading-normal">
            لا توجد مخاطر حرجة حالياً. جميع الحقول في حالة سليمة ومستقرة.
          </p>
        ) : (
          <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
            {activeAlerts.slice(0, 4).map((alert, idx) => (
              <div
                key={idx}
                onClick={() => onSelectField(alert.fieldId)}
                className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-500/10 rounded-xl cursor-pointer transition-all"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-bold text-red-400 uppercase">{alert.fieldName}</span>
                  <span className="text-[8px] bg-red-500/20 text-red-400 px-1 rounded font-semibold">Risque</span>
                </div>
                <p className="text-[10px] text-slate-300 leading-snug">{alert.risk}</p>
              </div>
            ))}
            {activeAlerts.length > 4 && (
              <p className="text-[9px] text-slate-500 text-center pt-1">
                + {activeAlerts.length - 4} autres alertes actives
              </p>
            )}
          </div>
        )}
      </div>

      {/* Weather Widget */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl">
        <h5 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <span>🌦️</span> طقس المنطقة (Météo)
        </h5>
        
        {currentTemp !== null && currentTemp !== undefined ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-black text-white">{currentTemp.toFixed(1)}°C</p>
              <p className="text-[9px] text-slate-500">Vent: {currentWind?.toFixed(1) || 0} km/h</p>
            </div>
            <div className="text-right">
              <span className="text-2xl">☀️</span>
              <p className="text-[9px] text-emerald-400 font-bold tracking-wider uppercase mt-1">Ensoleillé</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-[10px] text-slate-500 mb-2">الطقس العام للمنطقة</p>
            {fields.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  fields.forEach((f) => {
                    onFetchWeather(f);
                    onFetchInsights(f);
                  });
                }}
                className="text-[9px] font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                Mettre à jour
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
