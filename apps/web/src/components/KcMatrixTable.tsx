import React from "react";

export interface KcEntry {
  variety: string;
  stage: string;
  kc: number;
  order: number;
}

export interface KcMatrixTableProps {
  kcMatrix: KcEntry[];
  uniqueVarieties: string[];
  uniqueStages: string[];
  updating: string | null;
  setUpdating: React.Dispatch<React.SetStateAction<string | null>>;
  setKcMatrix: React.Dispatch<React.SetStateAction<KcEntry[]>>;
  headers: Record<string, string>;
}

export const KcMatrixTable = React.memo(({
  kcMatrix,
  uniqueVarieties,
  uniqueStages,
  updating,
  setUpdating,
  setKcMatrix,
  headers
}: KcMatrixTableProps) => {

  const handleUpdateKc = async (variety: string, stage: string, kc: number) => {
    const key = `${variety}-${stage}`;
    setUpdating(key);
    try {
      const res = await fetch("/api/admin/kc-matrix", {
        method: "PUT",
        headers,
        body: JSON.stringify({ variety, stage, kc }),
      });
      if (res.ok) {
        setKcMatrix((prev) =>
          prev.map((k) => (k.variety === variety && k.stage === stage ? { ...k, kc } : k))
        );
      }
    } catch (e) {
      console.error("Update Kc failed:", e);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">Crop Coefficients (Kc)</h2>
          <p className="text-xs text-slate-400">Modify stage-specific water consumption factors for each olive variety.</p>
        </div>
      </div>
      <div className="overflow-x-auto bg-slate-950/40 rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-bold text-slate-300 w-48">Variety \\ Stage</th>
              {uniqueStages.map((s) => (
                <th key={s} className="p-4 font-bold text-slate-300 text-center text-xs">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueVarieties.map((v) => (
              <tr key={v} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold text-white text-xs">{v}</td>
                {uniqueStages.map((s) => {
                  const entry = kcMatrix.find((k) => k.variety === v && k.stage === s);
                  const kc = entry?.kc ?? 0.45;
                  const key = `${v}-${s}`;
                  const isUpdating = updating === key;

                  return (
                    <td key={s} className="p-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1.5"
                          value={kc}
                          disabled={isUpdating}
                          onChange={(e) => handleUpdateKc(v, s, Number(e.target.value))}
                          className="w-16 text-center py-1.5 rounded-lg text-xs font-bold bg-slate-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                        {isUpdating && <span className="text-[9px] text-emerald-400 animate-pulse">saving...</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default KcMatrixTable;
