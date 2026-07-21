import { useEffect } from "react";
import type { Field, WeatherData } from "../lib/types";

interface FieldGridProps {
  fields: Field[];
  farms: any[];
  weatherData: { [fieldId: string]: WeatherData | undefined };
  onFetchWeather: (field: Field) => void;
  onSelectField: (id: string) => void;
  onDeleteField: (id: string) => void;
  debouncedSearchQuery: string;
}

function getFieldAge(plantingDate?: string): number | null {
  if (!plantingDate) return null;
  const years = Math.floor(
    (Date.now() - new Date(plantingDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
  return years;
}

const stagesSequence = [
  { id: "DORMANCE", label: "Dormance (السكون)", emoji: "❄️" },
  { id: "DEBOURREMENT", label: "Débourrement (البراعم)", emoji: "🌱" },
  { id: "FLORAISON", label: "Floraison (التزهير)", emoji: "🌸" },
  { id: "NOUAISON", label: "Nouaison (عقد الثمار)", emoji: "👶" },
  { id: "CROISSANCE", label: "Croissance (النمو)", emoji: "📈" },
  { id: "VERAISON", label: "Véraison (التلوين)", emoji: "🎨" },
  { id: "RECOLTE", label: "Récolte (الجني)", emoji: "🫒" }
];

export function FieldGrid({
  fields,
  farms,
  weatherData,
  onFetchWeather,
  onSelectField,
  onDeleteField,
  debouncedSearchQuery,
}: FieldGridProps) {
  // Automatically fetch weather for all fields as soon as they load
  useEffect(() => {
    fields.forEach((field) => {
      if (!weatherData[field.id]) {
        onFetchWeather(field);
      }
    });
  }, [fields, weatherData, onFetchWeather]);

  if (fields.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500 bg-slate-900/40 border border-white/5 rounded-2xl animate-in fade-in max-w-xl mx-auto w-full">
        <span className="text-4xl block mb-4">🫒</span>
        <p className="font-semibold text-slate-300 mb-1 text-base">Aucune parcelle trouvée</p>
        <p className="text-sm text-slate-500">
          {debouncedSearchQuery
            ? "Aucun résultat ne correspond à votre recherche."
            : "Veuillez définir une parcelle en dessinant sur la carte."}
        </p>
      </div>
    );
  }

  // Stage configurations
  const stageColors: Record<string, string> = {
    FLORAISON: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    NOUAISON: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    RECOLTE: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    DORMANCE: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    DEBOURREMENT: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    CROISSANCE: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    VERAISON: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  };

  const stageLabels: Record<string, string> = {
    DORMANCE: "❄️ Dormance (السكون)",
    DEBOURREMENT: "🌱 Débourrement (خروج البراعم)",
    FLORAISON: "🌸 Floraison (الإزهار)",
    NOUAISON: "👶 Nouaison (عقد الثمار)",
    CROISSANCE: "📈 Croissance (نمو الثمرة)",
    VERAISON: "🎨 Véraison (تلوين الثمرة)",
    RECOLTE: "🫒 Récolte (الجني)",
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in w-full max-w-2xl mx-auto">
      {fields.map((field) => {
        const farm = farms.find((f) => f.id === field.farmId);
        const activeStage = field.seasonSummary?.[0]?.currentStage || "DORMANCE";
        const weather = weatherData[field.id];
        const age = getFieldAge(field.plantingDate);
        const gdd = field.seasonSummary?.[0]?.accumulatedGdd || 0;
        const chilling = field.seasonSummary?.[0]?.accumulatedChilling || 0;
        const activeIndex = stagesSequence.findIndex(s => s.id === activeStage);
        const progressPercent = activeIndex === -1 ? 0 : (activeIndex / (stagesSequence.length - 1)) * 100;

        return (
          <div
            key={field.id}
            onClick={() => onSelectField(field.id)}
            className="bg-slate-900/60 border border-white/10 hover:border-emerald-500/30 rounded-2xl p-5 backdrop-blur-sm shadow-xl transition-all hover:scale-[1.01] hover:shadow-emerald-950/10 group flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {farm?.name || "Sans Ferme"}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                    stageColors[activeStage] || stageColors.DORMANCE
                  }`}
                >
                  {stageLabels[activeStage] || stageLabels.DORMANCE}
                </span>
              </div>

              {/* Title & Variety */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {field.name}
                  </h3>
                  <p className="text-slate-400 text-[10px] mb-4 flex items-center gap-2">
                    <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                      {field.cropType || "Olive"}
                    </span>
                    <span>&bull;</span>
                    <span className="font-mono text-slate-300">{field.area} ha</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteField(field.id);
                  }}
                  className="text-xs text-red-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-all active:scale-95 flex items-center justify-center"
                  title="Supprimer la parcelle / حذف الحقل"
                >
                  🗑️
                </button>
              </div>

              {/* Timeline Progress Graph */}
              <div className="my-5 px-1">
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-2.5 block">
                  Progression Phénologique & GDD (المراحل الفينولوجية وساعات الحرارة)
                </span>
                
                {/* Timeline Bar */}
                <div className="relative my-6 select-none">
                  {/* Background Track Line */}
                  <div className="absolute top-1/2 left-3 right-3 h-1 bg-slate-800 -translate-y-1/2 rounded-full" />
                  
                  {/* Active Progress Line */}
                  <div
                    className="absolute top-1/2 left-3 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 -translate-y-1/2 rounded-full transition-all duration-700"
                    style={{ width: `calc(${progressPercent}% - 6px)` }}
                  />

                  {/* Steps/Nodes Container */}
                  <div className="flex justify-between items-center relative z-10">
                    {stagesSequence.map((stage, idx) => {
                      const isCompleted = idx < activeIndex;
                      const isCurrent = idx === activeIndex;
                      
                      return (
                        <div key={stage.id} className="flex flex-col items-center group/node relative">
                          {/* Dot Badge */}
                          <div
                            className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                              isCurrent
                                ? "w-8 h-8 bg-emerald-400 border-4 border-slate-950 shadow-lg shadow-emerald-400/30 scale-110 ring-2 ring-emerald-400/20 animate-pulse text-xs text-slate-950 font-bold"
                                : isCompleted
                                ? "w-6 h-6 bg-emerald-500 border-2 border-slate-950 shadow-md shadow-emerald-500/10 text-[9px] text-white font-bold"
                                : "w-6 h-6 bg-slate-800 border-2 border-slate-950 text-[9px] text-slate-500"
                            }`}
                          >
                            {stage.emoji}
                          </div>
                          
                          {/* Floating Stage Label Tooltip on Hover */}
                          <div className="absolute -bottom-8 opacity-0 group-hover/node:opacity-100 bg-slate-950 border border-white/10 px-2 py-0.5 rounded text-[8px] font-bold text-emerald-400 whitespace-nowrap shadow-md transition-all duration-200 pointer-events-none z-20">
                            {stage.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* GDD & Chilling Metrics Capsule */}
                <div className="bg-emerald-500/[0.03] border border-emerald-500/10 px-3 py-2 rounded-xl flex items-center justify-between text-[10px] text-emerald-400/90 font-mono font-bold mt-2 shadow-inner">
                  <span className="flex items-center gap-1.5">
                    <span>🌡️</span>
                    <span>Cumul Thermique:</span>
                    <span className="text-white font-extrabold">{gdd.toFixed(1)} GDD</span>
                  </span>
                  <span className="text-emerald-500/30 font-light">|</span>
                  <span className="flex items-center gap-1.5">
                    <span>❄️</span>
                    <span>Chilling:</span>
                    <span className="text-white font-extrabold">{chilling} h</span>
                  </span>
                </div>
              </div>

              {/* Weather Info Widget (Full Width & Auto-Loaded) */}
              <div className="bg-slate-950/50 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between mb-4 shadow-sm backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="text-xs">🌤️</span> Climat en direct (الطقس الفعلي)
                  </span>
                  {weather?.current && (
                    <span className="text-[9px] text-slate-500 font-mono font-semibold">
                      Station Locale
                    </span>
                  )}
                </div>

                {weather?.current ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5 text-[10px]">
                    <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-white/5">
                      <span className="text-base">🌡️</span>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 font-bold uppercase">الحرارة</span>
                        <span className="text-white font-extrabold font-mono text-xs">
                          {weather.current.temperature_2m.toFixed(1)}°C
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-white/5">
                      <span className="text-base">💧</span>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 font-bold uppercase">الرطوبة</span>
                        <span className="text-sky-300 font-extrabold font-mono text-xs">
                          {weather.current.relative_humidity_2m}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-white/5">
                      <span className="text-base">💨</span>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 font-bold uppercase">الرياح</span>
                        <span className="text-teal-300 font-extrabold font-mono text-xs">
                          {weather.current.wind_speed_10m} <span className="text-[8px]">km/h</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-white/5">
                      <span className="text-base">🌧️</span>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 font-bold uppercase">التساقطات</span>
                        <span className="text-blue-300 font-extrabold font-mono text-xs">
                          {weather.current.precipitation} <span className="text-[8px]">mm</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 py-2.5 px-3 bg-slate-900/40 rounded-lg text-[10px] text-slate-400 font-medium animate-pulse border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Chargement des données météo en direct... (جارٍ جلب الطقس)</span>
                  </div>
                )}
              </div>

              {/* Extra details (Soil & Age) */}
              <div className="flex items-center gap-3 text-slate-500 text-[10px] mb-4 border-t border-white/5 pt-3">
                {age !== null && (
                  <span className="flex items-center gap-1">
                    <span>🌳</span> {age} ans
                  </span>
                )}
                {(field.agronomicData?.["Texture du Sol"] || field.agronomicData?.["soil_texture"]) && (
                  <span className="flex items-center gap-1">
                    <span>🧪</span> {field.agronomicData["Texture du Sol"] || field.agronomicData["soil_texture"]}
                  </span>
                )}
              </div>
            </div>

            {/* Consulter Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectField(field.id);
              }}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 uppercase tracking-wider mt-2"
            >
              <span>Consulter l'Espace Parcelle</span>
              <span>➔</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
