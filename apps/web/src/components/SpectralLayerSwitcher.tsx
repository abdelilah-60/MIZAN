import React from "react";
import { useTranslation } from "react-i18next";

export interface SpectralLayerSwitcherProps {
  satelliteMode: "SATELLITE" | "CANOPY" | "SAVI" | "NDVI" | "NDWI";
  setSatelliteMode: (mode: "SATELLITE" | "CANOPY" | "SAVI" | "NDVI" | "NDWI") => void;
  satelliteData: any;
  loadingSatellite: boolean;
  onClose: () => void;
}

export const SpectralLayerSwitcher = React.memo(function SpectralLayerSwitcher({
  satelliteMode,
  setSatelliteMode,
  satelliteData,
  loadingSatellite,
  onClose,
}: SpectralLayerSwitcherProps) {
  const { t } = useTranslation();

  const layers = [
    {
      id: "SATELLITE" as const,
      label: "Naturel (طبيعي)",
      icon: "🛰️",
      value: loadingSatellite ? "..." : null,
      activeClass: "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    },
    {
      id: "CANOPY" as const,
      label: "Cover % (كثافة الأشجار)",
      icon: "🌳",
      value: satelliteData?.canopyCover ? `${satelliteData.canopyCover.meanPct}%` : null,
      activeClass: "bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-black shadow-[0_0_20px_rgba(52,211,153,0.4)]",
    },
    {
      id: "SAVI" as const,
      label: "SAVI (صحة الأشجار)",
      icon: "🌿",
      value: satelliteData?.savi ? satelliteData.savi.mean : null,
      activeClass: "bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 font-black shadow-[0_0_20px_rgba(45,212,191,0.4)]",
    },
    {
      id: "NDVI" as const,
      label: "NDVI (الغطاء النباتي)",
      icon: "🌱",
      value: satelliteData?.ndvi ? satelliteData.ndvi.mean : null,
      activeClass: "bg-gradient-to-r from-cyan-400 to-teal-500 text-slate-950 font-black shadow-[0_0_20px_rgba(34,211,238,0.4)]",
    },
    {
      id: "NDWI" as const,
      label: "NDWI (الإجهاد المائي)",
      icon: "💧",
      value: satelliteData?.ndwi ? `${satelliteData.ndwi.hydricStressPct}%` : null,
      activeClass: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    },
  ];

  return (
    <>
      {/* Top Floating Glass Bar */}
      <div className="absolute top-3 left-3 right-14 z-20 flex items-center justify-between pointer-events-auto gap-3">
        {/* Layer Switcher Pill Capsule */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-1.5 flex items-center gap-1.5 shadow-2xl overflow-x-auto scrollbar-none max-w-full">
          {layers.map((layer) => {
            const isActive = satelliteMode === layer.id;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setSatelliteMode(layer.id)}
                className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap active:scale-95 ${
                  isActive
                    ? layer.activeClass
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-sm">{layer.icon}</span>
                <span>{layer.label}</span>
                {layer.value && (
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold shadow-inner ${
                      isActive
                        ? "bg-slate-950/60 text-white"
                        : "bg-slate-900/80 text-emerald-400 border border-white/10"
                    }`}
                  >
                    {layer.value}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Satellite Data Source Pulse Badge */}
        {satelliteData && (
          <div
            className={`hidden lg:flex bg-slate-950/90 backdrop-blur-2xl border px-3.5 py-2 rounded-2xl text-[10px] font-mono font-bold items-center gap-2 shadow-2xl ${
              satelliteData.dataSource === "sentinel-2-real"
                ? "border-emerald-500/40 text-emerald-400"
                : "border-amber-500/40 text-amber-400"
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                satelliteData.dataSource === "sentinel-2-real"
                  ? "bg-emerald-400 shadow-[0_0_10px_#10b981]"
                  : "bg-amber-400"
              }`}
            />
            <span>
              {satelliteData.dataSource === "sentinel-2-real"
                ? "Sentinel-2A • 10m ✓"
                : "Simulation (Demo)"}
            </span>
          </div>
        )}
      </div>

      {/* Top Right Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 bg-slate-950/90 hover:bg-slate-800 border border-white/20 hover:border-white/40 text-white font-bold p-2.5 rounded-2xl transition-all z-20 shadow-2xl active:scale-95 backdrop-blur-2xl"
        title={t("common.close")}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Legend Banner when spectral layer is active */}
      {satelliteMode !== "SATELLITE" && (
        <div className="absolute top-16 left-3 z-20 bg-slate-950/95 backdrop-blur-2xl border border-white/15 px-4 py-2 rounded-2xl text-[10px] font-mono text-slate-300 flex items-center gap-4 shadow-2xl animate-in fade-in flex-wrap">
          {satelliteMode === "CANOPY" ? (
            <>
              <span className="font-extrabold text-emerald-400">fCOVER (%):</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> كثيفة (&ge;35%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-lime-500" /> متوازنة (18-35%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> فتية (8-18%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> تربة (0%)</span>
            </>
          ) : satelliteMode === "SAVI" ? (
            <>
              <span className="font-extrabold text-emerald-400">SAVI Index:</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> ممتازة (&ge;0.28)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-lime-500" /> جيدة (0.20-0.28)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> متوسطة (0.14-0.20)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> ضعيفة (&lt;0.14)</span>
            </>
          ) : satelliteMode === "NDVI" ? (
            <>
              <span className="font-extrabold text-cyan-400">NDVI Index:</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> كثيفة (&ge;0.30)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-lime-500" /> متوازنة (0.20-0.30)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> خفيفة (0.14-0.20)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> تربة (&lt;0.14)</span>
            </>
          ) : (
            <>
              <span className="font-extrabold text-blue-400">NDWI Stress:</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" /> ري مثالي (&ge;0.02)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> رطوبة متوازنة</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> جفاف خفيف</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" /> إجهاد حاد ⚠️</span>
            </>
          )}
        </div>
      )}
    </>
  );
});
