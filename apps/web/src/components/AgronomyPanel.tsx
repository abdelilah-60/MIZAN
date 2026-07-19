import React from "react";
import type { AgronomyData, AgronomyForm, OperationData, Field } from "../lib/types";

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
  const updateForm = (partial: Partial<AgronomyForm>) => {
    onFormChange({ ...form, ...partial });
  };

  const [isIrrigationOpen, setIsIrrigationOpen] = React.useState(false);
  const [isSoilOpen, setIsSoilOpen] = React.useState(false);
  const [isYieldOpen, setIsYieldOpen] = React.useState(false);

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
          // If organic amendment is added, we count it as a baseline organic NPK supply
          const meta = (op.metadata || {}) as any;
          const qty = Number(meta.quantity || 0);
          const typeVal = meta.fertilizerType || "BOVINE";
          
          // Let's assume standard values per ton or per kg
          if (meta.unit === "Kg/arbre") {
            // Estimate total for field
            const treeDensity = form.treeDensity ? Number(form.treeDensity) : 200;
            const area = field?.area || 1.0;
            const totalTrees = Math.round(treeDensity * area) || 200;
            const totalKg = qty * totalTrees;
            
            if (typeVal === "BOVINE") {
              totalN += totalKg * 0.006; // 0.6% N
              totalP += totalKg * 0.003; // 0.3% P
              totalK += totalKg * 0.005; // 0.5% K
            } else if (typeVal === "OVINE") {
              totalN += totalKg * 0.009; // 0.9% N
              totalP += totalKg * 0.005; // 0.5% P
              totalK += totalKg * 0.008; // 0.8% K
            } else {
              totalN += totalKg * 0.015; // 1.5% N
              totalP += totalKg * 0.01;
              totalK += totalKg * 0.015;
            }
          } else {
            // Tonne/parcelle
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

  const [prevBearingStatus, setPrevBearingStatus] = React.useState(form.bearingStatus);
  const [prevCeiling, setPrevCeiling] = React.useState(biologicalCeiling);

  React.useEffect(() => {
    if (form.bearingStatus !== prevBearingStatus || biologicalCeiling !== prevCeiling) {
      setPrevBearingStatus(form.bearingStatus);
      setPrevCeiling(biologicalCeiling);
      
      let mult = 0.75;
      if (form.bearingStatus === "ON_YEAR") mult = 0.95;
      else if (form.bearingStatus === "OFF_YEAR") mult = 0.45;
      
      const suggestedVal = (biologicalCeiling * mult).toFixed(1);
      updateForm({ targetYield: suggestedVal });
    }
  }, [form.bearingStatus, biologicalCeiling, prevBearingStatus, prevCeiling]);

  const isOverCeiling = Number(form.targetYield) > biologicalCeiling;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <span>🧪</span> Agronomie & Décisions (Intelligence Sans Capteurs)
          </h4>

          {/* RECOMMENDATIONS BOXES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Irrigation Recommendation */}
            <div className="bg-slate-900/60 p-5 rounded-xl border border-blue-500/20 shadow-inner flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  💧 Plan de Récapitulation d'Irrigation
                </h5>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Évaporations (ET0):</span>
                    <span className="font-semibold text-slate-200">
                      {data.recommendations?.water?.et0 || 0} mm/jour
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Besoin de la culture (ETc):</span>
                    <span className="font-semibold text-slate-200">
                      {data.recommendations?.water?.etc || 0} mm/jour
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Pluies d'hier:</span>
                    <span className="font-semibold text-teal-400">
                      {data.recommendations?.water?.precipitation || 0} mm
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-blue-300 pt-1">
                    <span>Volume à apporter:</span>
                    <span>{data.recommendations?.water?.litersPerTree || 0} L / Arbre</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg">
                  ⏱️
                </div>
                <div>
                  <p className="text-xs text-slate-400">Durée d'arrosage recommandée</p>
                  <p className="text-sm font-bold text-white">
                    {durationHours} h ({durationMinutes} min)
                  </p>
                </div>
              </div>
            </div>

            {/* Fertilizer Recommendation */}
            <div className="bg-slate-900/60 p-5 rounded-xl border border-emerald-500/20 shadow-inner flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  🧪 Plan de Fertilisation NPK (Annuel)
                </h5>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Objectif de rendement:</span>
                    <span className="font-semibold text-slate-200">
                      {data.recommendations?.npk?.targetYield || 5} tonnes/ha
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Statut de charge:</span>
                    <span className="font-bold text-slate-200 uppercase">
                      {data.recommendations?.npk?.bearingStatus}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-2">
                    <div className="bg-slate-800/50 p-2 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-500 font-bold">N (Azote)</div>
                      <div className="text-sm font-bold text-emerald-400">
                        {data.recommendations?.npk?.n || 0} kg/ha
                      </div>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-500 font-bold">P (Phosphate)</div>
                      <div className="text-sm font-bold text-emerald-400">
                        {data.recommendations?.npk?.p || 0} kg/ha
                      </div>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-500 font-bold">K (Potasse)</div>
                      <div className="text-sm font-bold text-emerald-400">
                        {data.recommendations?.npk?.k || 0} kg/ha
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 space-y-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                      Suivi Nutritionnel Annuel (متابعة التسميد السنوي)
                    </span>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-400">Azote (N) - الآزوت</span>
                        <span className="font-mono">
                          {loggedN_ha.toFixed(1)} / {recN} kg/ha ({Math.round(pctN)}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-950/60 h-2 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            pctN < 85 
                              ? "bg-sky-500/80" 
                              : pctN <= 115 
                              ? "bg-green-500" 
                              : "bg-amber-500 animate-pulse"
                          }`}
                          style={{ width: `${Math.min(100, pctN)}%` }}
                        />
                      </div>
                      {pctN > 115 && (
                        <p className="text-[9px] text-amber-400 font-medium">⚠️ Alerte: Excès d&apos;azote (تسمم نتروجيني).</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-400">Phosphore (P2O5) - الفوسفور</span>
                        <span className="font-mono">
                          {loggedP_ha.toFixed(1)} / {recP} kg/ha ({Math.round(pctP)}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-950/60 h-2 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            pctP < 85 
                              ? "bg-sky-500/80" 
                              : pctP <= 115 
                              ? "bg-green-500" 
                              : "bg-amber-500 animate-pulse"
                          }`}
                          style={{ width: `${Math.min(100, pctP)}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-400">Potassium (K2O) - البوتاسيوم</span>
                        <span className="font-mono">
                          {loggedK_ha.toFixed(1)} / {recK} kg/ha ({Math.round(pctK)}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-950/60 h-2 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            pctK < 85 
                              ? "bg-sky-500/80" 
                              : pctK <= 115 
                              ? "bg-green-500" 
                              : "bg-amber-500 animate-pulse"
                          }`}
                          style={{ width: `${Math.min(100, pctK)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal mt-3">
                {data.recommendations?.npk?.soilTestDate
                  ? "Basé sur l'analyse de sol du " +
                    new Date(data.recommendations.npk.soilTestDate).toLocaleDateString("fr-FR")
                  : "⚠️ Analyse de sol manquante. Recommandations basées sur des valeurs par défaut."}
              </p>
            </div>
          </div>

          {/* CONFIGURATION FORMS (COLLAPSIBLE ACCORDIONS) */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Configurations & Paramètres (إعدادات القطعة)
            </h5>

            {/* Accordion 1: Irrigation System */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setIsIrrigationOpen(!isIrrigationOpen)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">🚰</span>
                  <div>
                    <h6 className="text-xs font-bold text-white">Système d'Irrigation (نظام الري)</h6>
                    <p className="text-[9px] text-slate-500">Débit, goutteurs par arbre, efficacité...</p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs transition-transform duration-200">
                  {isIrrigationOpen ? "▲" : "▼"}
                </span>
              </button>
              
              {isIrrigationOpen && (
                <div className="p-5 border-t border-white/5 bg-slate-900/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Débit goutteur (L/h)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={form.dripperFlowRate}
                      onChange={(e) => updateForm({ dripperFlowRate: e.target.value })}
                      className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Goutteurs/arbre</label>
                    <input
                      type="number"
                      value={form.drippersPerTree}
                      onChange={(e) => updateForm({ drippersPerTree: e.target.value })}
                      className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Densité (arbres/ha)</label>
                    <input
                      type="number"
                      value={form.treeDensity}
                      onChange={(e) => updateForm({ treeDensity: e.target.value })}
                      className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Efficacité</label>
                    <input
                      type="number"
                      step="0.05"
                      value={form.efficiency}
                      onChange={(e) => updateForm({ efficiency: e.target.value })}
                      className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-4 flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => onSave(fieldId, "irrigation")}
                      className="px-6 py-2 text-xs font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl border border-blue-500/20 transition-all active:scale-95"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Soil Analysis */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setIsSoilOpen(!isSoilOpen)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">🧪</span>
                  <div>
                    <h6 className="text-xs font-bold text-white">Analyse du Sol (تحليل التربة)</h6>
                    <p className="text-[9px] text-slate-500">Date, pH, Matière organique, NPK...</p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs transition-transform duration-200">
                  {isSoilOpen ? "▲" : "▼"}
                </span>
              </button>
              
              {isSoilOpen && (
                <div className="p-5 border-t border-white/5 bg-slate-900/20 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Date d'analyse</label>
                      <input
                        type="date"
                        value={form.analysisDate}
                        onChange={(e) => updateForm({ analysisDate: e.target.value })}
                        className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">pH</label>
                      <input
                        type="number"
                        step="0.1"
                        value={form.ph}
                        onChange={(e) => updateForm({ ph: e.target.value })}
                        className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Matière Org. (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={form.organicMatter}
                        onChange={(e) => updateForm({ organicMatter: e.target.value })}
                        className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                      />
                    </div>
                  </div>
                  <div className="bg-slate-950/30 p-4 rounded-xl border border-white/5 space-y-3">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Nutriments du Sol (NPK)</span>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">N (mg/kg)</label>
                        <input
                          type="number"
                          value={form.nitrogen}
                          onChange={(e) => updateForm({ nitrogen: e.target.value })}
                          className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">P (mg/kg)</label>
                        <input
                          type="number"
                          value={form.phosphorus}
                          onChange={(e) => updateForm({ phosphorus: e.target.value })}
                          className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">K (mg/kg)</label>
                        <input
                          type="number"
                          value={form.potassium}
                          onChange={(e) => updateForm({ potassium: e.target.value })}
                          className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => onSave(fieldId, "soil")}
                      className="px-6 py-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl border border-emerald-500/20 transition-all active:scale-95"
                    >
                      Enregistrer l'analyse du sol
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Yield Goal */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setIsYieldOpen(!isYieldOpen)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">🫒</span>
                  <div>
                    <h6 className="text-xs font-bold text-white">Objectif de Rendement (الإنتاج المستهدف)</h6>
                    <p className="text-[9px] text-slate-500">Rendement cible, statut d'alternance...</p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs transition-transform duration-200">
                  {isYieldOpen ? "▲" : "▼"}
                </span>
              </button>
              
              {isYieldOpen && (
                <div className="p-5 border-t border-white/5 bg-slate-900/20 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-slate-400">Rendement cible (tonnes/ha)</label>
                      <span className="text-xs font-bold text-amber-400">{form.targetYield || "0.0"} t/ha</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0.5"
                        max={biologicalCeiling.toFixed(1)}
                        step="0.1"
                        value={form.targetYield || "5.0"}
                        onChange={(e) => updateForm({ targetYield: e.target.value })}
                        className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
                      />
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        value={form.targetYield}
                        onChange={(e) => updateForm({ targetYield: e.target.value })}
                        className="w-20 bg-slate-800 border border-white/5 rounded-lg px-2 py-1 text-xs text-white text-center focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                      />
                    </div>
                    
                    <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                      <span>Min: 0.5 t/ha</span>
                      <span>Max (السقف البيولوجي): {biologicalCeiling.toFixed(1)} t/ha</span>
                    </div>
                    
                    {isOverCeiling && (
                      <p className="text-[9px] text-rose-500 font-semibold mt-1">
                        ⚠️ تنبيه: هذا الهدف يتجاوز السقف المتوقع لهذا الصنف في هذه الكثافة (الحد الأقصى المنطقي: {biologicalCeiling.toFixed(1)} طن/هكتار).
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Statut de charge</label>
                    <select
                      value={form.bearingStatus}
                      onChange={(e) => updateForm({ bearingStatus: e.target.value })}
                      className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    >
                      <option value="NORMAL">Pleine Production (Normal)</option>
                      <option value="ON_YEAR">Année Pleine (On-year)</option>
                      <option value="OFF_YEAR">Année Creuse (Off-year)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex justify-end pt-2">
                    <button
                      type="button"
                      disabled={isOverCeiling}
                      onClick={() => onSave(fieldId, "yield")}
                      className={`px-6 py-2 text-xs font-bold rounded-xl border transition-all active:scale-95 ${
                        isOverCeiling 
                          ? "bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed" 
                          : "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20"
                      }`}
                    >
                      Enregistrer l'objectif
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
  );
}
);
