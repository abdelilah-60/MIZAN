import React, { useEffect, useRef } from "react";
import type { Field, DynamicField, LogForm } from "../lib/types";

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

  // Dynamic feedback loop: calculate volume from duration using field properties
  const durationStr = metadataPayload.duration;
  useEffect(() => {
    if (logForm.type !== "IRRIGATION" || !field) return;

    const agro = typeof field.agronomicData === "string"
      ? JSON.parse(field.agronomicData as string)
      : (field.agronomicData || {}) as Record<string, any>;

    const flowRate = parseFloat(agro.dripperFlowRate || agro["Débit du goutteur (L/h)"] || "4.0");
    const drippers = parseInt(agro.drippersPerTree || agro["Nombre de goutteurs/arbre"] || "4", 10);
    const efficiency = parseFloat(agro.efficiency || "0.85");

    const durationVal = parseFloat(durationStr || "0");
    const volumeVal = (durationVal * flowRate * drippers * efficiency) / 60;
    const volumeStr = isNaN(volumeVal) ? "0" : volumeVal.toFixed(1);

    if (metadataPayload.volume !== volumeStr) {
      onMetadataChange({
        ...metadataPayload,
        volume: volumeStr
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationStr, logForm.type, field?.agronomicData]);

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
              <option value="IRRIGATION">💧 Irrigation</option>
              <option value="FERTILIZER">🧪 Fertilisation (Minérale)</option>
              <option value="ORGANIC_AMENDMENT">🍂 Amendement Organique (التسميد العضوي)</option>
              <option value="PRUNING">✂️ Taille</option>
              <option value="TILLAGE">🚜 Travail du sol (الحراثة)</option>
              <option value="PESTICIDE">🛡️ Pesticide</option>
              <option value="FUNGICIDE">🔬 Fongicide</option>
              <option value="WEEDING">🌿 Désherbage (إزالة الأعشاب)</option>
              <option value="HARVEST">🫒 Récolte</option>
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

          {logForm.type === "FERTILIZER" ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="fertilizer-type" className="text-xs text-slate-400 ml-1">Type de l&apos;Engrais (Fertilizer Type)</label>
                <select
                  id="fertilizer-type"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.fertilizerType || "NPK"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, fertilizerType: e.target.value })}
                >
                  <option value="NPK">NPK (Composite) / السماد المركب</option>
                  <option value="AMMONITRATE">Ammonitrate / أمونيتر</option>
                  <option value="UREA">Urea / اليوريا</option>
                  <option value="ORGANIC">Organic / السماد العضوي</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="fertilizer-qty" className="text-xs text-slate-400 ml-1">Total Quantity (kg) - الكمية الإجمالية</label>
                <input
                  id="fertilizer-qty"
                  type="number"
                  placeholder="50"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.quantity || ""}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, quantity: e.target.value })}
                  required
                />
              </div>

              {(metadataPayload.fertilizerType === "NPK" || !metadataPayload.fertilizerType) && (
                <>
                  <div className="bg-slate-800/40 p-4 border border-white/5 rounded-xl space-y-3">
                    <span className="text-xs font-semibold text-emerald-400">NPK Formula (%) - تركيبة السماد المركب</span>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="npk-n" className="text-[10px] text-slate-400 ml-1">N (Azote %)</label>
                        <input
                          id="npk-n"
                          type="number"
                          placeholder="14"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                          value={metadataPayload.n_percent || ""}
                          onChange={(e) => onMetadataChange({ ...metadataPayload, n_percent: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="npk-p" className="text-[10px] text-slate-400 ml-1">P (Phosphore %)</label>
                        <input
                          id="npk-p"
                          type="number"
                          placeholder="28"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                          value={metadataPayload.p_percent || ""}
                          onChange={(e) => onMetadataChange({ ...metadataPayload, p_percent: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="npk-k" className="text-[10px] text-slate-400 ml-1">K (Potassium %)</label>
                        <input
                          id="npk-k"
                          type="number"
                          placeholder="14"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                          value={metadataPayload.k_percent || ""}
                          onChange={(e) => onMetadataChange({ ...metadataPayload, k_percent: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic calculation card */}
                  {(() => {
                    const qty = parseFloat(metadataPayload.quantity || "0");
                    const nPct = parseFloat(metadataPayload.n_percent || "0");
                    const pPct = parseFloat(metadataPayload.p_percent || "0");
                    const kPct = parseFloat(metadataPayload.k_percent || "0");

                    const agro = typeof field.agronomicData === "string"
                      ? JSON.parse(field.agronomicData as string)
                      : (field.agronomicData || {}) as Record<string, any>;
                    const density = parseInt(agro.treeDensity || agro["treeDensity"] || agro["Densité de Plantation"] || "200", 10);
                    const area = field.area || 1.0;
                    const totalTrees = Math.round(density * area) || 200;

                    const netN = totalTrees > 0 ? ((qty * (nPct / 100)) / totalTrees) * 1000 : 0;
                    const netP = totalTrees > 0 ? ((qty * (pPct / 100)) / totalTrees) * 1000 : 0;
                    const netK = totalTrees > 0 ? ((qty * (kPct / 100)) / totalTrees) * 1000 : 0;

                    return (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
                        <div className="text-xs font-semibold text-emerald-400 flex justify-between">
                          <span>Calculated Nutrition per Tree (g)</span>
                          <span className="opacity-80">Total Trees: {totalTrees}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono font-bold text-white">
                          <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5">
                            <div className="text-[10px] text-slate-400">Net N</div>
                            <div className="text-emerald-400 mt-1">{netN.toFixed(1)} g</div>
                          </div>
                          <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5">
                            <div className="text-[10px] text-slate-400">Net P</div>
                            <div className="text-emerald-400 mt-1">{netP.toFixed(1)} g</div>
                          </div>
                          <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5">
                            <div className="text-[10px] text-slate-400">Net K</div>
                            <div className="text-emerald-400 mt-1">{netK.toFixed(1)} g</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
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
                  <option value="FORMATION">Taille de formation (تقليم التكوين)</option>
                  <option value="FRUCTIFICATION">Taille de fructification (تقليم الإثمار)</option>
                  <option value="RAJEUNISSEMENT">Taille de rajeunissement (تقليم التشبيب)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="pruning-intensity" className="text-xs text-slate-400 ml-1">Niveau d&apos;Intensité (Intensity Level)</label>
                <select
                  id="pruning-intensity"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.intensityLevel || "MODERATE"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, intensityLevel: e.target.value })}
                >
                  <option value="LIGHT">Légère / خفيفة (إزالة أقل من 10%)</option>
                  <option value="MODERATE">Modérée / متوسطة (إزالة 10% إلى 20%)</option>
                  <option value="SEVERE">Sévère / قاسية (إزالة أكثر من 20%)</option>
                </select>
              </div>
            </div>
          ) : (logForm.type === "PESTICIDE" || logForm.type === "FUNGICIDE") ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 ml-1">
                  {logForm.type === "PESTICIDE" ? "Target Pest / الآفة المستهدفة" : "Target Disease / المرض المستهدف"}
                </label>
                <select
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.targetPest || (logForm.type === "PESTICIDE" ? "FLY" : "PEACOCK")}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, targetPest: e.target.value })}
                >
                  {logForm.type === "PESTICIDE" ? (
                    <>
                      <option value="FLY">Mouche de l&apos;olive (ذبابة الزيتون)</option>
                      <option value="MOTH">Teigne de l&apos;olive (عثة الزيتون)</option>
                      <option value="SCALE">Cochenille noire (الحشرة القشرية السوداء)</option>
                      <option value="PSYLLA">Psylle de l&apos;olive (بسيلا الزيتون)</option>
                    </>
                  ) : (
                    <>
                      <option value="PEACOCK">Oeil de paon (عين الطاووس)</option>
                      <option value="ANTHRACNOSE">Anthracnose (الأنثراكنوز)</option>
                      <option value="VERTICILLIUM">Verticilliose (الذبول الفرتيسيليومي)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 ml-1">Matière Active / المادة الفعالة</label>
                <select
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.activeIngredient || (logForm.type === "PESTICIDE" ? "DELTAMETHRINE" : "CUIVRE")}
                  onChange={(e) => {
                    const activeVal = e.target.value;
                    let defaultDar = "14";
                    if (activeVal === "CUIVRE") defaultDar = "21";
                    else if (activeVal === "DODINE") defaultDar = "15";
                    else if (activeVal === "TEBUCONAZOLE") defaultDar = "30";
                    else if (activeVal === "DIMETHOATE") defaultDar = "28";
                    
                    onMetadataChange({ 
                      ...metadataPayload, 
                      activeIngredient: activeVal,
                      darDays: defaultDar
                    });
                  }}
                >
                  {logForm.type === "PESTICIDE" ? (
                    <>
                      <option value="DELTAMETHRINE">Deltaméthrine (دلتامثرين)</option>
                      <option value="DIMETHOATE">Diméthoate (diméthoate)</option>
                      <option value="LAMBDA_CYHALOTHRINE">Lambda-cyhalothrine (لامبدا سيهالوثرين)</option>
                      <option value="SPINOSAD">Spinosad (سبينوساد)</option>
                    </>
                  ) : (
                    <>
                      <option value="CUIVRE">Cuivre (النحاس)</option>
                      <option value="DODINE">Dodine (دودين)</option>
                      <option value="TEBUCONAZOLE">Tébuconazole (تيبوكونازول)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 ml-1">Quantity / الكمية</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    placeholder="1.5"
                    className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                    value={metadataPayload.quantity || ""}
                    onChange={(e) => onMetadataChange({ ...metadataPayload, quantity: e.target.value })}
                    required
                  />
                  <select
                    className="w-24 bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                    value={metadataPayload.unit || (logForm.type === "PESTICIDE" ? "L" : "Kg")}
                    onChange={(e) => onMetadataChange({ ...metadataPayload, unit: e.target.value })}
                  >
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                    <option value="Kg">Kg</option>
                    <option value="g">g</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 ml-1">Délai Avant Récolte (DAR - Days) / فترة الأمان باليوم</label>
                <input
                  type="number"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.darDays || ""}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, darDays: e.target.value })}
                  required
                />
              </div>

              {(() => {
                const dar = parseInt(metadataPayload.darDays || "0", 10);
                if (dar <= 0) return null;
                const baseDate = logForm.date ? new Date(logForm.date) : new Date();
                const unlockDate = new Date(baseDate.getTime() + dar * 24 * 60 * 60 * 1000);
                const unlockStr = unlockDate.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
                return (
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-400 space-y-1">
                    <span className="font-semibold">⚠️ Respect du Délai Avant Récolte (DAR)</span>
                    <p>Le récolte de cette parcelle sera bloqué pour sécurité sanitaire jusqu&apos;au <strong className="underline text-white font-mono">{unlockStr}</strong> ({dar} jours de sécurité).</p>
                  </div>
                );
              })()}
            </div>
          ) : logForm.type === "HARVEST" ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="harvest-method" className="text-xs text-slate-400 ml-1">Méthode de Récolte (Harvesting Method)</label>
                <select
                  id="harvest-method"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.method || "MANUAL"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, method: e.target.value })}
                >
                  <option value="MANUAL">Manuelle (جني يدوي)</option>
                  <option value="SHAKER_COMB">Peignes vibreurs (أمشاط ميكانيكية)</option>
                  <option value="TRUNK_SHAKER">Vibreurs de troncs (هزازات الجذوع)</option>
                  <option value="GAULAGE">Gaulage (الضرب بالعصا)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="harvest-qty" className="text-xs text-slate-400 ml-1">Quantité Totale (Kg) - الوزن الإجمالي</label>
                <input
                  id="harvest-qty"
                  type="number"
                  placeholder="2500"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.quantity || ""}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, quantity: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="harvest-dest" className="text-xs text-slate-400 ml-1">Destination / الغرض من المحصول</label>
                <select
                  id="harvest-dest"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.destination || "OIL"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, destination: e.target.value })}
                >
                  <option value="OIL">Trituration (إنتاج الزيت)</option>
                  <option value="TABLE">Conserve (زيتون مائدة)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="harvest-maturity" className="text-xs text-slate-400 ml-1">Indice de Maturité / مؤشر النضج</label>
                <select
                  id="harvest-maturity"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.maturityIndex || "TURNING"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, maturityIndex: e.target.value })}
                >
                  <option value="GREEN">Vert (أخضر)</option>
                  <option value="TURNING">Tournant (متلون)</option>
                  <option value="BLACK">Noir (أسود)</option>
                </select>
              </div>

              {(() => {
                const qty = parseFloat(metadataPayload.quantity || "0");
                const agro = typeof field.agronomicData === "string"
                  ? JSON.parse(field.agronomicData as string)
                  : (field.agronomicData || {}) as Record<string, any>;
                const density = parseInt(agro.treeDensity || agro["treeDensity"] || agro["Densité de Plantation"] || "200", 10);
                const area = field.area || 1.0;
                const totalTrees = Math.round(density * area) || 200;

                const yieldPerTree = totalTrees > 0 ? qty / totalTrees : 0;
                const yieldPerHectare = area > 0 ? qty / area : 0;

                return (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
                    <span className="text-xs font-semibold text-emerald-400">Yield Analytics Summary / ملخص مردودية الجني</span>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono font-bold text-white">
                      <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5">
                        <div className="text-[10px] text-slate-400">Rendement par Arbre</div>
                        <div className="text-emerald-400 mt-1">{yieldPerTree.toFixed(2)} Kg/arbre</div>
                      </div>
                      <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5">
                        <div className="text-[10px] text-slate-400">Rendement par Hectare</div>
                        <div className="text-emerald-400 mt-1">{(yieldPerHectare / 1000).toFixed(2)} t/ha</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : logForm.type === "TILLAGE" ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="tillage-tech" className="text-xs text-slate-400 ml-1">Outil / Technique (Technique)</label>
                <select
                  id="tillage-tech"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
                  value={metadataPayload.technique || "CHISEL"}
                  onChange={(e) => onMetadataChange({ ...metadataPayload, technique: e.target.value })}
                >
                  <option value="CHISEL">Chisel (حرث عميق / شيزل)</option>
                  <option value="COVER_CROP">Cover-crop (حرث سطحي / كوفير كروب)</option>
                  <option value="ROTAVATOR">Rotavator (تفتيت التربة / روتاري)</option>
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
              
              if (logForm.type === "IRRIGATION" && df.name === "Volume") {
                return (
                  <div className="space-y-1" key={idx}>
                    <label className="text-xs text-emerald-400 font-medium ml-1">
                      Calculated Volume (Liters) - الحجم المحتسب تلقائياً
                    </label>
                    <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5 text-sm text-emerald-400 font-mono font-bold flex justify-between items-center">
                      <span>{metadataPayload[key] || "0.0"} L</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider">Calculé</span>
                    </div>
                  </div>
                );
              }

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
