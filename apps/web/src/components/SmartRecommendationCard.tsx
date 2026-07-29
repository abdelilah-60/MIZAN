import React from "react";
import type { Field } from "../lib/types";

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
  return (
    <>
      {/* ========== SMART STAGE RECOMMENDATION CARD ========== */}
      {smartRec && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20 border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl flex-shrink-0">
              {smartRec.icon}
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                العمليات المقترحة للمرحلة الحالية (Stage-Specific Recommendation)
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">{smartRec.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">{smartRec.desc}</p>
            </div>
          </div>
          <div className="flex justify-end pt-2 border-t border-white/5">
            <button
              onClick={() => onLogOperation(field, smartRec.type, smartRec.prefill)}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow-lg transition-all active:scale-[0.97] flex items-center gap-1.5"
            >
              <span>{smartRec.icon}</span>
              <span>{smartRec.btnText}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========== ASSUMED COMPLIANCE BANNER ========== */}
      {showComplianceBanner && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-emerald-950/80 border border-emerald-500/20 rounded-2xl p-4 shadow-xl animate-in slide-in-from-top-4 duration-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">💧</span>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Mizan Smart Irrigation Sync (التزام الري الذكي)</h4>
              <p className="text-xs text-slate-300">
                Nous estimons un besoin d&apos;irrigation de <span className="text-emerald-400 font-extrabold">{recommendedMinutes} min</span> ({recommendedLiters} L) pour aujourd&apos;hui. Avez-vous irrigué ?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleAutoLog}
              disabled={isAutoLogging}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap flex items-center gap-1.5"
            >
              {isAutoLogging ? "Enregistrement..." : "✅ Oui (نعم)"}
            </button>
            <button
              onClick={() => onLogOperation(field, "IRRIGATION")}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white text-xs font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap"
            >
              ✏️ Modifier (تعديل)
            </button>
            <button
              onClick={() => onSetIsDismissed(true)}
              className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-xl transition-all"
              title="Ignorer / تجاهل"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
});
