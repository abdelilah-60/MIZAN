import React, { useEffect, useRef } from "react";
import type { Field, DynamicField, LogForm } from "../lib/types";
import { IrrigationFormSection } from "./IrrigationFormSection";
import { FertilizerFormSection } from "./FertilizerFormSection";
import { PesticideFormSection } from "./PesticideFormSection";
import { HarvestFormSection } from "./HarvestFormSection";

interface LogOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  field: Field | null;
  logForm: LogForm;
  onLogFormChange: (form: LogForm) => void;
  dynamicFields: DynamicField[];
  isFetchingFields: boolean;
  metadataPayload: Record<string, string>;
  onMetadataChange: (payload: Record<string, string>) => void;
  isLogging: boolean;
}

export function LogOperationModal({
  isOpen,
  onClose,
  onSubmit,
  field,
  logForm,
  onLogFormChange,
  dynamicFields,
  isFetchingFields,
  metadataPayload,
  onMetadataChange,
  isLogging,
}: LogOperationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Dynamic feedback loop for irrigation moved to IrrigationFormSection

  if (!isOpen || !field) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Log Operation">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div ref={modalRef} className="relative w-full max-w-md max-h-[90vh] flex flex-col bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
        <h3 className="text-xl font-bold text-white mb-1">Log Operation</h3>
        <p className="text-slate-400 text-sm mb-6">
          Field: <span className="text-emerald-400 font-medium">{field.name}</span>
        </p>

        <form onSubmit={onSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto pr-1.5 space-y-4 max-h-[55vh] scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <div className="space-y-1">
            <label htmlFor="op-type" className="text-xs text-slate-400 ml-1">Type d&apos;Opération</label>
            <select
              id="op-type"
              ref={firstInputRef}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
              value={logForm.type}
              onChange={(e) => onLogFormChange({ ...logForm, type: e.target.value })}
              aria-label="Type d'Opération"
            >
              <option value="IRRIGATION">💧 ري الحقل</option>
              <option value="FERTILIZER">🧪 تسميد كيميائي معدني</option>
              <option value="ORGANIC_AMENDMENT">🍂 تسميد عضوي متخمر</option>
              <option value="PRUNING">✂️ تقليم وتجميل الأشجار</option>
              <option value="TILLAGE">🚜 حرث وتهوية التربة</option>
              <option value="PESTICIDE">🛡️ معالجة وقائية من الآفات</option>
              <option value="FUNGICIDE">🔬 معالجة الفطريات والأمراض</option>
              <option value="WEEDING">🌿 إزالة الأعشاب الضارة</option>
              <option value="HARVEST">🫒 جني المحصول</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="op-date" className="text-xs text-slate-400 ml-1">Date &amp; Time (Optional)</label>
            <input
              id="op-date"
              type="datetime-local"
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
              value={logForm.date}
              onChange={(e) => onLogFormChange({ ...logForm, date: e.target.value })}
              aria-label="Date & Time"
            />
            <p className="text-[10px] text-slate-500 ml-1 mt-1">Leaves empty for current time</p>
          </div>

          {logForm.type === "IRRIGATION" ? (
            <IrrigationFormSection
              metadata={metadataPayload}
              onMetadataChange={onMetadataChange}
              field={field}
            />
          ) : logForm.type === "FERTILIZER" ? (
            <FertilizerFormSection
              metadata={metadataPayload}
              onMetadataChange={onMetadataChange}
              field={field}
            />
          ) : logForm.type === "PRUNING" ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="pruning-technique" className="text-xs text-slate-400 ml-1">Type de Taille (Pruning Technique)</label>
                <select
                  id="pruning-technique"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.technique || "FRUCTIFICATION"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, technique: e.target.value })}
                >
                  <option value="FORMATION">تقليم التكوين</option>
                  <option value="FRUCTIFICATION">تقليم الإثمار</option>
                  <option value="RAJEUNISSEMENT">تقليم التشبيب</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="pruning-intensity" className="text-xs text-slate-400 ml-1">شدة التقليم</label>
                <select
                  id="pruning-intensity"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.intensityLevel || "MODERATE"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, intensityLevel: e.target.value })}
                >
                  <option value="LIGHT">خفيفة (إزالة أقل من 10%)</option>
                  <option value="MODERATE">متوسطة (إزالة 10% إلى 20%)</option>
                  <option value="SEVERE">قاسية (إزالة أكثر من 20%)</option>
                </select>
              </div>
            </div>
          ) : (logForm.type === "PESTICIDE" || logForm.type === "FUNGICIDE") ? (
            <PesticideFormSection
              metadata={metadataPayload}
              onMetadataChange={onMetadataChange}
              type={logForm.type}
              date={logForm.date}
            />
          ) : logForm.type === "HARVEST" ? (
            <HarvestFormSection
              metadata={metadataPayload}
              onMetadataChange={onMetadataChange}
              field={field}
            />
          ) : logForm.type === "TILLAGE" ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="tillage-tech" className="text-xs text-slate-400 ml-1">نوع تقنية الحرث</label>
                <select
                  id="tillage-tech"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.technique || "CHISEL"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, technique: e.target.value })}
                >
                  <option value="CHISEL">حرث شيزل عميق</option>
                  <option value="COVER_CROP">حرث سطحي كوفير كروب</option>
                  <option value="ROTAVATOR">تفتيت التربة روتاري</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="tillage-depth" className="text-xs text-slate-400 ml-1">Profondeur (Depth)</label>
                <select
                  id="tillage-depth"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.depth || "DEEP"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, depth: e.target.value })}
                >
                  <option value="SURFACE">Superficiel (سطحي - أقل من 15 سم)</option>
                  <option value="DEEP">Profond (عميق - أكثر من 15 سم)</option>
                </select>
              </div>
            </div>
          ) : logForm.type === "ORGANIC_AMENDMENT" ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="organic-type" className="text-xs text-slate-400 ml-1">Type d&apos;Amendement (Type)</label>
                <select
                  id="organic-type"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.fertilizerType || "BOVINE"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, fertilizerType: e.target.value })}
                >
                  <option value="BOVINE">Fumier Bovin (غبار الأبقار)</option>
                  <option value="OVINE">Fumier Ovin (غبار الأغنام)</option>
                  <option value="COMPOST">Compost Végétal (كومبوست نباتي)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="organic-state" className="text-xs text-slate-400 ml-1">État (State)</label>
                <select
                  id="organic-state"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.state || "DECOMPOSED"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, state: e.target.value })}
                >
                  <option value="DECOMPOSED">Décomposé (متحلل كلياً)</option>
                  <option value="RAW">Frais / Non décomposé (غير متحلل/فريش)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 ml-1">Quantity / الكمية</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    placeholder="20"
                    className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                    value={metadataPayload.quantity || ""}
                    onChange={(e) => onMetadataChange({ ...metadataPayload, quantity: e.target.value })}
                    required
                  />
                  <select
                    className="w-40 bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                    value={metadataPayload.unit || "Kg/arbre"}
                    onChange={(e) => onMetadataChange({ ...metadataPayload, unit: e.target.value })}
                  >
                    <option value="Kg/arbre">Kg/arbre (كجم/شجرة)</option>
                    <option value="Tonne/parcelle">Tonne/parcelle (طن/قطعة)</option>
                  </select>
                </div>
              </div>
            </div>
          ) : logForm.type === "WEEDING" ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="weeding-method" className="text-xs text-slate-400 ml-1">Méthode de Désherbage (Method)</label>
                <select
                  id="weeding-method"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.method || "MECHANICAL"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, method: e.target.value })}
                >
                  <option value="MECHANICAL">Mécanique / Girobroyeur (آلات تقطيع ميكانيكي)</option>
                  <option value="CHEMICAL">Chimique / Herbicides (رش مبيدات أعشاب)</option>
                </select>
              </div>

              {metadataPayload.method === "CHEMICAL" && (
                <>
                  <div className="space-y-1">
                    <label htmlFor="weeding-active" className="text-xs text-slate-400 ml-1">Matière Active / المادة الفعالة</label>
                    <select
                      id="weeding-active"
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                      value={metadataPayload.activeIngredient || "GLYPHOSATE"}
                      onChange={(e) => onMetadataChange({ ...metadataPayload, activeIngredient: e.target.value })}
                    >
                      <option value="GLYPHOSATE">Glyphosate (غليفوسات)</option>
                      <option value="OXYFLUORFENE">Oxyfluorfène (أوكسي فلورفين)</option>
                      <option value="FLAZASULFURON">Flazasulfuron (فلازاسولفورون)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 ml-1">Quantity / الكمية</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="any"
                        placeholder="2.0"
                        className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                        value={metadataPayload.quantity || ""}
                        onChange={(e) => onMetadataChange({ ...metadataPayload, quantity: e.target.value })}
                        required
                      />
                      <select
                        className="w-24 bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                        value={metadataPayload.unit || "L"}
                        onChange={(e) => onMetadataChange({ ...metadataPayload, unit: e.target.value })}
                      >
                        <option value="L">L</option>
                        <option value="ml">ml</option>
                        <option value="Kg">Kg</option>
                        <option value="g">g</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : isFetchingFields ? (
            <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 text-center text-sm text-slate-400">
              Loading requirements from AI Brain...
            </div>
          ) : dynamicFields.length > 0 ? (
            dynamicFields.map((df, idx) => {
              const key = df.name.charAt(0).toLowerCase() + df.name.slice(1);


              return (
                <div className="space-y-1" key={idx}>
                  <label className="text-xs text-slate-400 ml-1">
                    {df.name} {df.unit ? `(${df.unit})` : ""}
                  </label>
                  <input
                    type={df.inputType || "text"}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                    value={metadataPayload[key] || ""}
                    onChange={(e) => onMetadataChange({ ...metadataPayload, [key]: e.target.value })}
                    required
                    aria-label={df.name}
                  />
                </div>
              );
            })
          ) : (
            <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 text-center text-sm text-slate-400">
              No specific dynamic parameters found.
            </div>
          )}

          </div>

          <div className="flex gap-3 pt-4 mt-4 border-t border-white/10 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLogging || !logForm.type}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {isLogging ? "Saving..." : "Save Log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
