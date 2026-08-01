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
      activeClass: "bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] text-[#F9F8F6] font-black shadow-[0_0_20px_rgba(141,91,76,0.5)] border border-[#B86B53]/40",
    },
    {
      id: "CANOPY" as const,
      label: "Cover % (كثافة الأشجار)",
      icon: "🌳",
      value: satelliteData?.canopyCover ? `${satelliteData.canopyCover.meanPct}%` : null,
      activeClass: "bg-gradient-to-r from-[#8D5B4C] to-[#B86B53] text-[#F9F8F6] font-black shadow-[0_0_20px_rgba(141,91,76,0.5)] border border-[#B86B53]/40",
    },
    {
      id: "SAVI" as const,
      label: "SAVI (صحة الأشجار)",
      icon: "🌿",
      value: satelliteData?.savi ? satelliteData.savi.mean : null,
      activeClass: "bg-gradient-to-r from-[#A0522D] to-[#8D5B4C] text-[#F9F8F6] font-black shadow-[0_0_20px_rgba(160,82,45,0.5)] border border-[#B86B53]/40",
    },
    {
      id: "NDVI" as const,
      label: "NDVI (الغطاء النباتي)",
      icon: "🌱",
      value: satelliteData?.ndvi ? satelliteData.ndvi.mean : null,
      activeClass: "bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-[#F9F8F6] font-black shadow-[0_0_20px_rgba(44,62,80,0.6)] border border-[#8D5B4C]/40",
    },
    {
      id: "NDWI" as const,
      label: "NDWI (الإجهاد المائي)",
      icon: "💧",
      value: satelliteData?.ndwi ? `${satelliteData.ndwi.hydricStressPct}%` : null,
      activeClass: "bg-gradient-to-r from-[#2C3E50] to-[#1A2530] text-[#F9F8F6] font-black shadow-[0_0_20px_rgba(44,62,80,0.6)] border border-[#8D5B4C]/40",
    },
  ];

  return (
    <>
      {/* Top Left Floating Bar Container */}
      <div className="absolute top-3 left-3 right-14 z-20 flex flex-col items-start gap-2 pointer-events-auto max-w-full">
        {/* Layer Switcher Pill Capsule */}
        <div className="w-full flex items-center justify-between gap-3">
          <div className="bg-[#16212b]/95 backdrop-blur-2xl border border-[#2e4052] rounded-2xl p-1.5 flex items-center gap-1.5 shadow-2xl overflow-x-auto scrollbar-none max-w-full">
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
                      : "text-[#D8D2C5] hover:text-[#F9F8F6] hover:bg-[#2C3E50]/40"
                  }`}
                >
                  <span className="text-sm">{layer.icon}</span>
                  <span>{layer.label}</span>
                  {layer.value && (
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold shadow-inner ${
                        isActive
                          ? "bg-[#16212b]/70 text-[#F9F8F6]"
                          : "bg-[#1f2d3a] text-[#8D5B4C] border border-[#2e4052]"
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
              className={`hidden lg:flex bg-[#16212b]/95 backdrop-blur-2xl border px-3.5 py-2 rounded-2xl text-[10px] font-mono font-bold items-center gap-2 shadow-2xl ${
                satelliteData.dataSource === "sentinel-2-real"
                  ? "border-[#8D5B4C]/40 text-[#8D5B4C]"
                  : "border-amber-500/40 text-amber-400"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                  satelliteData.dataSource === "sentinel-2-real"
                    ? "bg-[#8D5B4C] shadow-[0_0_10px_#8D5B4C]"
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

        {/* Legend Banner stacked cleanly below layer switcher without overlapping */}
        {satelliteMode !== "SATELLITE" && (
          <div className="bg-[#16212b]/95 backdrop-blur-2xl border border-[#2e4052] px-4 py-1.5 rounded-2xl text-[10px] font-mono text-[#D8D2C5] flex items-center gap-3 shadow-2xl animate-in fade-in flex-wrap">
            {satelliteMode === "CANOPY" ? (
              <>
                <span className="font-extrabold text-[#8D5B4C]">fCOVER (%):</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8D5B4C] shadow-[0_0_8px_#8D5B4C]" /> كثيفة (&ge;35%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#A0522D]" /> متوازنة (18-35%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#B86B53]" /> فتية (8-18%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> تربة (0%)</span>
              </>
            ) : satelliteMode === "SAVI" ? (
              <>
                <span className="font-extrabold text-[#8D5B4C]">SAVI Index:</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8D5B4C] shadow-[0_0_8px_#8D5B4C]" /> ممتازة (&ge;0.28)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#A0522D]" /> جيدة (0.20-0.28)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#B86B53]" /> متوسطة (0.14-0.20)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> ضعيفة (&lt;0.14)</span>
              </>
            ) : satelliteMode === "NDVI" ? (
              <>
                <span className="font-extrabold text-[#8D5B4C]">NDVI Index:</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8D5B4C] shadow-[0_0_8px_#8D5B4C]" /> كثيفة (&ge;0.30)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#A0522D]" /> متوازنة (0.20-0.30)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#B86B53]" /> خفيفة (0.14-0.20)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> تربة (&lt;0.14)</span>
              </>
            ) : (
              <>
                <span className="font-extrabold text-[#8D5B4C]">NDWI Stress:</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" /> ري مثالي (&ge;0.02)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> رطوبة متوازنة</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> جفاف خفيف</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" /> إجهاد حاد ⚠️</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Top Right Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 bg-[#16212b]/95 hover:bg-[#1f2d3a] border border-[#2e4052] text-[#F9F8F6] font-bold p-2.5 rounded-2xl transition-all z-20 shadow-2xl active:scale-95 backdrop-blur-2xl"
        title={t("common.close")}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </>
  );
});
