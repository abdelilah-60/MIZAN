import React, { useState, useEffect } from "react";
import SusceptibilityMatrix from "./SusceptibilityMatrix";
import type { Susceptibility } from "./SusceptibilityMatrix";
import KcMatrixTable from "./KcMatrixTable";
import type { KcEntry } from "./KcMatrixTable";
import SoilCompatibilityTable from "./SoilCompatibilityTable";
import type { SoilCompatibility } from "./SoilCompatibilityTable";
import TreatmentsManager from "./TreatmentsManager";
import type { Treatment } from "./TreatmentsManager";
import EntityForms from "./EntityForms";
import type { Variety, Disease } from "./EntityForms";

interface AdminPanelProps {
  token: string;
}

interface Stats {
  total_nodes: number;
  total_relationships: number;
  breakdown: Record<string, number>;
}

export default function AdminPanel({ token }: AdminPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<"susceptibility" | "kc" | "soil" | "treatments" | "entities">("susceptibility");
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [susceptibility, setSusceptibility] = useState<Susceptibility[]>([]);
  const [kcMatrix, setKcMatrix] = useState<KcEntry[]>([]);
  const [soilComp, setSoilComp] = useState<SoilCompatibility[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const headers = React.useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [vRes, dRes, sRes, kRes, scRes, tRes, statRes] = await Promise.all([
        fetch("/api/admin/varieties", { headers }),
        fetch("/api/admin/diseases", { headers }),
        fetch("/api/admin/susceptibility", { headers }),
        fetch("/api/admin/kc-matrix", { headers }),
        fetch("/api/admin/soil-compatibility", { headers }),
        fetch("/api/admin/treatments", { headers }),
        fetch("/api/admin/stats", { headers }),
      ]);

      if (vRes.ok) setVarieties(await vRes.json());
      if (dRes.ok) setDiseases(await dRes.json());
      if (sRes.ok) setSusceptibility(await sRes.json());
      if (kRes.ok) setKcMatrix(await kRes.json());
      if (scRes.ok) setSoilComp(await scRes.json());
      if (tRes.ok) setTreatments(await tRes.json());
      if (statRes.ok) setStats(await statRes.json());
    } catch (e) {
      console.error("Failed to load admin panel data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [headers]); // added headers as dependency since it's wrapped in useMemo now

  // Unique lists of names for grid headers
  const uniqueVarieties = Array.from(new Set(susceptibility.map((s) => s.variety))).sort();
  const uniqueDiseases = Array.from(new Set(susceptibility.map((s) => s.disease))).sort();
  const uniqueStages = Array.from(new Set(kcMatrix.map((k) => k.stage))).sort((a, b) => {
    const oa = kcMatrix.find((k) => k.stage === a)?.order || 0;
    const ob = kcMatrix.find((k) => k.stage === b)?.order || 0;
    return oa - ob;
  });
  const uniqueSoils = Array.from(new Set(soilComp.map((sc) => sc.soil))).sort();

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 space-y-4">
        <div className="h-10 w-10 border-3 border-slate-700 border-t-emerald-400 rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium tracking-wide">Loading AI Knowledge Graph data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Overview stats panel */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Graph Nodes</p>
            <p className="text-2xl font-black text-white">{stats.total_nodes}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Relationships</p>
            <p className="text-2xl font-black text-emerald-400">{stats.total_relationships}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Olive Varieties</p>
            <p className="text-2xl font-bold text-slate-200">{stats.breakdown.Variety || 0}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Diseases & Treatments</p>
            <p className="text-2xl font-bold text-slate-200">
              {stats.breakdown.Disease || 0} / {stats.breakdown.Treatment || 0}
            </p>
          </div>
        </div>
      )}

      {/* Internal Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { key: "susceptibility", label: "🦠 Vulnerability Matrix" },
          { key: "kc", label: "💧 Crop Coefficients (Kc)" },
          { key: "soil", label: "🌱 Soil Compatibility" },
          { key: "treatments", label: "💊 Moroccan Treatments" },
          { key: "entities", label: "🗂️ Manage Entities" },
        ].map((sub) => (
          <button
            key={sub.key}
            onClick={() => setActiveSubTab(sub.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              activeSubTab === sub.key
                ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-md shadow-emerald-500/10"
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {activeSubTab === "susceptibility" && (
        <SusceptibilityMatrix
          susceptibility={susceptibility}
          uniqueVarieties={uniqueVarieties}
          uniqueDiseases={uniqueDiseases}
          updating={updating}
          setUpdating={setUpdating}
          setSusceptibility={setSusceptibility}
          headers={headers}
        />
      )}

      {activeSubTab === "kc" && (
        <KcMatrixTable
          kcMatrix={kcMatrix}
          uniqueVarieties={uniqueVarieties}
          uniqueStages={uniqueStages}
          updating={updating}
          setUpdating={setUpdating}
          setKcMatrix={setKcMatrix}
          headers={headers}
        />
      )}

      {activeSubTab === "soil" && (
        <SoilCompatibilityTable
          soilComp={soilComp}
          uniqueVarieties={uniqueVarieties}
          uniqueSoils={uniqueSoils}
          updating={updating}
          setUpdating={setUpdating}
          setSoilComp={setSoilComp}
          headers={headers}
        />
      )}

      {activeSubTab === "treatments" && (
        <TreatmentsManager
          treatments={treatments}
          uniqueDiseases={uniqueDiseases}
          headers={headers}
          fetchData={fetchData}
        />
      )}

      {activeSubTab === "entities" && (
        <EntityForms
          varieties={varieties}
          diseases={diseases}
          headers={headers}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}
