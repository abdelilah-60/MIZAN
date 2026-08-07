import React from "react";
import type { Field } from "../lib/types";
import { useTranslation } from "react-i18next";

export interface SmartRecommendationCardProps {
  smartRec: any;
  showComplianceBanner: boolean;
  recommendedMinutes: number;
  recommendedLiters: number;
  isAutoLogging: boolean;
  handleAutoLog: () => void;
  onLogOperation: (field: Field, defaultType?: string, prefillMetadata?: Record<string, any>) => void;
  onSetIsDismissed: (dismissed: boolean) => void;
  field: Field;
}

export const SmartRecommendationCard = React.memo(function SmartRecommendationCard({
  smartRec,
  showComplianceBanner,
  recommendedMinutes,
  recommendedLiters,
  isAutoLogging,
  handleAutoLog,
  onLogOperation,
  onSetIsDismissed,
  field
}: SmartRecommendationCardProps) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <>
      {/* ========== SMART STAGE RECOMMENDATION CARD ========== */}
      {smartRec && (
        <div className="bg-[#1f2d3a] border border-[#8D5B4C]/30 rounded-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-[#8D5B4C]/20 border border-[#8D5B4C]/40 flex items-center justify-center text-2xl flex-shrink-0">
              {smartRec.icon}
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#8D5B4C] uppercase tracking-widest">
                {isAr ? "العمليات المقترحة للمرحلة الفينولوجية الحالية" : "Recommandations spécifiques du stade"}
              </span>
              <h4 className="text-sm font-bold text-[#F9F8F6] leading-snug">{smartRec.title}</h4>
              <p className="text-xs text-[#D8D2C5] leading-relaxed font-sans mt-1">{smartRec.desc}</p>
            </div>
          </div>
          <div className="flex justify-end pt-2 border-t border-[#2e4052]">
            <button
              type="button"
              onClick={() => onLogOperation(field, smartRec.type, smartRec.prefill)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] hover:from-[#7a4d3f] hover:to-[#8D5B4C] text-[#F9F8F6] text-xs font-extrabold rounded-xl shadow-lg shadow-[#8D5B4C]/25 transition-all active:scale-[0.97] flex items-center gap-1.5 border border-[#B86B53]/30"
            >
              <span>{smartRec.icon}</span>
              <span>{smartRec.btnText}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========== ASSUMED COMPLIANCE BANNER ========== */}
      {showComplianceBanner && (
        <div className="bg-[#1f2d3a] border border-[#8D5B4C]/30 rounded-2xl p-4 shadow-xl animate-in slide-in-from-top-4 duration-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">💧</span>
            <div>
              <h4 className="text-sm font-bold text-[#F9F8F6] mb-0.5">
                {isAr ? "ميزانية وتوثيق الري الذكي اليومي" : "Suivi d'irrigation intelligente"}
              </h4>
              <p className="text-xs text-[#D8D2C5]">
                {isAr ? (
                  <>
                    تقدير الاحتياج المائي اليومي: <span className="text-[#8D5B4C] font-extrabold">{recommendedMinutes} دقيقة</span> ({recommendedLiters} لتر/شجرة). هل تم تطبيق الري اليوم؟
                  </>
                ) : (
                  <>
                    Besoin estimé pour aujourd'hui : <span className="text-[#8D5B4C] font-extrabold">{recommendedMinutes} min</span> ({recommendedLiters} L/arbre). Avez-vous irrigué ?
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleAutoLog}
              disabled={isAutoLogging}
              className="px-4 py-2 bg-[#8D5B4C] hover:bg-[#A0522D] text-[#F9F8F6] text-xs font-black rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap flex items-center gap-1.5 border border-[#B86B53]/30"
            >
              {isAutoLogging
                ? (isAr ? "جاري التسجيل..." : "Enregistrement...")
                : (isAr ? "✅ نعم، تم الري" : "✅ Oui, irrigué")}
            </button>
            <button
              type="button"
              onClick={() => onLogOperation(field, "IRRIGATION")}
              className="px-3.5 py-2 bg-[#2C3E50] hover:bg-[#34495E] border border-[#2e4052] text-[#F9F8F6] text-xs font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap"
            >
              {isAr ? "✏️ تعديل الكمية" : "✏️ Ajuster"}
            </button>
            <button
              type="button"
              onClick={() => onSetIsDismissed(true)}
              className="p-2 hover:bg-[#2C3E50]/40 text-[#A8A093] hover:text-[#F9F8F6] rounded-xl transition-all"
              title={t("common.ignore")}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
});
