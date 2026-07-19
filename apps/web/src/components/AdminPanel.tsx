import React, { useState, useEffect } from "react";

interface AdminPanelProps {
  token: string;
}

interface Variety {
  name: string;
  name_ar?: string;
  origin?: string;
  use?: string;
  oil_content_pct?: number;
  avg_fruit_weight_g?: number;
  harvest_season?: string;
  drought_tolerance?: string;
  cold_tolerance?: string;
  vigor?: string;
  pollination?: string;
  density_recommended?: number;
  notes?: string;
}

interface Disease {
  name: string;
  name_fr?: string;
  name_ar?: string;
  pathogen?: string;
  pathogen_type?: string;
  severity?: string;
  affected_organ?: string;
  temp_min?: number;
  temp_max?: number;
  humidity_min?: number;
  rain_min_mm?: number;
  leaf_wetness_days_threshold?: number;
  suppressed_above_temp?: number;
  requires_wound?: boolean;
  fruit_stage_only?: boolean;
  requires_clay_soil?: boolean;
  description?: string;
}

interface Susceptibility {
  variety: string;
  disease: string;
  score: number;
  notes: string;
}

interface KcEntry {
  variety: string;
  stage: string;
  kc: number;
  order: number;
}

interface SoilCompatibility {
  variety: string;
  soil: string;
  fitness: string;
  notes: string;
}

interface TreatmentLink {
  disease: string;
  efficacy: string;
  timing: string;
  priority: number;
  notes?: string;
}

interface Treatment {
  name: string;
  name_ar?: string;
  type?: string;
  active_ingredient?: string;
  formulation?: string;
  dose_per_ha?: string;
  dose_per_100l?: string;
  preharvest_interval_days?: number;
  mode_of_action?: string;
  organic_approved?: boolean;
  timing?: string;
  application_season?: string;
  notes?: string;
  diseases: TreatmentLink[];
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

