import React from "react";
import type { Field } from "../lib/types";

export interface HarvestFormSectionProps {
  metadata: Record<string, string>;
  onMetadataChange: (payload: Record<string, string>) => void;
  field: Field | null;
}

export const HarvestFormSection: React.FC<HarvestFormSectionProps> = React.memo(({
  metadata,
  onMetadataChange,
  field
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="harvest-method" className="text-xs text-slate-400 ml-1">طريقة الجني</label>
        <select
          id="harvest-method"
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
          value={metadata.method || "MANUAL"}
          onChange={(e) => onMetadataChange({ ...metadata, method: e.target.value })}
        >
          <option value="MANUAL">جني يدوي تقليدي</option>
          <option value="SHAKER_COMB">أمشاط ميكانيكية خفيفة</option>
          <option value="TRUNK_SHAKER">هزازات الجذوع الميكانيكية</option>
          <option value="GAULAGE">الضرب بالعصا</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="harvest-qty" className="text-xs text-slate-400 ml-1">الوزن الإجمالي المحصود (كجم)</label>
        <input
          id="harvest-qty"
          type="number"
          placeholder="2500"
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
          value={metadata.quantity || ""}
          onChange={(e) => onMetadataChange({ ...metadata, quantity: e.target.value })}
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="harvest-dest" className="text-xs text-slate-400 ml-1">الوجهة التجارية للمحصول</label>
        <select
          id="harvest-dest"
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
          value={metadata.destination || "OIL"}
          onChange={(e) => onMetadataChange({ ...metadata, destination: e.target.value })}
        >
          <option value="OIL">معصرة استخلاص الزيت</option>
          <option value="TABLE">مصنع التخليص وزيتون المائدة</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="harvest-maturity" className="text-xs text-slate-400 ml-1">درجة نضج وتلون الحبات</label>
        <select
          id="harvest-maturity"
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
          value={metadata.maturityIndex || "TURNING"}
          onChange={(e) => onMetadataChange({ ...metadata, maturityIndex: e.target.value })}
        >
          <option value="GREEN">أخضر</option>
          <option value="TURNING">متلون (في مرحلة التغيير)</option>
          <option value="BLACK">أسود ناضج</option>
        </select>
      </div>

      {(() => {
        const qty = parseFloat(metadata.quantity || "0");
        const agro = typeof field?.agronomicData === "string"
          ? JSON.parse(field.agronomicData as string)
          : (field?.agronomicData || {}) as Record<string, any>;
        const density = parseInt(agro.treeDensity || agro["treeDensity"] || agro["Densité de Plantation"] || "200", 10);
        const area = field?.area || 1.0;
        const totalTrees = Math.round(density * area) || 200;

        const yieldPerTree = totalTrees > 0 ? qty / totalTrees : 0;
        const yieldPerHectare = area > 0 ? qty / area : 0;

        return (
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
            <span className="text-xs font-semibold text-emerald-400">تحليلات المردودية والإنتاجية</span>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono font-bold text-white">
              <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5">
                <div className="text-[10px] text-slate-400">إنتاجية الشجرة الواحدة</div>
                <div className="text-emerald-400 mt-1">{yieldPerTree.toFixed(2)} كجم/شجرة</div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5">
                <div className="text-[10px] text-slate-400">مردودية الهكتار الواحد</div>
                <div className="text-emerald-400 mt-1">{(yieldPerHectare / 1000).toFixed(2)} طن/هكتار</div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
});
