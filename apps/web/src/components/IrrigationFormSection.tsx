import React, { useEffect } from "react";
import type { Field } from "../lib/types";

export interface IrrigationFormSectionProps {
  metadata: Record<string, string>;
  onMetadataChange: (payload: Record<string, string>) => void;
  field: Field | null;
}

export const IrrigationFormSection: React.FC<IrrigationFormSectionProps> = React.memo(({
  metadata,
  onMetadataChange,
  field
}) => {
  const durationStr = metadata.duration;
  
  useEffect(() => {
    if (!field) return;

    const agro = typeof field.agronomicData === "string"
      ? JSON.parse(field.agronomicData as string)
      : (field.agronomicData || {}) as Record<string, any>;

    const flowRate = parseFloat(agro.dripperFlowRate || agro["Débit du goutteur (L/h)"] || "4.0");
    const drippers = parseInt(agro.drippersPerTree || agro["Nombre de goutteurs/arbre"] || "4", 10);
    const efficiency = parseFloat(agro.efficiency || "0.85");

    const durationVal = parseFloat(durationStr || "0");
    const volumeVal = (durationVal * flowRate * drippers * efficiency) / 60;
    const volumeStr = isNaN(volumeVal) ? "0" : volumeVal.toFixed(1);

    if (metadata.volume !== volumeStr) {
      onMetadataChange({
        ...metadata,
        volume: volumeStr
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationStr, field?.agronomicData]);

  return (
    <>
      <div className="space-y-1">
        <label className="text-xs text-slate-400 ml-1">
          Duration (Minutes)
        </label>
        <input
          type="number"
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
          value={metadata.duration || ""}
          onChange={(e) => onMetadataChange({ ...metadata, duration: e.target.value })}
          required
          aria-label="Duration"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-emerald-400 font-medium ml-1">
          Calculated Volume (Liters) - الحجم المحتسب تلقائياً
        </label>
        <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5 text-sm text-emerald-400 font-mono font-bold flex justify-between items-center">
          <span>{metadata.volume || "0.0"} L</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider">Calculé</span>
        </div>
      </div>
    </>
  );
});
