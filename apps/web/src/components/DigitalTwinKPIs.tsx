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
        <div className="bg-[#1f2d3a] border border-[#2e4052] hover:border-[#8D5B4C]/40 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between text-[#A8A093] text-[10px] font-bold uppercase tracking-wider">
            <span>الصحة الإجمالية</span>
            <span>🤎</span>
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-black text-[#F9F8F6] font-mono">
              {satelliteData?.canopyCover?.meanPct && satelliteData.canopyCover.meanPct > 5
                ? `${Math.min(100, Math.max(60, Math.round(satelliteData.canopyCover.meanPct * 0.5 + (satelliteData.savi?.mean || 0.2) * 200)))}`
                : "0"}
            </span>
            <span className="text-[#A8A093] font-bold">/100</span>
          </div>
          <p className="text-[10px] font-bold text-[#8D5B4C]">
            {satelliteData?.canopyCover?.meanPct && satelliteData.canopyCover.meanPct > 5 ? "حالة صحية ممتازة 🟢" : "أرض فارغة / بور 🏜️"}
          </p>
        </div>

        {/* KPI 2: Canopy Cover % */}
        <div className="bg-[#1f2d3a] border border-[#2e4052] hover:border-[#8D5B4C]/40 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between text-[#A8A093] text-[10px] font-bold uppercase tracking-wider">
            <span>كثافة العرش الحقيقية</span>
            <span>🌳</span>
          </div>
          <div className="flex items-baseline gap-1 pt-1">
            <span className="text-2xl font-black text-[#F9F8F6] font-mono">
              {satelliteData?.canopyCover?.meanPct || 0}%
            </span>
          </div>
          <p className="text-[10px] font-bold text-[#D8D2C5]">
            {satelliteData?.canopyCover?.meanPct >= 35 ? "عرش كثيف متجانس 🟢" : (satelliteData?.canopyCover?.meanPct >= 18 ? "عرش متوازن 🟢" : "0% أشجار 🔴")}
          </p>
        </div>

        {/* KPI 3: GDD Accumulation & Stage */}
        <div className="bg-[#1f2d3a] border border-[#2e4052] hover:border-[#8D5B4C]/40 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between text-[#A8A093] text-[10px] font-bold uppercase tracking-wider">
            <span>المرحلة & GDD</span>
            <span>🌡️</span>
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-black text-[#C5A059] font-mono">
              {summary ? summary.accumulatedGdd.toFixed(0) : "1805"}
            </span>
            <span className="text-[#A8A093] font-bold">GDD</span>
          </div>
          <p className="text-[10px] font-bold text-[#8D5B4C] truncate">
            {summary ? stageLabels[summary.currentStage] : "🎨 تلوين الثمرة"}
          </p>
        </div>

        {/* KPI 4: Water Stress Index (NDWI) */}
        <div className="bg-[#1f2d3a] border border-[#2e4052] hover:border-[#8D5B4C]/40 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between text-[#A8A093] text-[10px] font-bold uppercase tracking-wider">
            <span>الإجهاد المائي (NDWI)</span>
            <span>💧</span>
          </div>
          <div className="flex items-baseline gap-1 pt-1">
            <span className="text-2xl font-black text-[#F9F8F6] font-mono">
              {satelliteData?.ndwi?.hydricStressPct || 0}%
            </span>
          </div>
          <p className="text-[10px] font-bold text-[#D8D2C5]">
            {satelliteData?.ndwi?.hydricStressPct > 20 ? "إجهاد مائي كاشف ⚠️" : "ري متوازن 100% 💧"}
          </p>
        </div>
      </div>

      {/* Satellite Agronomic Advice Banner */}
      {satelliteData?.agronomicAdvice && (
        <div className="p-4 bg-[#1f2d3a] border border-[#8D5B4C]/40 rounded-2xl flex items-start gap-3 shadow-xl">
          <span className="text-xl p-2 bg-[#8D5B4C]/20 border border-[#8D5B4C]/30 rounded-xl">📡</span>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black text-[#8D5B4C] uppercase tracking-wider">
                التحليل الطيفي الفضائي (Sentinel-2A • 10m)
              </span>
              {satelliteData.lastPassDate && satelliteData.lastPassDate !== "N/A" && (
                <span className="text-[9px] font-mono text-[#F9F8F6] bg-[#2C3E50] border border-[#2e4052] px-2 py-0.5 rounded-lg font-bold">
                  📅 تصوير: {satelliteData.lastPassDate}
                </span>
              )}
              {satelliteData.phenologyProfile && (
                <span className="text-[9px] font-mono text-[#F9F8F6] bg-[#8D5B4C]/20 border border-[#8D5B4C]/30 px-2 py-0.5 rounded-lg font-bold">
                  📈 90d: {satelliteData.phenologyProfile.landCoverClassAr} ({satelliteData.phenologyProfile.deltaNdvi} ΔNDVI)
                </span>
              )}
            </div>
            <p className="text-xs text-[#F9F8F6] font-medium leading-relaxed">
              {satelliteData.agronomicAdvice}
            </p>
          </div>
        </div>
      )}
    </>
  );
});
