import React from "react";
import type { InsightData } from "../lib/types";

interface InsightsPanelProps {
  data: InsightData;
  cropType?: string;
}

export const InsightsPanel = React.memo(function InsightsPanel({ data, cropType }: InsightsPanelProps) {
  return (
    <div className="bg-slate-900/60 p-6 rounded-2xl border border-purple-500/20 shadow-inner max-w-4xl mx-auto">
      <h4 className="text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">
            <span>🧠</span> Mizan AI Risk Analysis
          </h4>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-slate-400">Analyzed Crop</span>
              <span className="text-slate-200 font-medium">
                {cropType || data.ai_analysis?.crop || "Unknown"}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-slate-400">Current Environmental Condition</span>
              <span className="text-blue-300 font-medium">
                Humidity {data.humidity}% (
                {data.ai_analysis?.condition || (data.humidity > 70 ? "High Humidity" : "Normal")})
              </span>
            </div>

            <div className="pt-2">
              {data.ai_analysis?.consideredRecentActions && (
                <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                  <span className="text-sm">🔄</span> Context Aware: Recent Actions Analyzed
                </div>
              )}
              {data.ai_analysis?.risks_found && data.ai_analysis.risks_found.length > 0 ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-4">
                  <span className="text-red-400 text-xl mt-0.5">⚠️</span>
                  <div>
                    <p className="font-semibold text-red-400 mb-2">High Risk Detected</p>
                    <ul className="list-disc pl-4 text-red-300/80 space-y-1 mb-2">
                      {data.ai_analysis.risks_found.map((risk, i) => (
                        <li key={i}>{risk}</li>
                      ))}
                    </ul>
                    {data.ai_analysis.advice && (
                      <p className="text-red-200/90 text-xs border-t border-red-500/20 pt-2 mt-2">
                        <span className="font-semibold">AI Advice:</span> {data.ai_analysis.advice}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-4">
                  <span className="text-emerald-400 text-xl mt-0.5">✅</span>
                  <div>
                    <p className="font-semibold text-emerald-400">
                      Crop is safe under current environmental conditions.
                    </p>
                    {data.ai_analysis?.advice && (
                      <p className="text-emerald-200/90 text-xs border-t border-emerald-500/20 pt-2 mt-2">
                        <span className="font-semibold">AI Advice:</span> {data.ai_analysis.advice}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Disease Risk Forecast Breakdown */}
            {data.ai_analysis?.disease_forecast && (
              <div className="mt-6 border-t border-white/10 pt-4">
                <h5 className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-3">
                  🩺 Prévention & Risques Maladies (7 jours)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(data.ai_analysis.disease_forecast).map(([disease, info]) => {
                    const isCritical = info.level === "CRITICAL";
                    const isHigh = info.level === "HIGH";
                    const isModerate = info.level === "MODERATE";
                    const colorClass = isCritical
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : isHigh
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      : isModerate
                      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

                    const progressColor = isCritical
                      ? "bg-red-500"
                      : isHigh
                      ? "bg-amber-500"
                      : isModerate
                      ? "bg-yellow-400"
                      : "bg-emerald-500";

                    return (
                      <div
                        key={disease}
                        className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-semibold text-slate-200 text-xs">
                              {disease === "Peacock Spot"
                                ? "🦚 Oeil de Paon"
                                : disease === "Olive Knot"
                                ? "🌳 سل الزيتون (Olive Knot)"
                                : disease === "Verticillium Wilt"
                                ? "🌱 Verticilliose"
                                : "🪰 Mouche de l'Olive"}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${colorClass}`}
                            >
                              {info.level} ({info.score.toFixed(0)}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                              style={{ width: `${info.score}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed italic">{info.advice}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
  );
}
);
