import React from "react";

export interface SpectralLayerSwitcherProps {
  satelliteMode: "SATELLITE" | "CANOPY" | "SAVI" | "NDVI" | "NDWI";
  setSatelliteMode: (mode: "SATELLITE" | "CANOPY" | "SAVI" | "NDVI" | "NDWI") => void;
  satelliteData: any;
  loadingSatellite: boolean;
  onClose: () => void;
  onShowGuide?: () => void;
}

export const SpectralLayerSwitcher = React.memo(function SpectralLayerSwitcher({
  satelliteMode,
  setSatelliteMode,
  satelliteData,
  loadingSatellite,
  onClose,
}: SpectralLayerSwitcherProps) {
  return (
    <>
      <div className="absolute top-3 left-3 right-14 z-20 flex items-center justify-between pointer-events-auto flex-wrap gap-2">
        <div className="bg-slate-950/85 backdrop-blur-xl border border-white/15 rounded-2xl p-1.5 flex items-center gap-1 shadow-2xl overflow-x-auto scrollbar-none max-w-full">
          <button
            type="button"
            onClick={() => setSatelliteMode("SATELLITE")}
            className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center gap-1.5 ${
              satelliteMode === "SATELLITE"
                ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.5)] font-black"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🛰️</span>
            <span>طبيعي</span>
            {loadingSatellite && <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />}
          </button>

          <button
            type="button"
            onClick={() => setSatelliteMode("CANOPY")}
            className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center gap-1.5 ${
              satelliteMode === "CANOPY"
                ? "bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.5)] font-black"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🌳</span>
            <span>كثافة الأشجار</span>
            {satelliteData?.canopyCover && (
              <span className="bg-slate-950/50 text-emerald-300 px-2 py-0.5 rounded-lg font-mono text-[10px] font-bold border border-emerald-500/30">
                {satelliteData.canopyCover.meanPct}%
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSatelliteMode("SAVI")}
            className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center gap-1.5 ${
              satelliteMode === "SAVI"
                ? "bg-teal-400 text-slate-950 shadow-[0_0_15px_rgba(45,212,191,0.5)] font-black"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🌿</span>
            <span>صحة SAVI</span>
            {satelliteData?.savi && (
              <span className="bg-slate-950/50 text-teal-300 px-2 py-0.5 rounded-lg font-mono text-[10px] font-bold border border-teal-500/30">
                {satelliteData.savi.mean}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSatelliteMode("NDVI")}
            className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center gap-1.5 ${
              satelliteMode === "NDVI"
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.5)] font-black"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🌱</span>
            <span>الغطاء NDVI</span>
            {satelliteData?.ndvi && (
              <span className="bg-slate-950/50 text-cyan-300 px-2 py-0.5 rounded-lg font-mono text-[10px] font-bold border border-cyan-500/30">
                {satelliteData.ndvi.mean}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSatelliteMode("NDWI")}
            className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center gap-1.5 ${
              satelliteMode === "NDWI"
                ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] font-black"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>💧</span>
            <span>الإجهاد NDWI</span>
            {satelliteData?.ndwi && (
              <span className="bg-slate-950/50 text-blue-300 px-2 py-0.5 rounded-lg font-mono text-[10px] font-bold border border-blue-500/30">
                {satelliteData.ndwi.hydricStressPct}%
              </span>
            )}
          </button>
        </div>

        {/* Satellite Data Source Pulse Badge */}
        {satelliteData && (
          <div className={`bg-slate-950/90 backdrop-blur-xl border px-3 py-1.5 rounded-2xl text-[10px] font-bold flex items-center gap-2 shadow-xl ${
            satelliteData.dataSource === "sentinel-2-real"
              ? "border-emerald-500/40 text-emerald-400"
              : "border-amber-500/40 text-amber-400"
          }`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              satelliteData.dataSource === "sentinel-2-real" ? "bg-emerald-400 shadow-[0_0_8px_#10b981]" : "bg-amber-400"
            }`} />
            <span>{satelliteData.dataSource === "sentinel-2-real" ? "Sentinel-2A • 10m ✓" : "تقريبي (Demo)"}</span>
          </div>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 bg-slate-950/80 hover:bg-slate-800 border border-white/20 hover:border-white/40 text-white font-bold p-2.5 rounded-full transition-all z-20 shadow-2xl active:scale-95 backdrop-blur-md"
        title="Fermer / إغلاق"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Legend Banner when CANOPY / SAVI / NDVI or NDWI is active */}
      {satelliteMode !== "SATELLITE" && (
        <div className="absolute top-16 left-3 z-20 bg-slate-950/90 backdrop-blur-xl border border-white/15 px-3.5 py-2 rounded-2xl text-[10px] font-mono text-slate-300 flex items-center gap-3 shadow-2xl animate-in fade-in flex-wrap">
          {satelliteMode === "CANOPY" ? (
            <>
              <span className="font-bold text-emerald-400">كثافة الأشجار الحقيقية (% Cover):</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> كثيفة عالية (&ge;35%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-lime-500"></span> متوازنة (18%-35%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> خفيفة/فتية (8%-18%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> تربة/أرض محصودة (0%)</span>
            </>
          ) : satelliteMode === "SAVI" ? (
            <>
              <span className="font-bold text-emerald-400">صحة الأشجار (SAVI):</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> ممتازة (&ge;0.28)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-lime-500"></span> جيدة (0.20-0.28)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> متوسطة (0.14-0.20)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> ضعيفة (&lt;0.14)</span>
            </>
          ) : satelliteMode === "NDVI" ? (
            <>
              <span className="font-bold text-teal-400">الغطاء النباتي (NDVI):</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> كثيفة (&ge;0.30)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-lime-500"></span> متوازنة (0.20-0.30)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> خفيفة (0.14-0.20)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> تربة/ضعيفة (&lt;0.14)</span>
            </>
          ) : (
            <>
              <span className="font-bold text-blue-400">دليل الإجهاد المائي:</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> ري مثالي (&ge;0.02)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> رطوبة متوازنة</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> جفاف خفيف</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> إجهاد حاد ⚠️</span>
            </>
          )}
        </div>
      )}
    </>
  );
});
