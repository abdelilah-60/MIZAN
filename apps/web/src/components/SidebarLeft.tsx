import type { ActiveTab, User } from "../lib/types";

interface SidebarLeftProps {
  user: User | null;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  fieldsCount: number;
  onLogout: () => void;
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string | null) => void;
}

export function SidebarLeft({
  user,
  activeTab,
  setActiveTab,
  fieldsCount,
  onLogout,
  selectedFieldId,
  setSelectedFieldId,
}: SidebarLeftProps) {
  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSelectedFieldId(null);
  };

  return (
    <aside className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl space-y-6 flex flex-col justify-between h-fit sticky top-24">
      {/* Profile Section */}
      <div className="space-y-6">
        <div
          onClick={() => handleTabClick("profile")}
          className={`flex items-center gap-3 pb-4 border-b border-white/5 cursor-pointer p-2 rounded-xl transition-all ${
            activeTab === "profile" ? "bg-white/10" : "hover:bg-white/5"
          }`}
          title="Mon profil / ملفي الشخصي"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user?.fullName?.charAt(0) || "U"}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200 hover:text-emerald-400 transition-colors">
              {user?.fullName || "Agriculteur Mizan"}
            </h4>
            <p className="text-[10px] text-slate-500 font-medium">Producteur d'Olives</p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5" aria-label="Main Navigation">
          <button
            type="button"
            onClick={() => handleTabClick("fields")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "fields" && !selectedFieldId
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-sm">🏠</span>
              <span>Fil d'actualité (الرئيسية)</span>
            </div>
            {fieldsCount > 0 && (
              <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded-md font-bold text-slate-400">
                {fieldsCount}
              </span>
            )}
          </button>

          {user?.role === "DEVELOPER" && (
            <button
              type="button"
              onClick={() => handleTabClick("knowledge")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "knowledge"
                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">🧠</span>
                <span>Base de Connaissance (الموسوعة)</span>
              </div>
            </button>
          )}

          {/* "+ Créer une Parcelle" Button */}
          <button
            type="button"
            onClick={() => handleTabClick("create-field")}
            className={`w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all active:scale-[0.98] ${
              activeTab === "create-field"
                ? "bg-emerald-400 text-slate-950"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
            }`}
          >
            <span>➕</span>
            <span>Créer une Parcelle (إضافة حقل)</span>
          </button>
        </nav>
      </div>

      {/* Logout button */}
      <div className="pt-4 border-t border-white/5">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <span>🚪</span>
          <span>Se déconnecter (خروج)</span>
        </button>
      </div>
    </aside>
  );
}
