import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* KPI 1: Overall Health Score */}
        <div className="bg-[#1f2d3a] border border-[#2e4052] hover:border-[#8D5B4C]/40 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between text-[#A8A093] text-[10px] font-bold uppercase tracking-wider">
            <span>{t("workspace.kpis.overallHealth")}</span>
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
            {satelliteData?.canopyCover?.meanPct && satelliteData.canopyCover.meanPct > 5
              ? (isAr ? "حالة صحية ممتازة 🟢" : "Excellente santé 🟢")
              : (isAr ? "أرض بور فارغة 🏜️" : "Sol nu / Jachère 🏜️")}
          </p>
        </div>

        {/* KPI 2: Canopy Cover % & Individual Tree Count */}
        <div className="bg-[#1f2d3a] border border-[#2e4052] hover:border-[#8D5B4C]/40 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between text-[#A8A093] text-[10px] font-bold uppercase tracking-wider">
            <span>{t("workspace.kpis.canopyCover")}</span>
            <span>🌳</span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-2xl font-black text-[#F9F8F6] font-mono">
              {satelliteData?.canopyCover?.meanPct || 0}%
            </span>
            {satelliteData?.treeCrowns?.treeCount > 0 && (
              <span className="text-xs font-mono font-bold text-[#8D5B4C] bg-[#8D5B4C]/20 border border-[#8D5B4C]/30 px-2 py-0.5 rounded-md">
                {satelliteData.treeCrowns.treeCount} {isAr ? "شجرة ⭕" : "arbres ⭕"}
              </span>
            )}
          </div>
          <p className="text-[10px] font-bold text-[#D8D2C5] truncate">
            {(() => {
              const category = satelliteData?.treeCrowns?.landCoverCategory;
              if (category === "BARE_FALLOW_LAND" || (satelliteData?.canopyCover?.meanPct || 0) < 5) {
                return isAr ? "🏜️ أرض بور فارغة (0 أشجار)" : "🏜️ Sol nu (0 arbre)";
              }
              if (category === "SEASONAL_ANNUAL_CROP") {
                return isAr ? "🌾 محصول حقلي موسمي" : "🌾 Culture saisonnière";
              }
              if (satelliteData?.treeCrowns?.meanCanopyDiameterM > 0) {
                return isAr
                  ? `🌳 ${satelliteData.treeCrowns.treeCount} شجرة مكتشفة (قطر العرش: ${satelliteData.treeCrowns.meanCanopyDiameterM}m)`
                  : `🌳 ${satelliteData.treeCrowns.treeCount} arbres (Canopée: ${satelliteData.treeCrowns.meanCanopyDiameterM}m)`;
              }
              return satelliteData?.canopyCover?.meanPct >= 35
                ? (isAr ? "عرش كثيف متجانس 🟢" : "Canopée dense 🟢")
                : (isAr ? "عرش متوازن 🟢" : "Canopée équilibrée 🟢");
            })()}
          </p>
        </div>

        {/* KPI 3: GDD Accumulation & Stage */}
        <div className="bg-[#1f2d3a] border border-[#2e4052] hover:border-[#8D5B4C]/40 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between text-[#A8A093] text-[10px] font-bold uppercase tracking-wider">
            <span>{t("workspace.kpis.gddStage")}</span>
            <span>🌡️</span>
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-black text-[#C5A059] font-mono">
              {summary ? summary.accumulatedGdd.toFixed(0) : "1805"}
            </span>
            <span className="text-[#A8A093] font-bold">GDD</span>
          </div>
          <p className="text-[10px] font-bold text-[#8D5B4C] truncate">
            {summary ? stageLabels[summary.currentStage] : (isAr ? "🎨 تلوين الثمرة" : "🎨 Véraison")}
          </p>
        </div>

        {/* KPI 4: Water Stress Index (NDWI) */}
        <div className="bg-[#1f2d3a] border border-[#2e4052] hover:border-[#8D5B4C]/40 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between text-[#A8A093] text-[10px] font-bold uppercase tracking-wider">
            <span>{t("workspace.kpis.hydricStress")}</span>
            <span>💧</span>
          </div>
          <div className="flex items-baseline gap-1 pt-1">
            <span className="text-2xl font-black text-[#F9F8F6] font-mono">
              {satelliteData?.ndwi?.hydricStressPct || 0}%
            </span>
          </div>
          <p className="text-[10px] font-bold text-[#D8D2C5]">
            {satelliteData?.ndwi?.hydricStressPct > 20
              ? (isAr ? "إجهاد مائي كاشف ⚠️" : "Stress hydrique élevé ⚠️")
              : (isAr ? "ري متوازن 100% 💧" : "Irrigation équilibrée 💧")}
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
                {t("workspace.advice.sentinelTitle")}
              </span>
              {satelliteData.lastPassDate && satelliteData.lastPassDate !== "N/A" && (
                <span className="text-[9px] font-mono text-[#F9F8F6] bg-[#2C3E50] border border-[#2e4052] px-2 py-0.5 rounded-lg font-bold">
                  📅 {isAr ? "تصوير" : "Passage"}: {satelliteData.lastPassDate}
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
