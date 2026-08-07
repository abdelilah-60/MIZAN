import React, { useState } from "react";
import type { AgronomyForm, Field } from "../lib/types";
import { useTranslation } from "react-i18next";

export interface FieldSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: AgronomyForm;
  onFormChange: (form: AgronomyForm) => void;
  onSave: (fieldId: string, section: "irrigation" | "soil" | "yield") => void;
  fieldId: string;
  field: Field;
  biologicalCeiling: number;
}

export const FieldSettingsModal = React.memo(function FieldSettingsModal({
  isOpen,
  onClose,
  form,
  onFormChange,
  onSave,
  fieldId,
  field,
  biologicalCeiling,
}: FieldSettingsModalProps) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [activeTab, setActiveTab] = useState<"irrigation" | "soil" | "yield">("irrigation");

  if (!isOpen) return null;

  const updateForm = (partial: Partial<AgronomyForm>) => {
    onFormChange({ ...form, ...partial });
  };

  const isOverCeiling = Number(form.targetYield) > biologicalCeiling;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#16212b] border border-[#2e4052] rounded-[32px] w-full max-w-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] space-y-0">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#1f2d3a] border-b border-[#2e4052] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#8D5B4C]/20 border border-[#8D5B4C]/40 flex items-center justify-center text-xl text-[#F9F8F6]">
              ⚙️
            </div>
            <div>
              <h3 className="text-base font-black text-[#F9F8F6]">
                {isAr ? `إعدادات والمعايير الفنية لحقل ${field.name}` : `Paramètres techniques de la parcelle ${field.name}`}
              </h3>
              <p className="text-xs text-[#D8D2C5]">
                {isAr ? "ضبط معايير نظام الري، تحليل التربة، ومستهدف الإنتاجية" : "Configuration du système d'irrigation, analyse du sol et objectif de rendement"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-xl bg-[#16212b] hover:bg-[#2e4052] border border-[#2e4052] text-[#D8D2C5] hover:text-[#F9F8F6] flex items-center justify-center text-sm transition-all"
            title={t("common.close")}
          >
            ✕
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="flex border-b border-[#2e4052] bg-[#16212b] px-6 pt-3 gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("irrigation")}
            className={`px-4 py-2.5 rounded-t-2xl text-xs font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === "irrigation"
                ? "border-[#8D5B4C] text-[#F9F8F6] bg-[#1f2d3a]"
                : "border-transparent text-[#D8D2C5] hover:text-[#F9F8F6]"
            }`}
          >
            <span>🚰</span>
            <span>{isAr ? "نظام الري والتنقيط" : "Système d'irrigation"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("soil")}
            className={`px-4 py-2.5 rounded-t-2xl text-xs font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === "soil"
                ? "border-[#8D5B4C] text-[#F9F8F6] bg-[#1f2d3a]"
                : "border-transparent text-[#D8D2C5] hover:text-[#F9F8F6]"
            }`}
          >
            <span>🧪</span>
            <span>{isAr ? "تحليل عناصر التربة" : "Analyse du sol"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("yield")}
            className={`px-4 py-2.5 rounded-t-2xl text-xs font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === "yield"
                ? "border-[#8D5B4C] text-[#F9F8F6] bg-[#1f2d3a]"
                : "border-transparent text-[#D8D2C5] hover:text-[#F9F8F6]"
            }`}
          >
            <span>🫒</span>
            <span>{isAr ? "مستهدف الإنتاجية" : "Objectif de rendement"}</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 space-y-5 bg-[#16212b]">
          {/* TAB 1: IRRIGATION SYSTEM */}
          {activeTab === "irrigation" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#D8D2C5]">
                    {isAr ? "تدفق القطارة (لتر/ساعة)" : "Débit goutteur (L/h)"}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.dripperFlowRate}
                    onChange={(e) => updateForm({ dripperFlowRate: e.target.value })}
                    className="w-full bg-[#1f2d3a] border border-[#2e4052] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F8F6] focus:outline-none focus:ring-1 focus:ring-[#8D5B4C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#D8D2C5]">
                    {isAr ? "عدد القطارات لكل شجرة" : "Goutteurs par arbre"}
                  </label>
                  <input
                    type="number"
                    value={form.drippersPerTree}
                    onChange={(e) => updateForm({ drippersPerTree: e.target.value })}
                    className="w-full bg-[#1f2d3a] border border-[#2e4052] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F8F6] focus:outline-none focus:ring-1 focus:ring-[#8D5B4C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#D8D2C5]">
                    {isAr ? "كثافة غرس الأشجار (شجرة/هكتار)" : "Densité (arbres/ha)"}
                  </label>
                  <input
                    type="number"
                    value={form.treeDensity}
                    onChange={(e) => updateForm({ treeDensity: e.target.value })}
                    className="w-full bg-[#1f2d3a] border border-[#2e4052] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F8F6] focus:outline-none focus:ring-1 focus:ring-[#8D5B4C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#D8D2C5]">
                    {isAr ? "كفاءة نظام الري (من 0.5 إلى 1.0)" : "Efficacité du système"}
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={form.efficiency}
                    onChange={(e) => updateForm({ efficiency: e.target.value })}
                    className="w-full bg-[#1f2d3a] border border-[#2e4052] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F8F6] focus:outline-none focus:ring-1 focus:ring-[#8D5B4C]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#2e4052]">
                <button
                  type="button"
                  onClick={() => {
                    onSave(fieldId, "irrigation");
                    onClose();
                  }}
                  className="px-6 py-2.5 text-xs font-extrabold text-[#F9F8F6] bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] rounded-xl shadow-lg transition-all active:scale-95 border border-[#B86B53]/30"
                >
                  {t("common.save")}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SOIL ANALYSIS */}
          {activeTab === "soil" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#D8D2C5]">
                    {isAr ? "تاريخ التحليل المعملي" : "Date de l'analyse"}
                  </label>
                  <input
                    type="date"
                    value={form.analysisDate}
                    onChange={(e) => updateForm({ analysisDate: e.target.value })}
                    className="w-full bg-[#1f2d3a] border border-[#2e4052] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F8F6] focus:outline-none focus:ring-1 focus:ring-[#8D5B4C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#D8D2C5]">
                    {isAr ? "درجة حموضة التربة (pH)" : "pH du sol"}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.ph}
                    onChange={(e) => updateForm({ ph: e.target.value })}
                    className="w-full bg-[#1f2d3a] border border-[#2e4052] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F8F6] focus:outline-none focus:ring-1 focus:ring-[#8D5B4C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#D8D2C5]">
                    {isAr ? "نسبة المادة العضوية (%)" : "Matière organique (%)"}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.organicMatter}
                    onChange={(e) => updateForm({ organicMatter: e.target.value })}
                    className="w-full bg-[#1f2d3a] border border-[#2e4052] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F8F6] focus:outline-none focus:ring-1 focus:ring-[#8D5B4C]"
                  />
                </div>
              </div>

              <div className="bg-[#1f2d3a] p-4 rounded-2xl border border-[#2e4052] space-y-3">
                <span className="text-xs font-extrabold text-[#8D5B4C] uppercase tracking-wider block">
                  {isAr ? "تركيز المغذيات المعملي في التربة (mg/kg)" : "Taux des nutriments du sol (mg/kg)"}
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#A8A093] font-bold">N ({isAr ? "النيتروجين" : "Azote"})</label>
                    <input
                      type="number"
                      value={form.nitrogen}
                      onChange={(e) => updateForm({ nitrogen: e.target.value })}
                      className="w-full bg-[#16212b] border border-[#2e4052] rounded-lg px-3 py-2 text-xs text-[#F9F8F6] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#A8A093] font-bold">P ({isAr ? "الفوسفور" : "Phosphore"})</label>
                    <input
                      type="number"
                      value={form.phosphorus}
                      onChange={(e) => updateForm({ phosphorus: e.target.value })}
                      className="w-full bg-[#16212b] border border-[#2e4052] rounded-lg px-3 py-2 text-xs text-[#F9F8F6] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#A8A093] font-bold">K ({isAr ? "البوتاسيوم" : "Potassium"})</label>
                    <input
                      type="number"
                      value={form.potassium}
                      onChange={(e) => updateForm({ potassium: e.target.value })}
                      className="w-full bg-[#16212b] border border-[#2e4052] rounded-lg px-3 py-2 text-xs text-[#F9F8F6] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#2e4052]">
                <button
                  type="button"
                  onClick={() => {
                    onSave(fieldId, "soil");
                    onClose();
                  }}
                  className="px-6 py-2.5 text-xs font-extrabold text-[#F9F8F6] bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] rounded-xl shadow-lg transition-all active:scale-95 border border-[#B86B53]/30"
                >
                  {t("common.save")}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: YIELD GOAL */}
          {activeTab === "yield" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#D8D2C5]">
                    {isAr ? "مستهدف الإنتاجية (طن/هكتار)" : "Objectif de rendement (tonnes/ha)"}
                  </label>
                  <span className="text-sm font-black text-[#8D5B4C]">{form.targetYield || "0.0"} {t("common.ha")}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.5"
                    max={biologicalCeiling.toFixed(1)}
                    step="0.1"
                    value={form.targetYield || "5.0"}
                    onChange={(e) => updateForm({ targetYield: e.target.value })}
                    className="flex-1 h-2 bg-[#1f2d3a] rounded-lg appearance-none cursor-pointer accent-[#8D5B4C]"
                  />
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={form.targetYield}
                    onChange={(e) => updateForm({ targetYield: e.target.value })}
                    className="w-24 bg-[#1f2d3a] border border-[#2e4052] rounded-xl px-3 py-2 text-xs text-[#F9F8F6] text-center font-mono font-bold focus:outline-none"
                  />
                </div>
                
                <div className="flex justify-between text-[10px] text-[#A8A093] font-mono">
                  <span>{isAr ? "الحد الأدنى: 0.5 طن/هـ" : "Min: 0.5 t/ha"}</span>
                  <span>{isAr ? `السقف البيولوجي الأقصى: ${biologicalCeiling.toFixed(1)} طن/هـ` : `Plafond maximal : ${biologicalCeiling.toFixed(1)} t/ha`}</span>
                </div>
                
                {isOverCeiling && (
                  <p className="text-xs text-rose-400 font-semibold mt-1">
                    ⚠️ {isAr ? `تنبيه: هذا الهدف يتجاوز السقف البيولوجي المتوقع (${biologicalCeiling.toFixed(1)} طن/هكتار).` : `Attention : Objectif supérieur au plafond biologique (${biologicalCeiling.toFixed(1)} t/ha).`}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-[#D8D2C5]">
                  {isAr ? "حالة المعاومة والتحميل الزراعي" : "Statut de charge / alternance"}
                </label>
                <select
                  value={form.bearingStatus}
                  onChange={(e) => updateForm({ bearingStatus: e.target.value })}
                  className="w-full bg-[#1f2d3a] border border-[#2e4052] rounded-xl px-3.5 py-2.5 text-xs text-[#F9F8F6] focus:outline-none focus:ring-1 focus:ring-[#8D5B4C]"
                >
                  <option value="NORMAL">{isAr ? "إنتاج متوازن قياسي (عادي)" : "Production équilibrée (Normale)"}</option>
                  <option value="ON_YEAR">{isAr ? "سنة حمل غزير (سنة زاهرة)" : "Année de forte charge (On-year)"}</option>
                  <option value="OFF_YEAR">{isAr ? "سنة خفيفة (سنة التناوب)" : "Année de faible charge (Off-year)"}</option>
                </select>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#2e4052]">
                <button
                  type="button"
                  disabled={isOverCeiling}
                  onClick={() => {
                    onSave(fieldId, "yield");
                    onClose();
                  }}
                  className={`px-6 py-2.5 text-xs font-extrabold rounded-xl transition-all active:scale-95 ${
                    isOverCeiling 
                      ? "bg-[#1f2d3a] text-[#A8A093] cursor-not-allowed" 
                      : "text-[#F9F8F6] bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] shadow-lg border border-[#B86B53]/30"
                  }`}
                >
                  {t("common.save")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
