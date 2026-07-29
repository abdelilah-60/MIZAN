import React from "react";

export interface PesticideFormSectionProps {
  metadata: Record<string, string>;
  onMetadataChange: (payload: Record<string, string>) => void;
  type: string;
  date?: string;
}

export const PesticideFormSection: React.FC<PesticideFormSectionProps> = React.memo(({
  metadata,
  onMetadataChange,
  type,
  date
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs text-slate-400 ml-1">
          {type === "PESTICIDE" ? "الآفة المستهدفة" : "المرض المستهدف"}
        </label>
        <select
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
          value={metadata.targetPest || (type === "PESTICIDE" ? "FLY" : "PEACOCK")}
          onChange={(e) => onMetadataChange({ ...metadata, targetPest: e.target.value })}
        >
          {type === "PESTICIDE" ? (
            <>
              <option value="FLY">ذبابة الزيتون</option>
              <option value="MOTH">عثة الزيتون</option>
              <option value="SCALE">الحشرة القشرية السوداء</option>
              <option value="PSYLLA">بسيلا الزيتون</option>
            </>
          ) : (
            <>
              <option value="PEACOCK">مرض عين الطاووس</option>
              <option value="ANTHRACNOSE">الأنثراكنوز (تعفن الثمار)</option>
              <option value="VERTICILLIUM">الذبول الفرتيسيليومي</option>
            </>
          )}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-400 ml-1">المادة الفعالة</label>
        <select
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
          value={metadata.activeIngredient || (type === "PESTICIDE" ? "DELTAMETHRINE" : "CUIVRE")}
          onChange={(e) => {
            const activeVal = e.target.value;
            let defaultDar = "14";
            if (activeVal === "CUIVRE") defaultDar = "21";
            else if (activeVal === "DODINE") defaultDar = "15";
            else if (activeVal === "TEBUCONAZOLE") defaultDar = "30";
            else if (activeVal === "DIMETHOATE") defaultDar = "28";
            
            onMetadataChange({ 
              ...metadata, 
              activeIngredient: activeVal,
              darDays: defaultDar
            });
          }}
        >
          {type === "PESTICIDE" ? (
            <>
              <option value="DELTAMETHRINE">دلتامثرين (Deltaméthrine)</option>
              <option value="DIMETHOATE">ديميثوات (Diméthoate)</option>
              <option value="LAMBDA_CYHALOTHRINE">لامبدا سيهالوثرين (Lambda-cyhalothrine)</option>
              <option value="SPINOSAD">سبينوساد (Spinosad Bio)</option>
            </>
          ) : (
            <>
              <option value="CUIVRE">هيدروكسيد النحاس (Cuivre / Bouillie Bordelaise)</option>
              <option value="DODINE">دودين (Dodine)</option>
              <option value="TEBUCONAZOLE">تيبوكونازول (Tébuconazole)</option>
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
            value={metadata.quantity || ""}
            onChange={(e) => onMetadataChange({ ...metadata, quantity: e.target.value })}
            required
          />
          <select
            className="w-24 bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
            value={metadata.unit || (type === "PESTICIDE" ? "L" : "Kg")}
            onChange={(e) => onMetadataChange({ ...metadata, unit: e.target.value })}
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
          value={metadata.darDays || ""}
          onChange={(e) => onMetadataChange({ ...metadata, darDays: e.target.value })}
          required
        />
      </div>

      {(() => {
        const dar = parseInt(metadata.darDays || "0", 10);
        if (dar <= 0) return null;
        const baseDate = date ? new Date(date) : new Date();
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
  );
});
