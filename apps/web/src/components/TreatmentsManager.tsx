import React, { useState } from "react";

export interface TreatmentLink {
  disease: string;
  efficacy: string;
  timing: string;
  priority: number;
  notes?: string;
}

export interface Treatment {
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

export interface TreatmentsManagerProps {
  treatments: Treatment[];
  uniqueDiseases: string[];
  headers: Record<string, string>;
  fetchData: () => Promise<void>;
}

export const TreatmentsManager: React.FC<TreatmentsManagerProps> = ({
  treatments,
  uniqueDiseases,
  headers,
  fetchData
}) => {
  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);
  const [treatmentForm, setTreatmentForm] = useState<Partial<Treatment>>({});
  
  const [linkingTreatment, setLinkingTreatment] = useState<string | null>(null);
  const [linkForm, setLinkForm] = useState({
    disease: "",
    efficacy: "high",
    timing: "preventive",
    priority: 1,
  });

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

  return (
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
};

export default TreatmentsManager;
