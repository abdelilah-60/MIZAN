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
      return Math.min(12, Math.max(4, computedCeiling));
    } else {
      return Math.min(4, Math.max(1, computedCeiling));
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

      {/* RECOMMENDATIONS BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Irrigation Recommendation */}
        <div className="bg-[#1f2d3a] p-5 rounded-3xl border border-[#2e4052] shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h5 className="text-xs font-black text-[#8D5B4C] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>💧</span>
              <span>{isAr ? "الميزانية والجدول المائي اليومي" : "Bilan et plan d'irrigation quotidien"}</span>
            </h5>
            <div className="space-y-2.5 text-xs text-[#D8D2C5]">
              <div className="flex justify-between">
                <span>{isAr ? "معدل البخر التراكمي (ET0):" : "Évapotranspiration (ET0) :"}</span>
                <span className="font-mono font-bold text-[#F9F8F6]">
                  {data.recommendations?.water?.et0 || 0} {isAr ? "ملم/يوم" : "mm/jour"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? "احتياج المحصول الصافي (ETc):" : "Besoin culture (ETc) :"}</span>
                <span className="font-mono font-bold text-[#F9F8F6]">
                  {data.recommendations?.water?.etc || 0} {isAr ? "ملم/يوم" : "mm/jour"}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#2e4052] pb-2.5">
                <span>{isAr ? "تساقطات الأمس المطارية:" : "Précipitations d'hier :"}</span>
                <span className="font-mono font-bold text-teal-400">
                  {data.recommendations?.water?.precipitation || 0} {isAr ? "ملم" : "mm"}
                </span>
              </div>
              <div className="flex justify-between font-black text-sm text-[#F9F8F6] pt-1">
                <span>{isAr ? "الحجم الموصى به لكل شجرة:" : "Volume à apporter :"}</span>
                <span className="text-[#8D5B4C]">{data.recommendations?.water?.litersPerTree || 0} {isAr ? "لتر / شجرة" : "L / arbre"}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#2e4052] flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#8D5B4C]/20 border border-[#8D5B4C]/40 flex items-center justify-center text-xl flex-shrink-0">
              ⏱️
            </div>
            <div>
              <p className="text-[10px] text-[#A8A093] font-bold uppercase">{isAr ? "مدة الري الموصى بها اليوم" : "Durée d'arrosage recommandée"}</p>
              <p className="text-sm font-black text-[#F9F8F6]">
                {durationHours} {isAr ? "ساعة" : "h"} ({durationMinutes} {t("common.minutes")})
              </p>
            </div>
          </div>
        </div>

        {/* Fertilizer Recommendation */}
        <div className="bg-[#1f2d3a] p-5 rounded-3xl border border-[#2e4052] shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h5 className="text-xs font-black text-[#8D5B4C] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>🧪</span>
              <span>{isAr ? "برنامج التسميد السنوي (NPK)" : "Plan de fertilisation NPK (Annuel)"}</span>
            </h5>
            <div className="space-y-2.5 text-xs text-[#D8D2C5]">
              <div className="flex justify-between">
                <span>{isAr ? "مستهدف الإنتاجية:" : "Objectif de rendement :"}</span>
                <span className="font-mono font-bold text-[#F9F8F6]">
                  {data.recommendations?.npk?.targetYield || 5} {isAr ? "طن/هكتار" : "tonnes/ha"}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#2e4052] pb-2.5">
                <span>{isAr ? "حالة التحميل التناوبي:" : "Statut de charge :"}</span>
                <span className="font-bold text-[#F9F8F6]">
                  {data.recommendations?.npk?.bearingStatus === "ON_YEAR"
                    ? (isAr ? "سنة حمل غزير (On-year)" : "Année pleine (On-year)")
                    : data.recommendations?.npk?.bearingStatus === "OFF_YEAR"
                    ? (isAr ? "سنة تناوب خفيفة (Off-year)" : "Année creuse (Off-year)")
                    : (isAr ? "إنتاج متوازن قياسي" : "Production normale")}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="bg-[#16212b] p-2.5 rounded-2xl border border-[#2e4052]">
                  <div className="text-[10px] text-[#A8A093] font-bold">{isAr ? "النيتروجين N" : "Azote N"}</div>
                  <div className="text-xs font-mono font-black text-[#8D5B4C]">
                    {data.recommendations?.npk?.n || 0} {isAr ? "كجم/هـ" : "kg/ha"}
                  </div>
                  <div className="text-[9px] font-mono text-[#D8D2C5] font-bold mt-0.5">
                    {Math.round(((data.recommendations?.npk?.n || 0) * 1000) / densityPerHa)} {isAr ? "غ / شجرة" : "g / arbre"}
                  </div>
                </div>
                <div className="bg-[#16212b] p-2.5 rounded-2xl border border-[#2e4052]">
                  <div className="text-[10px] text-[#A8A093] font-bold">{isAr ? "الفوسفور P" : "Phosphore P"}</div>
                  <div className="text-xs font-mono font-black text-amber-500">
                    {data.recommendations?.npk?.p || 0} {isAr ? "كجم/هـ" : "kg/ha"}
                  </div>
                  <div className="text-[9px] font-mono text-[#D8D2C5] font-bold mt-0.5">
                    {Math.round(((data.recommendations?.npk?.p || 0) * 1000) / densityPerHa)} {isAr ? "غ / شجرة" : "g / arbre"}
                  </div>
                </div>
                <div className="bg-[#16212b] p-2.5 rounded-2xl border border-[#2e4052]">
                  <div className="text-[10px] text-[#A8A093] font-bold">{isAr ? "البوتاسيوم K" : "Potassium K"}</div>
                  <div className="text-xs font-mono font-black text-emerald-400">
                    {data.recommendations?.npk?.k || 0} {isAr ? "كجم/هـ" : "kg/ha"}
                  </div>
                  <div className="text-[9px] font-mono text-[#D8D2C5] font-bold mt-0.5">
                    {Math.round(((data.recommendations?.npk?.k || 0) * 1000) / densityPerHa)} {isAr ? "غ / شجرة" : "g / arbre"}
                  </div>
                </div>
              </div>

              {/* Annual Progress bars */}
              <div className="mt-4 pt-3 border-t border-[#2e4052] space-y-2.5">
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
            </div>
          </div>
        </div>
      </div>

      {/* Modern Compact Technical Parameters Summary Banner */}
      <div className="bg-[#1f2d3a] border border-[#2e4052] rounded-3xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[#8D5B4C]/20 border border-[#8D5B4C]/40 flex items-center justify-center text-xl text-[#F9F8F6]">
            ⚙️
          </div>
          <div className="space-y-0.5">
            <h5 className="text-xs font-black text-[#F9F8F6]">
              {isAr ? "المعايير الفنية لنظام الري والتربة" : "Paramètres techniques enregistrés"}
            </h5>
            <p className="text-[11px] text-[#D8D2C5] font-mono">
              🚰 {form.dripperFlowRate || "4.0"} L/h ({form.drippersPerTree || "4"} {isAr ? "قطارات" : "goutteurs"}) &bull; 🧪 pH: {form.ph || "7.8"} ({form.organicMatter || "1.8"}% {isAr ? "مادة عضوية" : "MO"}) &bull; 🫒 {isAr ? "الهدف" : "Cible"}: {form.targetYield || "5.0"} t/ha
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsSettingsModalOpen(true)}
          className="px-4 py-2 bg-[#16212b] hover:bg-[#28394a] border border-[#8D5B4C]/40 text-[#F9F8F6] text-xs font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap flex items-center gap-1.5"
        >
          <span>✏️</span>
          <span>{isAr ? "تعديل المعايير" : "Modifier les paramètres"}</span>
        </button>
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
