import React from "react";

export interface Susceptibility {
  variety: string;
  disease: string;
  score: number;
  notes: string;
}

export interface SusceptibilityMatrixProps {
  susceptibility: Susceptibility[];
  uniqueVarieties: string[];
  uniqueDiseases: string[];
  updating: string | null;
  setUpdating: React.Dispatch<React.SetStateAction<string | null>>;
  setSusceptibility: React.Dispatch<React.SetStateAction<Susceptibility[]>>;
  headers: Record<string, string>;
}

const getVulnerabilityColorClass = (score: number) => {
  if (score >= 75) return "bg-red-950/60 border border-red-500/30 text-red-300 hover:bg-red-900/60";
  if (score >= 50) return "bg-orange-950/50 border border-orange-500/30 text-orange-300 hover:bg-orange-900/50";
  if (score >= 25) return "bg-yellow-950/40 border border-yellow-500/20 text-yellow-300 hover:bg-yellow-900/40";
  return "bg-slate-900/40 border border-emerald-500/10 text-slate-400 hover:bg-slate-800/40";
};

export const SusceptibilityMatrix = React.memo(({
  susceptibility,
  uniqueVarieties,
  uniqueDiseases,
  updating,
  setUpdating,
  setSusceptibility,
  headers
}: SusceptibilityMatrixProps) => {

  const handleUpdateSusceptibility = async (variety: string, disease: string, score: number) => {
    const key = `${variety}-${disease}`;
    setUpdating(key);
    try {
      const existing = susceptibility.find((s) => s.variety === variety && s.disease === disease);
      const res = await fetch("/api/admin/susceptibility", {
        method: "PUT",
        headers,
        body: JSON.stringify({
          variety,
          disease,
          score,
          notes: existing?.notes || "",
        }),
      });
      if (res.ok) {
        setSusceptibility((prev) =>
          prev.map((s) => (s.variety === variety && s.disease === disease ? { ...s, score } : s))
        );
      }
    } catch (e) {
      console.error("Update susceptibility failed:", e);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">Vulnerability Matrix</h2>
          <p className="text-xs text-slate-400">Edit olive variety susceptibility levels (0-100) to diseases in real-time.</p>
        </div>
      </div>
      <div className="overflow-x-auto bg-slate-950/40 rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-bold text-slate-300 w-48">Variety \\ Disease</th>
              {uniqueDiseases.map((d) => (
                <th key={d} className="p-4 font-bold text-slate-300 text-center text-xs">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueVarieties.map((v) => (
              <tr key={v} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold text-white text-xs">{v}</td>
                {uniqueDiseases.map((d) => {
                  const entry = susceptibility.find((s) => s.variety === v && s.disease === d);
                  const score = entry?.score ?? 0;
                  const key = `${v}-${d}`;
                  const isUpdating = updating === key;

                  return (
                    <td key={d} className="p-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={score}
                          disabled={isUpdating}
                          onChange={(e) => handleUpdateSusceptibility(v, d, Number(e.target.value))}
                          className={`w-16 text-center py-1.5 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${getVulnerabilityColorClass(
                            score
                          )}`}
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

export default SusceptibilityMatrix;
