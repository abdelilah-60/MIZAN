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

  const getCurrentValue = () => {
    if (loadingSatellite) return "...";
    if (!satelliteData) return null;
    switch (satelliteMode) {
      case "CANOPY":
        return satelliteData.canopyCover ? `${satelliteData.canopyCover.meanPct}%` : null;
      case "SAVI":
        return satelliteData.savi ? satelliteData.savi.mean : null;
      case "NDVI":
        return satelliteData.ndvi ? satelliteData.ndvi.mean : null;
      case "NDWI":
        return satelliteData.ndwi ? `${satelliteData.ndwi.hydricStressPct}%` : null;
      default:
        return null;
    }
  };

  const currentValue = getCurrentValue();

  return (
    <>
      {/* Top Left Floating Dropdown & Legend Container */}
      <div className="absolute top-3 left-3 right-14 z-30 flex items-center gap-2.5 pointer-events-auto flex-wrap">
        {/* Sleek Dropdown Menu Selector */}
        <div className="relative flex items-center">
          <select
            value={satelliteMode}
            onChange={(e) => setSatelliteMode(e.target.value as any)}
            className="bg-[#16212b]/95 hover:bg-[#1f2d3a] border border-[#8D5B4C]/60 text-[#F9F8F6] text-xs font-bold py-2 pl-3.5 pr-8 rounded-2xl shadow-2xl backdrop-blur-2xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8D5B4C] transition-all"
            aria-label="Sélectionner le mode طيفي"
          >
            <option value="SATELLITE" className="bg-[#16212b] text-[#F9F8F6]">🛰️ Naturel (طبيعي)</option>
            <option value="CANOPY" className="bg-[#16212b] text-[#F9F8F6]">🌳 Cover % (كثافة الأشجار - fCOVER)</option>
            <option value="SAVI" className="bg-[#16212b] text-[#F9F8F6]">🌿 SAVI (صحة الأشجار - SAVI Index)</option>
            <option value="NDVI" className="bg-[#16212b] text-[#F9F8F6]">🌱 NDVI (الغطاء النباتي - NDVI Index)</option>
            <option value="NDWI" className="bg-[#16212b] text-[#F9F8F6]">💧 NDWI (الإجهاد المائي - NDWI Stress)</option>
          </select>
          <span className="absolute right-3 pointer-events-none text-xs text-[#8D5B4C]">▼</span>
        </div>

        {/* Current Spectral Value Pill */}
        {currentValue && (
          <span className="bg-[#1f2d3a] text-[#8D5B4C] border border-[#8D5B4C]/40 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shadow-lg backdrop-blur-2xl">
            {currentValue}
          </span>
        )}

        {/* Legend Banner stacked beside dropdown cleanly */}
        {satelliteMode !== "SATELLITE" && (
          <div className="bg-[#16212b]/95 backdrop-blur-2xl border border-[#2e4052] px-3.5 py-1.5 rounded-2xl text-[10px] font-mono text-[#D8D2C5] flex items-center gap-2.5 shadow-2xl animate-in fade-in flex-wrap">
            {satelliteMode === "CANOPY" ? (
              <>
                <span className="font-extrabold text-[#8D5B4C]">fCOVER (%):</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#8D5B4C] shadow-[0_0_8px_#8D5B4C]" /> كثيفة (&ge;35%)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#A0522D]" /> متوازنة (18-35%)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#B86B53]" /> فتية (8-18%)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> تربة (0%)</span>
              </>
            ) : satelliteMode === "SAVI" ? (
              <>
                <span className="font-extrabold text-[#8D5B4C]">SAVI:</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#8D5B4C] shadow-[0_0_8px_#8D5B4C]" /> ممتازة (&ge;0.28)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#A0522D]" /> جيدة (0.20-0.28)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#B86B53]" /> متوسطة (0.14-0.20)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> ضعيفة (&lt;0.14)</span>
              </>
            ) : satelliteMode === "NDVI" ? (
              <>
                <span className="font-extrabold text-[#8D5B4C]">NDVI:</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#8D5B4C] shadow-[0_0_8px_#8D5B4C]" /> كثيفة (&ge;0.30)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#A0522D]" /> متوازنة (0.20-0.30)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#B86B53]" /> خفيفة (0.14-0.20)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> تربة (&lt;0.14)</span>
              </>
            ) : (
              <>
                <span className="font-extrabold text-[#8D5B4C]">NDWI:</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" /> ري مثالي (&ge;0.02)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> رطوبة متوازنة</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> جفاف خفيف</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" /> إجهاد حاد ⚠️</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Top Right Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 bg-[#16212b]/95 hover:bg-[#1f2d3a] border border-[#2e4052] text-[#F9F8F6] font-bold p-2.5 rounded-2xl transition-all z-30 shadow-2xl active:scale-95 backdrop-blur-2xl pointer-events-auto"
        title={t("common.close")}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </>
  );
});
