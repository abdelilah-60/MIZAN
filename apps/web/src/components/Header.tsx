import type { User, HealthStatus, ActiveTab } from "../lib/types";
import { NotificationCenter } from "./NotificationCenter";

interface HeaderProps {
  user: User | null;
  health: HealthStatus | null;
  onLogout: () => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({
  user,
  health,
  onLogout,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="border-b border-white/5 backdrop-blur-md sticky top-0 z-[1000] bg-slate-950/80">
      <div className="mx-auto max-w-[1400px] px-4 py-3 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo & Integrated Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-sm">
          <div
            onClick={() => onTabChange("fields")}
            className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-95 transition-all"
            title="Mizan"
          >
            M
          </div>
          
          {/* Integrated Search Input (only on fields tab) */}
          <div className="relative flex-1 hidden sm:block">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 text-xs">
              🔍
            </span>
            <input
              type="text"
              placeholder="Rechercher... / بحث"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/40 placeholder-slate-500"
              aria-label="Rechercher"
            />
          </div>
        </div>

        {/* Center: Facebook-style Tab Navigation Bar */}
        <nav className="flex items-center gap-1.5 md:gap-3 bg-slate-900/40 p-1 rounded-full border border-white/5" aria-label="Main Tabs">
          <button
            type="button"
            onClick={() => onTabChange("fields")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "fields"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Fil d'actualité (الرئيسية)"
          >
            <span>🏠</span>
            <span className="hidden md:inline">Accueil</span>
          </button>
          {user?.role === "DEVELOPER" && (
            <button
              type="button"
              onClick={() => onTabChange("knowledge")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "knowledge"
                  ? "bg-purple-500 text-white shadow-md shadow-purple-500/10"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Base de Connaissance (الموسوعة)"
            >
              <span>🧠</span>
              <span className="hidden md:inline">Savoir</span>
            </button>
          )}
        </nav>

        {/* Right Side: DB Health Status & Notification Hub & Logout */}
        <div className="flex items-center gap-3">
          {health && (
            <div className="hidden lg:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 text-[9px] font-bold uppercase tracking-wider">
              <span
                className={`h-2 w-2 rounded-full ${
                  health.db === "connected" ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                }`}
              />
              <span className="text-slate-400">
                DB:{" "}
                <span className={health.db === "connected" ? "text-emerald-400" : "text-red-400"}>
                  {health.db}
                </span>
              </span>
            </div>
          )}

          {/* Interactive Notification Bell */}
          <NotificationCenter />

          {/* User Block & Logout */}
          <div className="flex items-center gap-3 border-l border-white/10 pl-3">
            <span className="text-xs text-slate-300 font-bold hidden sm:inline">{user?.fullName}</span>
            <button
              onClick={onLogout}
              className="text-[10px] font-bold bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-lg border border-white/5 transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