  // Modals / Form states
  const [isVarietyModalOpen, setIsVarietyModalOpen] = useState(false);
  const [isDiseaseModalOpen, setIsDiseaseModalOpen] = useState(false);
  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);
  
  const [varietyForm, setVarietyForm] = useState<Partial<Variety>>({});
  const [diseaseForm, setDiseaseForm] = useState<Partial<Disease>>({});
  const [treatmentForm, setTreatmentForm] = useState<Partial<Treatment>>({});

  // Treatment Link state
  const [linkingTreatment, setLinkingTreatment] = useState<string | null>(null);
  const [linkForm, setLinkForm] = useState({
    disease: "",
    efficacy: "high",
    timing: "preventive",
    priority: 1,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

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
  }, []);

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

  const handleSaveVariety = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/varieties", {
        method: "POST",
        headers,
        body: JSON.stringify(varietyForm),
      });
      if (res.ok) {
        setIsVarietyModalOpen(false);
        setVarietyForm({});
        fetchData();
      } else {
        alert(await res.text());
      }
    } catch (e) {
      console.error("Save variety failed:", e);
    }
  };

  const handleDeleteVariety = async (name: string) => {
    if (!confirm(`Are you sure you want to delete variety ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/varieties/${encodeURIComponent(name)}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) fetchData();
    } catch (e) {
      console.error("Delete variety failed:", e);
    }
  };

  const handleSaveDisease = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/diseases", {
        method: "POST",
        headers,
        body: JSON.stringify(diseaseForm),
      });
      if (res.ok) {
        setIsDiseaseModalOpen(false);
        setDiseaseForm({});
        fetchData();
      } else {
        alert(await res.text());
      }
    } catch (e) {
      console.error("Save disease failed:", e);
    }
  };

  const handleDeleteDisease = async (name: string) => {
    if (!confirm(`Are you sure you want to delete disease/pest ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/diseases/${encodeURIComponent(name)}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) fetchData();
    } catch (e) {
      console.error("Delete disease failed:", e);
    }
  };

  const handleSaveTreatment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/treatments", {
        method: "POST",
        headers,
        body: JSON.stringify(treatmentForm),
      });
      if (res.ok) {
        setIsTreatmentModalOpen(false);
        setTreatmentForm({});
        fetchData();
      } else {
        alert(await res.text());
      }
    } catch (e) {
      console.error("Save treatment failed:", e);
    }
  };

  const handleDeleteTreatment = async (name: string) => {
    if (!confirm(`Are you sure you want to delete treatment ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/treatments/${encodeURIComponent(name)}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) fetchData();
    } catch (e) {
      console.error("Delete treatment failed:", e);
    }
  };

  const handleLinkDisease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkingTreatment) return;
    try {
      const res = await fetch("/api/admin/treatments/link", {
        method: "POST",
        headers,
        body: JSON.stringify({
          treatment: linkingTreatment,
          disease: linkForm.disease,
          linked: true,
          efficacy: linkForm.efficacy,
          timing: linkForm.timing,
          priority: Number(linkForm.priority),
        }),
      });
      if (res.ok) {
        setLinkingTreatment(null);
        setLinkForm({ disease: "", efficacy: "high", timing: "preventive", priority: 1 });
        fetchData();
      }
    } catch (e) {
      console.error("Link treatment failed:", e);
    }
  };

  const handleUnlinkDisease = async (treatmentName: string, diseaseName: string) => {
    if (!confirm(`Unlink ${diseaseName} from ${treatmentName}?`)) return;
    try {
      const res = await fetch("/api/admin/treatments/link", {
        method: "POST",
        headers,
        body: JSON.stringify({
          treatment: treatmentName,
          disease: diseaseName,
          linked: false,
        }),
      });
      if (res.ok) fetchData();
    } catch (e) {
      console.error("Unlink treatment failed:", e);
    }
  };

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

  // Get color for vulnerability cells
  const getVulnerabilityColorClass = (score: number) => {
    if (score >= 75) return "bg-red-950/60 border border-red-500/30 text-red-300 hover:bg-red-900/60";
    if (score >= 50) return "bg-orange-950/50 border border-orange-500/30 text-orange-300 hover:bg-orange-900/50";
    if (score >= 25) return "bg-yellow-950/40 border border-yellow-500/20 text-yellow-300 hover:bg-yellow-900/40";
    return "bg-slate-900/40 border border-emerald-500/10 text-slate-400 hover:bg-slate-800/40";
  };

  // Get color for fitness cells
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

      {/* ========== SUBTAB: SUSCEPTIBILITY MATRIX ========== */}
      {activeSubTab === "susceptibility" && (
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
                  <th className="p-4 font-bold text-slate-300 w-48">Variety \ Disease</th>
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
      )}

      {/* ========== SUBTAB: KC MATRIX ========== */}
      {activeSubTab === "kc" && (
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
                  <th className="p-4 font-bold text-slate-300 w-48">Variety \ Stage</th>
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
      )}

      {/* ========== SUBTAB: SOIL COMPATIBILITY ========== */}
      {activeSubTab === "soil" && (
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
                  <th className="p-4 font-bold text-slate-300 w-48">Variety \ Soil Type</th>
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
      )}

      {/* ========== SUBTAB: TREATMENTS ========== */}
      {activeSubTab === "treatments" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white">Moroccan Registered Treatments</h2>
              <p className="text-xs text-slate-400">Add chemical or organic fungicides and insecticides to provide target actions.</p>
            </div>
            <button
              onClick={() => setIsTreatmentModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
            >
              ➕ Add Treatment
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {treatments.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 hover:border-emerald-500/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-sm flex items-center gap-2">
                        {t.name} {t.name_ar && <span className="text-slate-400 text-xs font-medium">({t.name_ar})</span>}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {t.active_ingredient} • <span className="capitalize">{t.type}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          t.organic_approved ? "bg-emerald-500/20 text-emerald-300" : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {t.organic_approved ? "Bio" : "Chemical"}
                      </span>
                      <button
                        onClick={() => handleDeleteTreatment(t.name)}
                        className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors text-xs"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 bg-black/20 p-2 rounded-xl">
                    <p>Dose: <span className="text-slate-200 font-semibold">{t.dose_per_ha || t.dose_per_100l}</span></p>
                    <p>PH Interval: <span className="text-slate-200 font-semibold">{t.preharvest_interval_days} days</span></p>
                  </div>
                  {t.notes && <p className="text-xs text-slate-500 italic">{t.notes}</p>}

                  {/* Disease tags linked */}
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Targets & Efficacy</p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.diseases.map((d) => (
                        <span
                          key={d.disease}
                          className="bg-white/5 border border-white/10 text-xs pl-2.5 pr-1.5 py-1 rounded-full flex items-center gap-2 text-slate-300"
                        >
                          {d.disease}
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded">
                            {d.efficacy}
                          </span>
                          <button
                            onClick={() => handleUnlinkDisease(t.name, d.disease)}
                            className="hover:text-red-400 font-bold ml-1 text-[10px]"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {t.diseases.length === 0 && <span className="text-xs text-slate-600">No diseases linked</span>}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <button
                    onClick={() => {
                      setLinkingTreatment(t.name);
                      setLinkForm({ ...linkForm, disease: uniqueDiseases[0] || "" });
                    }}
                    className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[11px] font-bold py-2 rounded-xl transition-all"
                  >
                    🔗 Link to Disease
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== SUBTAB: ENTITIES CRUD ========== */}
      {activeSubTab === "entities" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Olive Varieties Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-white">Olive Varieties</h2>
              <button
                onClick={() => setIsVarietyModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-2 rounded-xl transition-all"
              >
                ➕ Add Variety
              </button>
            </div>
            <div className="space-y-2">
              {varieties.map((v) => (
                <div
                  key={v.name}
                  className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-white/5"
                >
                  <div>
                    <p className="text-sm font-bold text-white">
                      {v.name} {v.name_ar && <span className="text-slate-500 text-xs">({v.name_ar})</span>}
                    </p>
                    <p className="text-xs text-slate-400">
                      Origin: {v.origin} | Use: <span className="capitalize">{v.use}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteVariety(v.name)}
                    className="text-xs text-slate-500 hover:text-red-400 p-1.5 rounded"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Diseases & Pests Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-white">Diseases & Pests</h2>
              <button
                onClick={() => setIsDiseaseModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-2 rounded-xl transition-all"
              >
                ➕ Add Disease
              </button>
            </div>
            <div className="space-y-2">
              {diseases.map((d) => (
                <div
                  key={d.name}
                  className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-white/5"
                >
                  <div>
                    <p className="text-sm font-bold text-white">
                      {d.name} {d.name_ar && <span className="text-slate-500 text-xs">({d.name_ar})</span>}
                    </p>
                    <p className="text-xs text-slate-400">
                      Pathogen: {d.pathogen} | Severity: <span className="text-amber-400">{d.severity}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteDisease(d.name)}
                    className="text-xs text-slate-500 hover:text-red-400 p-1.5 rounded"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: ADD VARIETY ========== */}
      {isVarietyModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsVarietyModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-4">Add New Olive Variety</h3>
            <form onSubmit={handleSaveVariety} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Variety Name</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setVarietyForm({ ...varietyForm, name: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                    placeholder="e.g. Koroneiki"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Name Arabic</label>
                  <input
                    type="text"
                    onChange={(e) => setVarietyForm({ ...varietyForm, name_ar: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                    placeholder="كورونيكي"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Origin Country</label>
                  <input
                    type="text"
                    onChange={(e) => setVarietyForm({ ...varietyForm, origin: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                    placeholder="e.g. Greece"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Main Use</label>
                  <select
                    onChange={(e) => setVarietyForm({ ...varietyForm, use: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                  >
                    <option value="dual">Dual (Oil & Table)</option>
                    <option value="oil">Oil Only</option>
                    <option value="table">Table Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Oil Content (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    onChange={(e) => setVarietyForm({ ...varietyForm, oil_content_pct: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Drought Tolerance</label>
                  <select
                    onChange={(e) => setVarietyForm({ ...varietyForm, drought_tolerance: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                  >
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsVarietyModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Save Variety
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL: ADD DISEASE ========== */}
      {isDiseaseModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsDiseaseModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-4">Add New Disease / Pest</h3>
            <form onSubmit={handleSaveDisease} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Disease Name</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setDiseaseForm({ ...diseaseForm, name: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                    placeholder="e.g. Anthracnose"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Name Arabic</label>
                  <input
                    type="text"
                    onChange={(e) => setDiseaseForm({ ...diseaseForm, name_ar: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                    placeholder="الأنثراكنوز"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Pathogen</label>
                  <input
                    type="text"
                    onChange={(e) => setDiseaseForm({ ...diseaseForm, pathogen: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                    placeholder="e.g. Colletotrichum"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Severity</label>
                  <select
                    onChange={(e) => setDiseaseForm({ ...diseaseForm, severity: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Temp Min (°C)</label>
                  <input
                    type="number"
                    onChange={(e) => setDiseaseForm({ ...diseaseForm, temp_min: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Temp Max (°C)</label>
                  <input
                    type="number"
                    onChange={(e) => setDiseaseForm({ ...diseaseForm, temp_max: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsDiseaseModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Save Disease
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL: ADD TREATMENT ========== */}
      {isTreatmentModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsTreatmentModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-4">Add New Treatment</h3>
            <form onSubmit={handleSaveTreatment} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Treatment Name</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setTreatmentForm({ ...treatmentForm, name: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                    placeholder="e.g. Copper Sulfate"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Active Ingredient</label>
                  <input
                    type="text"
                    onChange={(e) => setTreatmentForm({ ...treatmentForm, active_ingredient: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                    placeholder="e.g. Copper"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Type</label>
                  <select
                    onChange={(e) => setTreatmentForm({ ...treatmentForm, type: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 text-white"
                  >
                    <option value="fungicide">Fungicide</option>
                    <option value="insecticide">Insecticide</option>
                    <option value="fertilizer">Fertilizer</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Dose</label>
                  <input
                    type="text"
                    onChange={(e) => setTreatmentForm({ ...treatmentForm, dose_per_ha: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    placeholder="e.g. 3 kg/ha"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="organic"
                  onChange={(e) => setTreatmentForm({ ...treatmentForm, organic_approved: e.target.checked })}
                  className="h-4 w-4 bg-slate-800 border-white/10 text-emerald-500 rounded focus:ring-emerald-500"
                />
                <label htmlFor="organic" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  Organic Approved (Bio)
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsTreatmentModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Save Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL: LINK TREATMENT TO DISEASE ========== */}
      {linkingTreatment && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setLinkingTreatment(null)}></div>
          <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-sm font-bold text-white mb-4">Link target disease for: {linkingTreatment}</h3>
            <form onSubmit={handleLinkDisease} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Target Disease</label>
                <select
                  required
                  value={linkForm.disease}
                  onChange={(e) => setLinkForm({ ...linkForm, disease: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {uniqueDiseases.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Efficacy</label>
                  <select
                    value={linkForm.efficacy}
                    onChange={(e) => setLinkForm({ ...linkForm, efficacy: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Priority (Order)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={linkForm.priority}
                    onChange={(e) => setLinkForm({ ...linkForm, priority: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Application Timing</label>
                <select
                  value={linkForm.timing}
                  onChange={(e) => setLinkForm({ ...linkForm, timing: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="preventive">Preventive</option>
                  <option value="curative">Curative</option>
                  <option value="post_harvest">Post Harvest</option>
                  <option value="preventive_post_wound">Post Wound (Pruning)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setLinkingTreatment(null)}
                  className="flex-1 px-4 py-2 text-xs font-semibold border border-white/10 text-slate-300 hover:bg-white/5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 rounded-xl transition-colors"
                >
                  Link Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
