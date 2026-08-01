import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Field, WeatherData } from "../lib/types";
import { cleanParenthesesName } from "../lib/utils";

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

const defaultStagesSequence = [
  { id: "DORMANCE", emoji: "❄️" },
  { id: "DEBOURREMENT", emoji: "🌱" },
  { id: "FLORAISON", emoji: "🌸" },
  { id: "NOUAISON", emoji: "👶" },
  { id: "CROISSANCE", emoji: "📈" },
  { id: "VERAISON", emoji: "🎨" },
  { id: "RECOLTE", emoji: "🫒" }
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
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [stagesSequence, setStagesSequence] = useState(defaultStagesSequence);

  useEffect(() => {
    fetch("/api/ontology/stages")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stages && Array.isArray(data.stages)) {
          setStagesSequence(
            data.stages.map((st: any) => ({
              id: st.name || st.id,
              emoji: st.emoji || "🌱",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  // Automatically trigger weather fetch for all fields
  useEffect(() => {
    if (fields && fields.length > 0 && onFetchWeather) {
      fields.forEach((field) => {
        onFetchWeather(field);
      });
    }
  }, [fields, onFetchWeather]);

  const stageColors: Record<string, string> = {
    DORMANCE: "bg-[#2C3E50] text-[#F9F8F6] border-[#2e4052]",
    DEBOURREMENT: "bg-[#8D5B4C]/20 text-[#8D5B4C] border-[#8D5B4C]/40",
    FLORAISON: "bg-[#A0522D]/20 text-[#A0522D] border-[#A0522D]/40",
    NOUAISON: "bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]/40",
    CROISSANCE: "bg-[#8D5B4C] text-[#F9F8F6] border-[#A0522D]",
    VERAISON: "bg-[#2C3E50] text-[#C5A059] border-[#C5A059]/40",
    RECOLTE: "bg-[#A0522D] text-[#F9F8F6] border-[#B86B53]",
  };

  const filteredFields = fields.filter((f) => {
    if (!debouncedSearchQuery) return true;
    const query = debouncedSearchQuery.toLowerCase();
    const farm = farms.find((fm) => fm.id === f.farmId);
    return (
      f.name.toLowerCase().includes(query) ||
      (f.cropType && f.cropType.toLowerCase().includes(query)) ||
      (farm && farm.name.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFields.map((field) => {
          const farm = farms.find((f) => f.id === field.farmId);
          const activeStage = field.seasonSummary?.[0]?.currentStage || "DORMANCE";
          const weather = weatherData[field.id];
          const age = getFieldAge(field.plantingDate);
          const gdd = field.seasonSummary?.[0]?.accumulatedGdd || 0;
          const chilling = field.seasonSummary?.[0]?.accumulatedChilling || 0;
          const activeIndex = stagesSequence.findIndex(s => s.id === activeStage);
          const progressPercent = activeIndex === -1 ? 0 : (activeIndex / (stagesSequence.length - 1)) * 100;

          const farmCleanName = cleanParenthesesName(farm?.name, isAr) || t("common.farm");

          return (
            <div
              key={field.id}
              onClick={() => onSelectField(field.id)}
              className="bg-[#1f2d3a] border border-[#2e4052] hover:border-[#8D5B4C]/40 rounded-2xl p-5 backdrop-blur-sm shadow-xl transition-all hover:scale-[1.01] hover:shadow-[#8D5B4C]/10 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#A8A093] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#8D5B4C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {farmCleanName}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                      stageColors[activeStage] || stageColors.DORMANCE
                    }`}
                  >
                    {t(`phenology.${activeStage}`) || activeStage}
                  </span>
                </div>

                {/* Title & Variety */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-[#F9F8F6] mb-1 group-hover:text-[#8D5B4C] transition-colors">
                      {field.name}
                    </h3>
                    <p className="text-[#A8A093] text-[10px] mb-4 flex items-center gap-2">
                      <span className="font-semibold text-[#F9F8F6] bg-[#8D5B4C]/20 px-2 py-0.5 rounded border border-[#8D5B4C]/40">
                        {field.cropType || "Olive"}
                      </span>
                      <span>&bull;</span>
                      <span className="font-mono text-[#D8D2C5]">{field.area} ha</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteField(field.id);
                    }}
                    className="text-xs text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-all active:scale-95 flex items-center justify-center"
                    title={t("common.delete")}
                  >
                    🗑️
                  </button>
                </div>

                {/* Timeline Progress Graph */}
                <div className="my-5 px-1">
                  <span className="text-[9px] text-[#A8A093] font-bold uppercase tracking-wider mb-2.5 block">
                    {t("grid.phenologyGdd")}
                  </span>
                  
                  {/* Timeline Bar */}
                  <div className="relative my-6 select-none">
                    {/* Background Track Line */}
                    <div className="absolute top-1/2 left-3 right-3 h-1 bg-[#16212b] -translate-y-1/2 rounded-full border border-[#2e4052]/50" />
                    
                    {/* Active Progress Line */}
                    <div
                      className="absolute top-1/2 left-3 h-1 bg-gradient-to-r from-[#8D5B4C] via-[#A0522D] to-[#B86B53] -translate-y-1/2 rounded-full transition-all duration-700 shadow-sm"
                      style={{ width: `calc(${progressPercent}% - 6px)` }}
                    />

                    {/* Steps/Nodes Container */}
                    <div className="flex justify-between items-center relative z-10">
                      {stagesSequence.map((stage) => {
                        const isCurrent = stage.id === activeStage;
                        const isCompleted = stagesSequence.findIndex(s => s.id === stage.id) < activeIndex;
                        return (
                          <div key={stage.id} className="flex flex-col items-center group/node relative">
                            {/* Dot Badge */}
                            <div
                              className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                                isCurrent
                                  ? "w-8 h-8 bg-[#8D5B4C] border-4 border-[#16212b] shadow-lg shadow-[#8D5B4C]/40 scale-110 ring-2 ring-[#8D5B4C]/30 animate-pulse text-xs text-[#F9F8F6] font-bold"
                                  : isCompleted
                                  ? "w-6 h-6 bg-[#A0522D] border-2 border-[#16212b] shadow-md text-[9px] text-[#F9F8F6] font-bold"
                                  : "w-6 h-6 bg-[#16212b] border-2 border-[#2e4052] text-[9px] text-[#A8A093]"
                              }`}
                            >
                              {stage.emoji}
                            </div>
                            
                            {/* Floating Stage Label Tooltip on Hover */}
                            <div className="absolute -bottom-8 opacity-0 group-hover/node:opacity-100 bg-[#16212b] border border-[#8D5B4C]/40 px-2 py-0.5 rounded text-[8px] font-bold text-[#F9F8F6] whitespace-nowrap shadow-md transition-all duration-200 pointer-events-none z-20">
                              {t(`phenology.${stage.id}`) || stage.id}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* GDD & Chilling Metrics Capsule */}
                  <div className="bg-[#16212b] border border-[#2e4052] px-3 py-2 rounded-xl flex items-center justify-between text-[10px] text-[#8D5B4C] font-mono font-bold mt-2 shadow-inner">
                    <span className="flex items-center gap-1.5">
                      <span>🌡️</span>
                      <span className="text-[#A8A093]">{t("grid.gddAccumulated")}:</span>
                      <span className="text-[#F9F8F6] font-extrabold">{gdd.toFixed(1)} GDD</span>
                    </span>
                    <span className="text-[#2e4052] font-light">|</span>
                    <span className="flex items-center gap-1.5">
                      <span>❄️</span>
                      <span className="text-[#A8A093]">{t("grid.chillingHours")}:</span>
                      <span className="text-[#F9F8F6] font-extrabold">{chilling} h</span>
                    </span>
                  </div>
                </div>

                {/* Weather Info Widget (Full Width & Auto-Loaded) */}
                <div className="bg-[#16212b]/80 border border-[#2e4052] rounded-xl p-3.5 flex flex-col justify-between mb-4 shadow-sm backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-[#8D5B4C] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="text-xs">🌤️</span> {t("grid.liveWeather")}
                    </span>
                  </div>

                  {(() => {
                    const temp = weather?.current?.temperature_2m ?? 24.5;
                    const humidity = weather?.current?.relative_humidity_2m ?? 48;
                    const wind = weather?.current?.wind_speed_10m ?? 12.0;
                    const precip = weather?.current?.precipitation ?? 0.0;

                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#2e4052]/50 text-[10px]">
                        <div className="flex items-center gap-2 bg-[#1f2d3a] p-2 rounded-lg border border-[#2e4052]/40">
                          <span className="text-base">🌡️</span>
                          <div className="flex flex-col">
                            <span className="text-[8px] text-[#A8A093] font-bold uppercase">{t("grid.temperature")}</span>
                            <span className="text-[#F9F8F6] font-extrabold font-mono text-xs">
                              {temp.toFixed(1)}°C
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#1f2d3a] p-2 rounded-lg border border-[#2e4052]/40">
                          <span className="text-base">💧</span>
                          <div className="flex flex-col">
                            <span className="text-[8px] text-[#A8A093] font-bold uppercase">{t("grid.humidity")}</span>
                            <span className="text-[#F9F8F6] font-extrabold font-mono text-xs">
                              {humidity}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#1f2d3a] p-2 rounded-lg border border-[#2e4052]/40">
                          <span className="text-base">💨</span>
                          <div className="flex flex-col">
                            <span className="text-[8px] text-[#A8A093] font-bold uppercase">{t("grid.windSpeed")}</span>
                            <span className="text-[#F9F8F6] font-extrabold font-mono text-xs">
                              {wind} <span className="text-[8px]">km/h</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#1f2d3a] p-2 rounded-lg border border-[#2e4052]/40">
                          <span className="text-base">🌧️</span>
                          <div className="flex flex-col">
                            <span className="text-[8px] text-[#A8A093] font-bold uppercase">{t("grid.precipitation")}</span>
                            <span className="text-[#F9F8F6] font-extrabold font-mono text-xs">
                              {precip} <span className="text-[8px]">mm</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Extra details (Soil & Age) */}
                <div className="flex items-center gap-3 text-[#A8A093] text-[10px] mb-4 border-t border-[#2e4052]/50 pt-3">
                  {age !== null && (
                    <span className="flex items-center gap-1">
                      <span>🌳</span> {age} {t("common.ha")}
                    </span>
                  )}
                  {(field.agronomicData?.["Texture du Sol"] || field.agronomicData?.["soil_texture"]) && (
                    <span className="flex items-center gap-1">
                      <span>🧪</span> {field.agronomicData["Texture du Sol"] || field.agronomicData["soil_texture"]}
                    </span>
                  )}
                </div>
              </div>

              {/* Consulter / Open Field Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectField(field.id);
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] hover:from-[#7a4d3f] hover:to-[#8D5B4C] text-[#F9F8F6] font-extrabold text-xs rounded-xl shadow-lg shadow-[#8D5B4C]/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 border border-[#B86B53]/30"
              >
                <span>{t("grid.consultField")}</span>
                <span className="text-sm">➔</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
