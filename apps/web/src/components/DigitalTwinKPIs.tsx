import React from "react";

export interface DigitalTwinKPIsProps {
  satelliteData: any;
  summary: any;
  stageLabels: Record<string, string>;
}

export const DigitalTwinKPIs = React.memo(function DigitalTwinKPIs({
  satelliteData,
  summary,
  stageLabels
}: DigitalTwinKPIsProps) {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* KPI 1: Overall Health Score */}
        <div className="bg-slate-900/80 border border-emerald-500/20 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>الصحة الإجمالية</span>
            <span>💚</span>
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {satelliteData?.canopyCover?.meanPct && satelliteData.canopyCover.meanPct > 5
                ? `${Math.min(100, Math.max(60, Math.round(satelliteData.canopyCover.meanPct * 0.5 + (satelliteData.savi?.mean || 0.2) * 200)))}`
                : "0"}
            </span>
            <span className="text-slate-500 font-bold">/100</span>
          </div>
          <p className="text-[10px] font-bold text-emerald-300/80">
            {satelliteData?.canopyCover?.meanPct && satelliteData.canopyCover.meanPct > 5 ? "حالة صحية ممتازة 🟢" : "أرض فارغة / بور 🏜️"}
          </p>
        </div>

        {/* KPI 2: Canopy Cover % */}
        <div className="bg-slate-900/80 border border-emerald-500/20 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>كثافة العرش الحقيقية</span>
            <span>🌳</span>
          </div>
          <div className="flex items-baseline gap-1 pt-1">
            <span className="text-2xl font-black text-white font-mono">
              {satelliteData?.canopyCover?.meanPct || 0}%
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400">
            {satelliteData?.canopyCover?.meanPct >= 35 ? "عرش كثيف متجانس 🟢" : (satelliteData?.canopyCover?.meanPct >= 18 ? "عرش متوازن 🟢" : "0% أشجار 🔴")}
          </p>
        </div>

        {/* KPI 3: GDD Accumulation & Stage */}
        <div className="bg-slate-900/80 border border-amber-500/20 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>المرحلة & GDD</span>
            <span>🌡️</span>
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-black text-amber-400 font-mono">
              {summary ? summary.accumulatedGdd.toFixed(0) : "1805"}
            </span>
            <span className="text-slate-500 font-bold">GDD</span>
          </div>
          <p className="text-[10px] font-bold text-amber-300/90 truncate">
            {summary ? stageLabels[summary.currentStage] : "🎨 تلوين الثمرة"}
          </p>
        </div>

        {/* KPI 4: Water Stress Index (NDWI) */}
        <div className="bg-slate-900/80 border border-blue-500/20 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>الإجهاد المائي (NDWI)</span>
            <span>💧</span>
          </div>
          <div className="flex items-baseline gap-1 pt-1">
            <span className="text-2xl font-black text-blue-400 font-mono">
              {satelliteData?.ndwi?.hydricStressPct || 0}%
            </span>
          </div>
          <p className="text-[10px] font-bold text-blue-300/80">
            {satelliteData?.ndwi?.hydricStressPct > 20 ? "إجهاد مائي كاشف ⚠️" : "ري متوازن 100% 💧"}
          </p>
        </div>
      </div>

      {/* Satellite Agronomic Advice Banner */}
      {satelliteData?.agronomicAdvice && (
        <div className="p-4 bg-slate-900/90 border border-emerald-500/30 rounded-2xl flex items-start gap-3 shadow-xl">
          <span className="text-xl p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">📡</span>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                التحليل الطيفي الفضائي (Sentinel-2A • 10m)
              </span>
              {satelliteData.lastPassDate && satelliteData.lastPassDate !== "N/A" && (
                <span className="text-[9px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-lg font-bold">
                  📅 تصوير: {satelliteData.lastPassDate}
                </span>
              )}
              {satelliteData.phenologyProfile && (
                <span className="text-[9px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg font-bold">
                  📈 90d: {satelliteData.phenologyProfile.landCoverClassAr} ({satelliteData.phenologyProfile.deltaNdvi} ΔNDVI)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              {satelliteData.agronomicAdvice}
            </p>
          </div>
        </div>
      )}
    </>
  );
});
