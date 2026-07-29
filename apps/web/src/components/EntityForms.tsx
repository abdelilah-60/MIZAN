import React, { useState } from "react";

export interface Variety {
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

export interface Disease {
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

export interface EntityFormsProps {
  varieties: Variety[];
  diseases: Disease[];
  headers: Record<string, string>;
  fetchData: () => Promise<void>;
}

export const EntityForms: React.FC<EntityFormsProps> = ({
  varieties,
  diseases,
  headers,
  fetchData
}) => {
  const [isVarietyModalOpen, setIsVarietyModalOpen] = useState(false);
  const [isDiseaseModalOpen, setIsDiseaseModalOpen] = useState(false);
  
  const [varietyForm, setVarietyForm] = useState<Partial<Variety>>({});
  const [diseaseForm, setDiseaseForm] = useState<Partial<Disease>>({});

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

  return (
    <>
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
    </>
  );
};

export default EntityForms;
