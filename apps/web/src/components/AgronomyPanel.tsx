import React, { useState } from "react";
import type { AgronomyData, AgronomyForm, OperationData, Field } from "../lib/types";
import { useTranslation } from "react-i18next";
import { FieldSettingsModal } from "./FieldSettingsModal";

interface AgronomyPanelProps {
  data: AgronomyData;
  form: AgronomyForm;
  onFormChange: (form: AgronomyForm) => void;
  onSave: (fieldId: string, section: "irrigation" | "soil" | "yield") => void;
  fieldId: string;
  operationsData?: OperationData[];
  field: Field;
}

export const AgronomyPanel = React.memo(function AgronomyPanel({
  data,
  form,
  onFormChange,
  onSave,
  fieldId,
  operationsData,
  field,
}: AgronomyPanelProps) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isIrrigationOpen, setIsIrrigationOpen] = useState(false);
  const [isFertilizationOpen, setIsFertilizationOpen] = useState(false);

  const durationMinutes = data.recommendations?.water?.durationMinutes || 0;
  const durationHours = (durationMinutes / 60).toFixed(1);

  const loggedNpk = React.useMemo(() => {
    let totalN = 0;
    let totalP = 0;
    let totalK = 0;

    if (operationsData) {
      operationsData.forEach((op) => {
        if (op.type === "FERTILIZER") {
          const meta = (op.metadata || {}) as any;
          const qty = Number(meta.quantity || 0);
          
          if (meta.fertilizerType === "NPK") {
            const nPct = Number(meta.n_percent || 0);
            const pPct = Number(meta.p_percent || 0);
            const kPct = Number(meta.k_percent || 0);
            totalN += qty * (nPct / 100);
            totalP += qty * (pPct / 100);
            totalK += qty * (kPct / 100);
          } else if (meta.fertilizerType === "AMMONITRATE") {
            totalN += qty * 0.335;
          } else if (meta.fertilizerType === "UREA") {
            totalN += qty * 0.46;
          } else if (meta.fertilizerType === "ORGANIC") {
            totalN += qty * 0.02;
            totalP += qty * 0.01;
            totalK += qty * 0.02;
          }
        } else if (op.type === "ORGANIC_AMENDMENT") {
          const meta = (op.metadata || {}) as any;
          const qty = Number(meta.quantity || 0);
          const typeVal = meta.fertilizerType || "BOVINE";
          
          if (meta.unit === "Kg/arbre") {
            const treeDensity = form.treeDensity ? Number(form.treeDensity) : 200;
            const area = field?.area || 1.0;
            const totalTrees = Math.round(treeDensity * area) || 200;
            const totalKg = qty * totalTrees;
            
            if (typeVal === "BOVINE") {
              totalN += totalKg * 0.006;
              totalP += totalKg * 0.003;
              totalK += totalKg * 0.005;
            } else if (typeVal === "OVINE") {
              totalN += totalKg * 0.009;
              totalP += totalKg * 0.005;
              totalK += totalKg * 0.008;
            } else {
              totalN += totalKg * 0.015;
              totalP += totalKg * 0.01;
              totalK += totalKg * 0.015;
            }
          } else {
            const totalKg = qty * 1000;
            if (typeVal === "BOVINE") {
              totalN += totalKg * 0.006;
              totalP += totalKg * 0.003;
              totalK += totalKg * 0.005;
            } else if (typeVal === "OVINE") {
              totalN += totalKg * 0.009;
              totalP += totalKg * 0.005;
              totalK += totalKg * 0.008;
            } else {
              totalN += totalKg * 0.015;
              totalP += totalKg * 0.01;
              totalK += totalKg * 0.015;
            }
          }
        }
      });
    }

    return { n: totalN, p: totalP, k: totalK };
  }, [operationsData, field?.area, form.treeDensity]);

  const area = field?.area || 1.0;
  const loggedN_ha = loggedNpk.n / area;
  const loggedP_ha = loggedNpk.p / area;
  const loggedK_ha = loggedNpk.k / area;

  const recN = data.recommendations?.npk?.n || 0;
  const recP = data.recommendations?.npk?.p || 0;
  const recK = data.recommendations?.npk?.k || 0;

  const pctN = recN > 0 ? (loggedN_ha / recN) * 100 : 0;
  const pctP = recP > 0 ? (loggedP_ha / recP) * 100 : 0;
  const pctK = recK > 0 ? (loggedK_ha / recK) * 100 : 0;

  const biologicalCeiling = React.useMemo(() => {
    const irSys = field.agronomicData?.["Système d Irrigation"] || "";
    const isIrr = irSys === "Goutte à goutte" || irSys === "Aspersion" || irSys === "Gravitaire" || irSys === "Micro-aspersion";
    
    const baseTreeCap = isIrr ? 45 : 18;
    
    let varFactor = 1.0;
    const cropName = field.cropType || "";
    if (cropName.includes("Arbequina")) varFactor = 1.25;
    else if (cropName.includes("Dahbia")) varFactor = 0.8;
    else if (cropName.includes("Meslala")) varFactor = 0.95;
    else if (cropName.includes("Picholine")) varFactor = 1.05;
    
    const density = Number(form.treeDensity) || 200;
    const computedCeiling = (density * baseTreeCap * varFactor) / 1000;
    
    if (isIrr) {
      const maxCap = density >= 600 ? 25.0 : density >= 300 ? 18.0 : density >= 150 ? 15.0 : 12.0;
      return Math.min(maxCap, Math.max(4.0, computedCeiling));
    } else {
      return Math.min(6.0, Math.max(1.0, computedCeiling));
    }
  }, [field.agronomicData, field.cropType, form.treeDensity]);

  const densityPerHa = form.treeDensity ? Number(form.treeDensity) : 200;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Title & Fluid Technical Settings Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2e4052] pb-4">
        <div>
          <h4 className="text-base font-black text-[#F9F8F6] flex items-center gap-2">
            <span>🧪</span>
            <span>{isAr ? "برنامج التسميد والري الزراعي الدقيق" : "Programme de fertirrigation & Recommandations"}</span>
          </h4>
          <p className="text-xs text-[#D8D2C5] mt-0.5">
            {isAr ? "حساب الاحتياجات المائية والسمادية اليومية بناءً على الطقس والخصائص الفيزيائية" : "Bilan hydrique et fertilisation calculés d'après le climat et l'analyse de sol"}
          </p>
        </div>

        {/* Fluid Settings Quick Action Button */}
        <button
          type="button"
          onClick={() => setIsSettingsModalOpen(true)}
          className="bg-[#1f2d3a] hover:bg-[#28394a] border border-[#8D5B4C]/50 text-[#F9F8F6] text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center gap-2 self-start sm:self-auto"
        >
          <span>⚙️</span>
          <span>{isAr ? "إعدادات ومعايير القطعة" : "Paramètres de la parcelle"}</span>
        </button>
      </div>

      {/* FULL-WIDTH ACCORDION CARDS CONTAINER */}
      <div className="space-y-4">
        
        {/* ACCORDION 1: Irrigation & Water Budget Card */}
        <div className="bg-[#1f2d3a] border border-[#2e4052] rounded-3xl overflow-hidden shadow-xl transition-all">
          
          {/* Header Button */}
          <button
            type="button"
            onClick={() => setIsIrrigationOpen(!isIrrigationOpen)}
            className="w-full p-4 sm:p-5 bg-[#1f2d3a] hover:bg-[#28394a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right dir-rtl transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-xl text-sky-400 flex-shrink-0">
                💧
              </div>
              <div>
                <h5 className="text-sm font-black text-[#F9F8F6] flex items-center gap-2">
                  <span>{isAr ? "الميزانية والجدول المائي اليومي" : "Bilan et plan d'irrigation quotidien"}</span>
                </h5>
                <p className="text-[11px] text-[#A8A093] font-mono">
                  ET0: <span className="text-[#F9F8F6] font-bold">{data.recommendations?.water?.et0 || 0}</span> mm &bull; ETc: <span className="text-[#F9F8F6] font-bold">{data.recommendations?.water?.etc || 0}</span> mm
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="text-left sm:text-right">
                <span className="text-xs font-black text-[#8D5B4C] font-mono block">
                  {data.recommendations?.water?.litersPerTree || 0} {isAr ? "لتر/شجرة" : "L/arbre"}
                </span>
                <span className="text-[10px] font-mono text-[#D8D2C5]">
                  ⏱️ {durationHours} {isAr ? "ساعة" : "h"} ({durationMinutes}m)
                </span>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#16212b] border border-[#2e4052] flex items-center justify-center text-xs text-[#F9F8F6]">
                {isIrrigationOpen ? "▲" : "▼"}
              </div>
            </div>
          </button>

          {/* Collapsible Content */}
          {isIrrigationOpen && (
            <div className="p-5 pt-4 border-t border-[#2e4052]/60 space-y-4 bg-[#16212b]/40">
              
              {/* Irrigation Water Alerts */}
              {(() => {
                const netWater = data.recommendations?.water?.netWaterDepthMm || 0;
                const precip = data.recommendations?.water?.precipitation || 0;
                const waterAlerts = [];

                if (netWater > 4.5) {
                  waterAlerts.push({
                    type: "danger",
                    icon: "🚨",
                    title: isAr ? "تحذير: إجهاد مائي حاد متوقع" : "Alerte: Stress hydrique élevé",
                    message: isAr ? `الاحتياج الصافي مرتفع (${netWater} mm/يوم). يُوصى بتشغيل الري لمدة ${durationHours} ساعة لمنع الإجهاد.` : `Besoin net élevé (${netWater} mm/j). Irrigation recommandée.`
                  });
                }

                if (precip >= 5.0) {
                  waterAlerts.push({
                    type: "info",
                    icon: "🌧️",
                    title: isAr ? "فرصة توفير المياه (أمطار مسجلة)" : "Economie d'eau (Pluie mesurée)",
                    message: isAr ? `تم تسجيل ${precip} ملم من الأمطار. يمكن خفض مدة الري اليومية أو تأجيلها.` : `Pluie de ${precip} mm mesurée.`
                  });
                }

                if (waterAlerts.length === 0) return null;

                return (
                  <div className="space-y-2">
                    {waterAlerts.map((alert, aIdx) => (
                      <div 
                        key={aIdx}
                        className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs transition-all ${
                          alert.type === "danger"
                            ? "bg-rose-950/40 border-rose-800/50 text-rose-200"
                            : alert.type === "warning"
                            ? "bg-amber-950/40 border-amber-800/50 text-amber-200"
                            : alert.type === "info"
                            ? "bg-sky-950/40 border-sky-800/50 text-sky-200"
                            : "bg-emerald-950/40 border-emerald-800/50 text-emerald-200"
                        }`}
                      >
                        <span className="text-lg">{alert.icon}</span>
                        <div className="space-y-0.5">
                          <h5 className="font-black text-[#F9F8F6]">{alert.title}</h5>
                          <p className="text-[11px] opacity-90">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#16212b] p-3 rounded-2xl border border-[#2e4052] space-y-1">
                  <span className="text-[10px] text-[#A8A093] font-bold block">{isAr ? "معدل البخر التراكمي (ET0):" : "Évapotranspiration (ET0) :"}</span>
                  <span className="font-mono font-black text-sm text-[#F9F8F6]">
                    {data.recommendations?.water?.et0 || 0} {isAr ? "ملم/يوم" : "mm/jour"}
                  </span>
                </div>
                <div className="bg-[#16212b] p-3 rounded-2xl border border-[#2e4052] space-y-1">
                  <span className="text-[10px] text-[#A8A093] font-bold block">{isAr ? "احتياج المحصول الصافي (ETc):" : "Besoin culture (ETc) :"}</span>
                  <span className="font-mono font-black text-sm text-[#F9F8F6]">
                    {data.recommendations?.water?.etc || 0} {isAr ? "ملم/يوم" : "mm/jour"}
                  </span>
                </div>
                <div className="bg-[#16212b] p-3 rounded-2xl border border-[#2e4052] space-y-1">
                  <span className="text-[10px] text-[#A8A093] font-bold block">{isAr ? "تساقطات الأمس المطارية:" : "Précipitations d'hier :"}</span>
                  <span className="font-mono font-black text-sm text-teal-400">
                    {data.recommendations?.water?.precipitation || 0} {isAr ? "ملم" : "mm"}
                  </span>
                </div>
              </div>

              <div className="bg-[#16212b] p-4 rounded-2xl border border-[#8D5B4C]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-[#8D5B4C]/20 border border-[#8D5B4C]/40 flex items-center justify-center text-2xl flex-shrink-0">
                    ⏱️
                  </div>
                  <div>
                    <p className="text-[11px] text-[#A8A093] font-bold uppercase">{isAr ? "مدة الري الموصى بها اليوم" : "Durée d'arrosage recommandée"}</p>
                    <p className="text-base font-black text-[#F9F8F6]">
                      {durationHours} {isAr ? "ساعة" : "h"} ({durationMinutes} {t("common.minutes")})
                    </p>
                  </div>
                </div>
                <div className="text-right font-mono font-black text-[#8D5B4C] text-lg bg-[#1f2d3a] px-4 py-2 rounded-xl border border-[#2e4052]">
                  💧 {data.recommendations?.water?.litersPerTree || 0} {isAr ? "لتر / شجرة" : "L / arbre"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ACCORDION 2: Fertilizer & Fertigation Schedule Card */}
        <div className="bg-[#1f2d3a] border border-[#2e4052] rounded-3xl overflow-hidden shadow-xl transition-all">
          
          {/* Header Button */}
          <button
            type="button"
            onClick={() => setIsFertilizationOpen(!isFertilizationOpen)}
            className="w-full p-4 sm:p-5 bg-[#1f2d3a] hover:bg-[#28394a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right dir-rtl transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl text-amber-400 flex-shrink-0">
                🧪
              </div>
              <div>
                <h5 className="text-sm font-black text-[#F9F8F6] flex items-center gap-2">
                  <span>{isAr ? "برنامج التسميد والجدول الشهري (NPK & Fertigation)" : "Plan de fertilisation NPK & Calendrier mensuel"}</span>
                </h5>
                <p className="text-[11px] text-[#A8A093] font-mono">
                  🤖 <span className="text-amber-400/90 font-bold">{isAr ? "التوأم الرقمي الفسيولوجي" : "Jumeau Numérique"}</span> &bull; {isAr ? "المستهدف" : "Cible"}: <span className="text-[#F9F8F6] font-bold">{data.recommendations?.npk?.targetYield || 5} t/ha</span> &bull; {data.recommendations?.npk?.bearingStatus === "ON_YEAR" ? (isAr ? "حمل غزير" : "On-year") : data.recommendations?.npk?.bearingStatus === "OFF_YEAR" ? (isAr ? "تناوب خفيف" : "Off-year") : (isAr ? "إنتاج متوازن" : "Normal")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold">
                <span className="text-[#8D5B4C] bg-[#16212b] px-2 py-1 rounded-lg border border-[#2e4052]">N: {data.recommendations?.npk?.n || 0}</span>
                <span className="text-amber-400 bg-[#16212b] px-2 py-1 rounded-lg border border-[#2e4052]">P: {data.recommendations?.npk?.p || 0}</span>
                <span className="text-emerald-400 bg-[#16212b] px-2 py-1 rounded-lg border border-[#2e4052]">K: {data.recommendations?.npk?.k || 0}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#16212b] border border-[#2e4052] flex items-center justify-center text-xs text-[#F9F8F6]">
                {isFertilizationOpen ? "▲" : "▼"}
              </div>
            </div>
          </button>

          {/* Collapsible Content */}
          {isFertilizationOpen && (
            <div className="p-5 pt-4 border-t border-[#2e4052]/60 space-y-5 bg-[#16212b]/40">
              
              {/* Fertilization Agronomic Alerts */}
              {(() => {
                const currentMonth = new Date().getMonth() + 1;
                const fertAlerts = [];

                if (currentMonth >= 5 && pctN < 40 && recN > 0) {
                  fertAlerts.push({
                    type: "warning",
                    icon: "⚠️",
                    title: isAr ? "تأخر في التسميد النيتروجيني" : "Retard d'apport en azote",
                    message: isAr ? `تم إنجاز ${Math.round(pctN)}% فقط من الهدف السنوي للنيتروجين. يُرجى تدارك النقص.` : `Seulement ${Math.round(pctN)}% de l'azote appliqué.`
                  });
                }

                if (data.recommendations?.npk?.foliarSprays && data.recommendations.npk.foliarSprays.length > 0) {
                  fertAlerts.push({
                    type: "success",
                    icon: "🌿",
                    title: isAr ? "توصية رش ورقي مستهدفة" : "Recommandation d'apport foliaire",
                    message: data.recommendations.npk.foliarSprays[0].target + " — " + data.recommendations.npk.foliarSprays[0].purpose
                  });
                }

                if (fertAlerts.length === 0) return null;

                return (
                  <div className="space-y-2">
                    {fertAlerts.map((alert, aIdx) => (
                      <div 
                        key={aIdx}
                        className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs transition-all ${
                          alert.type === "danger"
                            ? "bg-rose-950/40 border-rose-800/50 text-rose-200"
                            : alert.type === "warning"
                            ? "bg-amber-950/40 border-amber-800/50 text-amber-200"
                            : alert.type === "info"
                            ? "bg-sky-950/40 border-sky-800/50 text-sky-200"
                            : "bg-emerald-950/40 border-emerald-800/50 text-emerald-200"
                        }`}
                      >
                        <span className="text-lg">{alert.icon}</span>
                        <div className="space-y-0.5">
                          <h5 className="font-black text-[#F9F8F6]">{alert.title}</h5>
                          <p className="text-[11px] opacity-90">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
              
              {/* NPK Summary Badges */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#16212b] p-3 rounded-2xl border border-[#2e4052]">
                  <div className="text-[10px] text-[#A8A093] font-bold">{isAr ? "النيتروجين N" : "Azote N"}</div>
                  <div className="text-sm font-mono font-black text-[#8D5B4C]">
                    {data.recommendations?.npk?.n || 0} {isAr ? "كجم/هـ" : "kg/ha"}
                  </div>
                  <div className="text-[10px] font-mono text-[#D8D2C5] font-bold mt-0.5">
                    {Math.round(((data.recommendations?.npk?.n || 0) * 1000) / densityPerHa)} {isAr ? "غ / شجرة" : "g / arbre"}
                  </div>
                </div>
                <div className="bg-[#16212b] p-3 rounded-2xl border border-[#2e4052]">
                  <div className="text-[10px] text-[#A8A093] font-bold">{isAr ? "الفوسفور P" : "Phosphore P"}</div>
                  <div className="text-sm font-mono font-black text-amber-500">
                    {data.recommendations?.npk?.p || 0} {isAr ? "كجم/هـ" : "kg/ha"}
                  </div>
                  <div className="text-[10px] font-mono text-[#D8D2C5] font-bold mt-0.5">
                    {Math.round(((data.recommendations?.npk?.p || 0) * 1000) / densityPerHa)} {isAr ? "غ / شجرة" : "g / arbre"}
                  </div>
                </div>
                <div className="bg-[#16212b] p-3 rounded-2xl border border-[#2e4052]">
                  <div className="text-[10px] text-[#A8A093] font-bold">{isAr ? "البوتاسيوم K" : "Potassium K"}</div>
                  <div className="text-sm font-mono font-black text-emerald-400">
                    {data.recommendations?.npk?.k || 0} {isAr ? "كجم/هـ" : "kg/ha"}
                  </div>
                  <div className="text-[10px] font-mono text-[#D8D2C5] font-bold mt-0.5">
                    {Math.round(((data.recommendations?.npk?.k || 0) * 1000) / densityPerHa)} {isAr ? "غ / شجرة" : "g / arbre"}
                  </div>
                </div>
              </div>

              {/* Annual Progress bars */}
              <div className="pt-2 border-t border-[#2e4052]/60 space-y-2.5">
                <span className="text-[10px] font-extrabold text-[#8D5B4C] uppercase tracking-wider block">
                  {isAr ? "متابعة التسميد التراكمي المطبق" : "Suivi de fertilisation appliquée"}
                </span>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[#A8A093] font-bold">{isAr ? "عنصر النيتروجين (N)" : "Azote (N)"}</span>
                    <span className="font-mono font-bold text-[#F9F8F6]">
                      {loggedN_ha.toFixed(1)} / {recN} kg/ha ({Math.round(pctN)}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#16212b] h-2 rounded-full overflow-hidden border border-[#2e4052]">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        pctN < 85 ? "bg-[#8D5B4C]" : pctN <= 115 ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                      }`}
                      style={{ width: `${Math.min(100, pctN)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[#A8A093] font-bold">{isAr ? "عنصر الفوسفور (P)" : "Phosphore (P)"}</span>
                    <span className="font-mono font-bold text-[#F9F8F6]">
                      {loggedP_ha.toFixed(1)} / {recP} kg/ha ({Math.round(pctP)}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#16212b] h-2 rounded-full overflow-hidden border border-[#2e4052]">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        pctP < 85 ? "bg-[#8D5B4C]" : pctP <= 115 ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                      }`}
                      style={{ width: `${Math.min(100, pctP)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[#A8A093] font-bold">{isAr ? "عنصر البوتاسيوم (K)" : "Potassium (K)"}</span>
                    <span className="font-mono font-bold text-[#F9F8F6]">
                      {loggedK_ha.toFixed(1)} / {recK} kg/ha ({Math.round(pctK)}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#16212b] h-2 rounded-full overflow-hidden border border-[#2e4052]">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        pctK < 85 ? "bg-[#8D5B4C]" : pctK <= 115 ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                      }`}
                      style={{ width: `${Math.min(100, pctK)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Fertigation Schedule Table */}
              {data.recommendations?.npk?.monthlySchedule && data.recommendations.npk.monthlySchedule.length > 0 && (
                <div className="pt-3 border-t border-[#2e4052]/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#F9F8F6] flex items-center gap-1.5">
                      <span>📅</span>
                      <span>{isAr ? "الجدول الشهري للتسميد بالحقن (Fertigation)" : "Calendrier mensuel de fertigation"}</span>
                    </span>
                    <span className="text-[9px] font-bold text-[#A8A093] bg-[#16212b] px-2.5 py-1 rounded-full border border-[#2e4052]">
                      {isAr ? "موزع حسـب المراحل الفينولوجية" : "Par stade phénologique"}
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#2e4052] bg-[#16212b]">
                    <table className="w-full text-right text-[11px] dir-rtl">
                      <thead className="bg-[#1f2d3a] text-[#A8A093] font-bold border-b border-[#2e4052]">
                        <tr>
                          <th className="p-2.5 text-right">{isAr ? "الشهر" : "Mois"}</th>
                          <th className="p-2.5 text-right">{isAr ? "المرحلة الفينولوجية" : "Stade"}</th>
                          <th className="p-2.5 text-center text-[#8D5B4C]">N (kg/ha)</th>
                          <th className="p-2.5 text-center text-amber-500">P₂O₅ (kg/ha)</th>
                          <th className="p-2.5 text-center text-emerald-400">K₂O (kg/ha)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2e4052]/50 font-mono">
                        {data.recommendations.npk.monthlySchedule.map((item, idx) => (
                          <tr key={idx} className="hover:bg-[#1f2d3a]/60 transition-colors">
                            <td className="p-2.5 font-bold text-[#F9F8F6]">{item.month}</td>
                            <td className="p-2.5 text-[#D8D2C5] font-sans text-xs">{item.stage}</td>
                            <td className="p-2.5 text-center font-bold text-[#8D5B4C]">{item.n_kg}</td>
                            <td className="p-2.5 text-center font-bold text-amber-400">{item.p_kg}</td>
                            <td className="p-2.5 text-center font-bold text-emerald-400">{item.k_kg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Micronutrients & Foliar Sprays Section */}
              {(data.recommendations?.npk?.micronutrients || (data.recommendations?.npk?.foliarSprays && data.recommendations.npk.foliarSprays.length > 0)) && (
                <div className="pt-3 border-t border-[#2e4052]/60 space-y-3">
                  <span className="text-[11px] font-black text-[#F9F8F6] flex items-center gap-1.5">
                    <span>🧪</span>
                    <span>{isAr ? "العناصر الصغرى والتسميد الورقي" : "Oligo-éléments & Apports foliaires"}</span>
                  </span>

                  {/* Micronutrients Badges */}
                  {data.recommendations?.npk?.micronutrients && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="bg-[#16212b] p-2.5 rounded-xl border border-[#2e4052] text-center">
                        <div className="text-[10px] text-[#A8A093] font-bold">{isAr ? "البورون (B)" : "Bore (B)"}</div>
                        <div className="text-xs font-mono font-black text-amber-400 mt-0.5">
                          {data.recommendations.npk.micronutrients.boron_g_per_tree} g/{isAr ? "شجرة" : "arbre"}
                        </div>
                      </div>
                      <div className="bg-[#16212b] p-2.5 rounded-xl border border-[#2e4052] text-center">
                        <div className="text-[10px] text-[#A8A093] font-bold">{isAr ? "الزنك (Zn)" : "Zinc (Zn)"}</div>
                        <div className="text-xs font-mono font-black text-blue-400 mt-0.5">
                          {data.recommendations.npk.micronutrients.zinc_g_per_tree} g/{isAr ? "شجرة" : "arbre"}
                        </div>
                      </div>
                      <div className="bg-[#16212b] p-2.5 rounded-xl border border-[#2e4052] text-center">
                        <div className="text-[10px] text-[#A8A093] font-bold">{isAr ? "الحديد المخلبي" : "Fer EDDHA"}</div>
                        <div className="text-xs font-mono font-black text-rose-400 mt-0.5">
                          {data.recommendations.npk.micronutrients.iron_chelate_g_per_tree} g/{isAr ? "شجرة" : "arbre"}
                        </div>
                      </div>
                      <div className="bg-[#16212b] p-2.5 rounded-xl border border-[#2e4052] text-center">
                        <div className="text-[10px] text-[#A8A093] font-bold">{isAr ? "المغنيسيوم" : "Magnésium"}</div>
                        <div className="text-xs font-mono font-black text-purple-400 mt-0.5">
                          {data.recommendations.npk.micronutrients.magnesium_kg_per_ha} kg/ha
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Foliar Spray Recommendations List */}
                  {data.recommendations?.npk?.foliarSprays && data.recommendations.npk.foliarSprays.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {data.recommendations.npk.foliarSprays.map((spray, sIdx) => (
                        <div key={sIdx} className="bg-[#16212b] p-3.5 rounded-2xl border border-[#8D5B4C]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-1">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                              <span>🌿</span>
                              <span>{spray.target}</span>
                            </span>
                            <p className="text-[11px] text-[#A8A093]">
                              🎯 {spray.purpose}
                            </p>
                          </div>
                          <div className="text-left dir-ltr sm:text-right font-mono text-[11px] space-y-0.5">
                            <span className="text-[10px] text-[#A8A093] bg-[#1f2d3a] px-2 py-0.5 rounded-lg border border-[#2e4052] inline-block mb-1">
                              {spray.timing}
                            </span>
                            <div className="text-emerald-400 font-bold">💧 {spray.dose}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

      </div>



      {/* Dedicated Settings Modal */}
      <FieldSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        form={form}
        onFormChange={onFormChange}
        onSave={onSave}
        fieldId={fieldId}
        field={field}
        biologicalCeiling={biologicalCeiling}
      />
    </div>
  );
});
