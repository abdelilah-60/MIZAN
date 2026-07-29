import React from "react";

export interface SoilCompatibility {
  variety: string;
  soil: string;
  fitness: string;
  notes: string;
}

export interface SoilCompatibilityTableProps {
  soilComp: SoilCompatibility[];
  uniqueVarieties: string[];
  uniqueSoils: string[];
  updating: string | null;
  setUpdating: React.Dispatch<React.SetStateAction<string | null>>;
  setSoilComp: React.Dispatch<React.SetStateAction<SoilCompatibility[]>>;
  headers: Record<string, string>;
}

const getSoilFitnessColorClass = (fitness: string) => {
  switch (fitness) {
    case "IDEAL":
      return "bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60";
    case "GOOD":
      return "bg-yellow-950/40 border border-yellow-500/20 text-yellow-300 hover:bg-yellow-900/40";
    default:
      return "bg-red-950/50 border border-red-500/20 text-red-400 hover:bg-red-900/50";
  }
};

export const SoilCompatibilityTable = React.memo(({
  soilComp,
  uniqueVarieties,
  uniqueSoils,
  updating,
  setUpdating,
  setSoilComp,
  headers
}: SoilCompatibilityTableProps) => {

  const handleToggleSoilCompatibility = async (variety: string, soil: string, currentFitness: string) => {
    const fitnessOrder = ["POOR", "GOOD", "IDEAL"];
    const nextFitness = fitnessOrder[(fitnessOrder.indexOf(currentFitness) + 1) % fitnessOrder.length];
    const key = `${variety}-${soil}`;
    setUpdating(key);
    try {
      const res = await fetch("/api/admin/soil-compatibility", {
        method: "PUT",
        headers,
        body: JSON.stringify({ variety, soil, fitness: nextFitness, notes: "" }),
      });
      if (res.ok) {
        setSoilComp((prev) =>
          prev.map((sc) => (sc.variety === variety && sc.soil === soil ? { ...sc, fitness: nextFitness } : sc))
        );
      }
    } catch (e) {
      console.error("Update soil compatibility failed:", e);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">Soil Compatibility</h2>
          <p className="text-xs text-slate-400">Configure compatibility ratings. Click cell to cycle: IDEAL → GOOD → POOR.</p>
        </div>
      </div>
      <div className="overflow-x-auto bg-slate-950/40 rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-bold text-slate-300 w-48">Variety \\ Soil Type</th>
              {uniqueSoils.map((s) => (
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
                {uniqueSoils.map((s) => {
                  const entry = soilComp.find((sc) => sc.variety === v && sc.soil === s);
                  const fitness = entry?.fitness ?? "GOOD";
                  const key = `${v}-${s}`;
                  const isUpdating = updating === key;

                  return (
                    <td key={s} className="p-2 text-center">
                      <button
                        disabled={isUpdating}
                        onClick={() => handleToggleSoilCompatibility(v, s, fitness)}
                        className={`w-24 px-2 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${getSoilFitnessColorClass(
                          fitness
                        )} disabled:opacity-50`}
                      >
                        {isUpdating ? "saving..." : fitness}
                      </button>
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

export default SoilCompatibilityTable;
