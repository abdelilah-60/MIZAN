import { useState } from "react";
import type { User, Farm, Field, OperationData } from "../lib/types";

interface ProfilePageProps {
  user: User | null;
  farms: Farm[];
  fields: Field[];
  operationsData: Record<string, OperationData[] | undefined>;
  onToast: (msg: string, type: "success" | "error" | "info") => void;
}

export function ProfilePage({ user, farms, fields, operationsData, onToast }: ProfilePageProps) {
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [region, setRegion] = useState("Région Fès-Meknès, Maroc");
  const [activeTab, setActiveTab] = useState<"activity" | "settings">("activity");

  // Calculate stats
  const totalArea = fields.reduce((acc, f) => acc + f.area, 0);

  // Variety counts
  const varietyCounts: Record<string, number> = {};
  fields.forEach((f) => {
    const varName = f.cropType || "Olive Standard";
    varietyCounts[varName] = (varietyCounts[varName] || 0) + 1;
  });

  // Extract all operations across all fields and sort by date desc
  const allOps: { fieldName: string; type: string; date: string; note?: string }[] = [];
  fields.forEach((field) => {
    const ops = operationsData[field.id];
    if (ops) {
      ops.forEach((op) => {
        allOps.push({
          fieldName: field.name,
          type: op.type,
          date: op.date,
          note: op.metadata?.note || "",
        });
      });
    }
  });
  // Sort operations by date descending
  allOps.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onToast("Paramètres du compte mis à jour avec succès !", "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* 1. Header Cover Profile Block */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        {/* Cover Photo */}
        <div className="h-44 md:h-52 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 relative">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute bottom-4 left-6 flex items-end gap-4 z-20 translate-y-1/3 md:translate-y-1/4">
            {/* Circular Avatar */}
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-slate-950 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg">
              {fullName.charAt(0) || "U"}
            </div>
            <div className="mb-2 md:mb-4">
              <h2 className="text-xl md:text-2xl font-black text-white">{fullName}</h2>
              <p className="text-[10px] md:text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Producteur d'Olives &middot; {region}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Buttons below cover */}
        <div className="pt-12 md:pt-14 px-6 pb-4 flex gap-4 border-t border-white/5 bg-slate-950/20">
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === "activity"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-md"
                : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-white/5"
            }`}
          >
            📊 Journal d'Activité
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === "settings"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-md"
                : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-white/5"
            }`}
          >
            ⚙️ Paramètres de Compte
          </button>
        </div>
      </div>

      {/* 2. Main Page Layout (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Intro & Stats Box (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Intro Card */}
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-sm shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Intro</h3>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <span className="text-sm">📍</span>
                <span>Habite à <b>{region}</b></span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-sm">📧</span>
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-sm">🚜</span>
                <span>Gère <b>{farms.length} Exploitations</b></span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-sm">🗺️</span>
                <span>Cultive <b>{fields.length} Parcelles</b> ({totalArea.toFixed(1)} ha)</span>
              </div>
            </div>
          </div>

          {/* Cultivated Varieties Distribution Card */}
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 backdrop-blur-sm shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Variétés d'Olivier</h3>
            
            <div className="space-y-3.5">
              {Object.entries(varietyCounts).map(([name, count]) => {
                const percentage = fields.length > 0 ? (count / fields.length) * 100 : 0;
                return (
                  <div key={name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>{name}</span>
                      <span>{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
              {Object.keys(varietyCounts).length === 0 && (
                <p className="text-[10px] text-slate-500">Aucune variété enregistrée.</p>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Timeline or Settings Panel (lg:col-span-8) */}
        <div className="lg:col-span-8">
          {activeTab === "activity" && (
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sujet d'Activité Récente</h3>

              {allOps.length === 0 ? (
                <div className="text-center py-16 text-slate-500 border border-dashed border-white/5 rounded-2xl">
                  <span className="text-3xl block mb-2">📋</span>
                  Aucune activité récente enregistrée sur vos parcelles.
                </div>
              ) : (
                <div className="relative border-l border-white/10 pl-6 space-y-6">
                  {allOps.slice(0, 8).map((op, idx) => {
                    const icon = {
                      IRRIGATION: "💧",
                      FERTILIZER: "🌱",
                      PESTICIDE: "🧪",
                      HARVEST: "🚜",
                    }[op.type] || "📝";

                    return (
                      <div key={idx} className="relative animate-in fade-in slide-in-from-left-2 duration-300">
                        {/* Dot indicator */}
                        <div className="absolute -left-[31px] top-0 h-4.5 w-4.5 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-[10px] z-10">
                          {icon}
                        </div>

                        <div>
                          <p className="text-xs text-slate-300">
                            Action de <span className="font-bold text-white">{fullName}</span> sur la parcelle{" "}
                            <span className="font-bold text-emerald-400">{op.fieldName}</span>
                          </p>
                          <p className="text-[9px] text-slate-500 font-medium uppercase mt-0.5">
                            {new Date(op.date).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          {op.note && (
                            <p className="mt-1.5 p-2 bg-slate-950/20 border border-white/5 rounded-lg text-[10px] text-slate-400">
                              {op.note}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Paramètres d'utilisateur</h3>

              <form onSubmit={handleSaveSettings} className="space-y-4 max-w-md">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Nom Complet</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Adresse Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Région agricole</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 mt-2"
                >
                  Sauvegarder les modifications
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
