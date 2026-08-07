import React from "react";
import { useTranslation } from "react-i18next";

export interface DigitalTwinKPIsProps {
  satelliteData: any;
  summary: any;
  stageLabels: Record<string, string>;
}

function computeHealthScore(satelliteData: any): number {
  if (!satelliteData) return -1; // -1 = loading
  const canopyPct = satelliteData.canopyCover?.meanPct || 0;
  const saviMean = satelliteData.savi?.mean || 0;
  const ndviMean = satelliteData.ndvi?.mean || 0;
  const stressPct = satelliteData.ndwi?.hydricStressPct || 0;

  if (canopyPct < 5) return 0; // bare land

  // Weighted composite: 30% canopy density + 30% SAVI vigor + 25% NDVI + 15% moisture balance
  const canopyScore = Math.min(100, canopyPct * 2.5);
  const saviScore = Math.min(100, Math.max(0, (saviMean - 0.08) / 0.32 * 100));
  const ndviScore = Math.min(100, Math.max(0, (ndviMean - 0.10) / 0.50 * 100));
  const moistureScore = Math.max(0, 100 - stressPct * 2);

  return Math.round(canopyScore * 0.30 + saviScore * 0.30 + ndviScore * 0.25 + moistureScore * 0.15);
}

function getHealthStatus(score: number, isAr: boolean): { text: string; color: string } {
  if (score < 0) return { text: isAr ? "جارٍ التحليل..." : "Analyse en cours...", color: "#A8A093" };
  if (score === 0) return { text: isAr ? "أرض بور فارغة 🏜️" : "Sol nu / Jachère 🏜️", color: "#8D5B4C" };
  if (score >= 85) return { text: isAr ? "حالة صحية ممتازة 🟢" : "Excellente santé 🟢", color: "#10B981" };
  if (score >= 70) return { text: isAr ? "حالة صحية جيدة 🟡" : "Bonne santé 🟡", color: "#C5A059" };
  if (score >= 50) return { text: isAr ? "حالة متوسطة ⚠️" : "Santé modérée ⚠️", color: "#F59E0B" };
  return { text: isAr ? "حالة تستدعي الانتباه 🔴" : "Attention requise 🔴", color: "#EF4444" };
}

const LoadingPulse = () => (
  <span className="inline-block w-12 h-6 bg-[#2e4052] rounded animate-pulse" />
);

export const DigitalTwinKPIs = React.memo(function DigitalTwinKPIs({
  satelliteData,
  summary,
  stageLabels
}: DigitalTwinKPIsProps) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const isLoading = satelliteData === null;
  const healthScore = computeHealthScore(satelliteData);
  const healthStatus = getHealthStatus(healthScore, isAr);

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
              {isLoading ? <LoadingPulse /> : healthScore}
            </span>
            <span className="text-[#A8A093] font-bold">/100</span>
          </div>
          <p className="text-[10px] font-bold" style={{ color: healthStatus.color }}>
            {healthStatus.text}
          </p>
        </div>

        {/* KPI 2: Canopy Cover % (fCOVER) */}
        <div className="bg-[#1f2d3a] border border-[#2e4052] hover:border-[#8D5B4C]/40 p-4 rounded-2xl space-y-1 shadow-lg relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between text-[#A8A093] text-[10px] font-bold uppercase tracking-wider">
            <span>{t("workspace.kpis.canopyCover")}</span>
            <span>🌳</span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-2xl font-black text-[#F9F8F6] font-mono">
              {isLoading ? <LoadingPulse /> : `${satelliteData?.canopyCover?.meanPct || 0}%`}
            </span>
          </div>
          <p className="text-[10px] font-bold text-[#D8D2C5] truncate">
            {isLoading
              ? (isAr ? "جارٍ تحليل الغطاء النباتي..." : "Analyse du couvert en cours...")
              : (() => {
                const category = satelliteData?.treeCrowns?.landCoverCategory;
                const pct = satelliteData?.canopyCover?.meanPct || 0;

                if (category === "BARE_FALLOW_LAND" || pct < 5) {
                  return isAr ? "🏜️ أرض بور فارغة" : "🏜️ Sol nu / Jachère";
                }
                if (category === "SEASONAL_ANNUAL_CROP") {
                  return isAr ? "🌾 محصول حقلي موسمي" : "🌾 Culture saisonnière";
                }
                if (pct >= 35) {
                  return isAr ? "عرش كثيف متجانس 🟢" : "Canopée dense 🟢";
                }
                if (pct >= 18) {
                  return isAr ? "عرش متوازن 🟢" : "Canopée équilibrée 🟢";
                }
                return isAr ? "غطاء نباتي فتئ 🟡" : "Couvert jeune 🟡";
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
              {isLoading ? <LoadingPulse /> : `${satelliteData?.ndwi?.hydricStressPct ?? 0}%`}
            </span>
          </div>
          <p className="text-[10px] font-bold text-[#D8D2C5]">
            {isLoading
              ? (isAr ? "جارٍ تحليل الرطوبة..." : "Analyse hydrique en cours...")
              : (() => {
                const stressPct = satelliteData?.ndwi?.hydricStressPct ?? 0;
                const ndwiMean = satelliteData?.ndwi?.mean;
                const ndwiLabel = ndwiMean !== undefined ? ` (NDWI: ${ndwiMean.toFixed(2)})` : "";
                if (stressPct > 25) return (isAr ? `إجهاد مائي مرتفع ⚠️${ndwiLabel}` : `Stress hydrique élevé ⚠️${ndwiLabel}`);
                if (stressPct > 10) return (isAr ? `إجهاد مائي خفيف 💡${ndwiLabel}` : `Stress léger 💡${ndwiLabel}`);
                return (isAr ? `ري متوازن 💧${ndwiLabel}` : `Irrigation équilibrée 💧${ndwiLabel}`);
              })()}
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
              {satelliteData.dataSource && (
                <span className="text-[9px] font-mono text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-2 py-0.5 rounded-lg font-bold">
                  🛰️ {satelliteData.dataSource === "sentinel-2-real" ? "Sentinel-2 L2A" : (isAr ? "نموذج تقريبي" : "Modèle approx.")}
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
