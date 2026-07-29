import React from "react";
import type { Field } from "../lib/types";

export interface FertilizerFormSectionProps {
  metadata: Record<string, string>;
  onMetadataChange: (payload: Record<string, string>) => void;
  field: Field | null;
}

export const FertilizerFormSection: React.FC<FertilizerFormSectionProps> = React.memo(({
  metadata,
  onMetadataChange,
  field
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="fertilizer-type" className="text-xs text-slate-400 ml-1">Type de l&apos;Engrais (Fertilizer Type)</label>
        <select
          id="fertilizer-type"
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
          value={metadata.fertilizerType || "NPK"}
          onChange={(e) => onMetadataChange({ ...metadata, fertilizerType: e.target.value })}
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
          value={metadata.quantity || ""}
          onChange={(e) => onMetadataChange({ ...metadata, quantity: e.target.value })}
          required
        />
      </div>

      {(metadata.fertilizerType === "NPK" || !metadata.fertilizerType) && (
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
                  value={metadata.n_percent || ""}
                  onChange={(e) => onMetadataChange({ ...metadata, n_percent: e.target.value })}
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
                  value={metadata.p_percent || ""}
                  onChange={(e) => onMetadataChange({ ...metadata, p_percent: e.target.value })}
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
                  value={metadata.k_percent || ""}
                  onChange={(e) => onMetadataChange({ ...metadata, k_percent: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Dynamic calculation card */}
          {(() => {
            const qty = parseFloat(metadata.quantity || "0");
            const nPct = parseFloat(metadata.n_percent || "0");
            const pPct = parseFloat(metadata.p_percent || "0");
            const kPct = parseFloat(metadata.k_percent || "0");

            const agro = typeof field?.agronomicData === "string"
              ? JSON.parse(field.agronomicData as string)
              : (field?.agronomicData || {}) as Record<string, any>;
            const density = parseInt(agro.treeDensity || agro["treeDensity"] || agro["Densité de Plantation"] || "200", 10);
            const area = field?.area || 1.0;
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
  );
});
