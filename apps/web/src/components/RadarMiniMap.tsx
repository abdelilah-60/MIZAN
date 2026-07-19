import { useState, useEffect } from "react";
import type { Field, InsightData } from "../lib/types";

interface RadarMiniMapProps {
  fields: Field[];
  insightsData: { [fieldId: string]: InsightData | undefined };
  onSelectField: (id: string) => void;
}

export function RadarMiniMap({ fields, insightsData, onSelectField }: RadarMiniMapProps) {
  const [sweepAngle, setSweepAngle] = useState(0);

  // Animate the sweeping radar line
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setSweepAngle((prev) => (prev + 1.5) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const getFieldPosition = (id: string, index: number, total: number) => {
    // Generate a stable polar position based on field ID hashes
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const angle = (index / (total || 1)) * 2 * Math.PI + (hash % 10) * 0.1;
    const radius = 25 + (hash % 55); // Keep it within bounds of a 200x200 canvas (radius max 80)
    const x = 100 + radius * Math.cos(angle);
    const y = 100 + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
          Radar de Surveillance (الرادار)
        </span>
        <span className="text-[9px] text-slate-500">Live Scan</span>
      </div>

      {/* Radar SVG Visualizer */}
      <div className="relative w-44 h-44 bg-slate-950/80 rounded-full border border-emerald-500/20 overflow-hidden shadow-inner flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Radial Grid lines */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.15" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.15" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.15" />
          <circle cx="100" cy="100" r="20" fill="none" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.15" />
          
          <line x1="100" y1="5" x2="100" y2="195" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.15" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.15" />

          {/* Sweeping Radar Line */}
          <line
            x1="100"
            y1="100"
            x2={100 + 95 * Math.cos((sweepAngle * Math.PI) / 180)}
            y2={100 + 95 * Math.sin((sweepAngle * Math.PI) / 180)}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />

          {/* Sweep Fading Glow */}
          <path
            d={`M 100 100 
                L ${100 + 95 * Math.cos((sweepAngle * Math.PI) / 180)} ${100 + 95 * Math.sin((sweepAngle * Math.PI) / 180)} 
                A 95 95 0 0 0 ${100 + 95 * Math.cos(((sweepAngle - 45) * Math.PI) / 180)} ${100 + 95 * Math.sin(((sweepAngle - 45) * Math.PI) / 180)} 
                Z`}
            fill="url(#radar-glow)"
            opacity="0.3"
          />

          <defs>
            <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Render Fields on Radar Grid */}
          {fields.map((field, idx) => {
            const { x, y } = getFieldPosition(field.id, idx, fields.length);
            const insights = insightsData[field.id];
            const hasRisks = (insights?.ai_analysis?.risks_found?.length || 0) > 0;

            return (
              <g key={field.id} className="cursor-pointer" onClick={() => onSelectField(field.id)}>
                {/* Alert Pulsing Ring if has risks */}
                {hasRisks && (
                  <circle cx={x} cy={y} r="8" className="animate-ping fill-red-500/20 stroke-red-500/40" strokeWidth="1" />
                )}

                {/* Main Dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={hasRisks ? "4" : "3"}
                  className={`${
                    hasRisks
                      ? "fill-red-500 shadow-lg shadow-red-500"
                      : "fill-emerald-400 group-hover:fill-emerald-300"
                  } transition-all duration-300`}
                />

                {/* Tiny Label (Only index/rank identifier) */}
                <text
                  x={x}
                  y={y - 6}
                  textAnchor="middle"
                  className="fill-slate-400 font-bold text-[6px] pointer-events-none uppercase tracking-wider"
                >
                  P{idx + 1}
                </text>
                
                {/* Tooltip trigger for hover */}
                <title>{`${field.name} (${hasRisks ? "Alerte active!" : "Sain"})`}</title>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Radar Legend */}
      <div className="w-full grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5 text-[9px] text-slate-400">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span>Sain ({fields.filter(f => !(insightsData[f.id]?.ai_analysis?.risks_found?.length)).length})</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>Alerte ({fields.filter(f => (insightsData[f.id]?.ai_analysis?.risks_found?.length || 0) > 0).length})</span>
        </div>
      </div>
    </div>
  );
}
