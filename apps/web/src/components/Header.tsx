import type { User, HealthStatus, ActiveTab } from "../lib/types";
import { NotificationCenter } from "./NotificationCenter";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <header className="border-b border-[#2e4052]/60 backdrop-blur-md sticky top-0 z-[1000] bg-[#16212b]/95">
      <div className="mx-auto max-w-[1400px] px-4 py-3 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo & Integrated Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-sm">
          <div
            onClick={() => onTabChange("fields")}
            className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#8D5B4C] to-[#A0522D] flex items-center justify-center text-[#F9F8F6] font-black text-lg shadow-md shadow-[#8D5B4C]/25 cursor-pointer hover:scale-95 transition-all border border-[#B86B53]/40"
            title={t("common.appTitle")}
          >
            M
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-[#F9F8F6] tracking-tight">MIZAN</span>
            <span className="text-[9px] font-bold text-[#8D5B4C] uppercase tracking-widest -mt-0.5">
              {isAr ? "نمط الحكيم" : "MODE SAGE"}
            </span>
          </div>
          
          {/* Integrated Search Input */}
          <div className="relative flex-1 hidden sm:block ml-2">
            <span className="absolute inset-y-0 left-3 flex items-center text-[#A8A093] text-xs">
              🔍
            </span>
            <input
              type="text"
              placeholder={t("common.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#1f2d3a] border border-[#2e4052] rounded-full pl-9 pr-4 py-1.5 text-xs text-[#F9F8F6] focus:outline-none focus:ring-1 focus:ring-[#8D5B4C] placeholder-[#A8A093]"
              aria-label={t("common.searchPlaceholder")}
            />
          </div>
        </div>

        {/* Center: Sage Tab Navigation Bar */}
        <nav className="flex items-center gap-1.5 md:gap-3 bg-[#1f2d3a]/80 p-1 rounded-full border border-[#2e4052]" aria-label="Main Tabs">
          <button
            type="button"
            onClick={() => onTabChange("fields")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "fields"
                ? "bg-[#8D5B4C] text-[#F9F8F6] shadow-md shadow-[#8D5B4C]/30"
                : "text-[#D8D2C5] hover:text-[#F9F8F6]"
            }`}
            title={t("nav.feed")}
          >
            <span>🏠</span>
            <span className="hidden md:inline">{isAr ? "الرئيسية" : "Accueil"}</span>
          </button>
          {user?.role === "DEVELOPER" && (
            <button
              type="button"
              onClick={() => onTabChange("knowledge")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "knowledge"
                  ? "bg-[#2C3E50] text-[#F9F8F6] border border-[#8D5B4C]/40 shadow-md shadow-[#2C3E50]/40"
                  : "text-[#D8D2C5] hover:text-[#F9F8F6]"
              }`}
              title={t("nav.knowledge")}
            >
              <span>🧠</span>
              <span className="hidden md:inline">{isAr ? "قاعدة المعرفة" : "Savoir"}</span>
            </button>
          )}
        </nav>

        {/* Right Side: DB Health Status & Notification Hub & Logout */}
        <div className="flex items-center gap-3">
          {health && (
            <div className="hidden lg:flex items-center gap-2 bg-[#1f2d3a] px-3 py-1.5 rounded-full border border-[#2e4052] text-[9px] font-bold uppercase tracking-wider">
              <span
                className={`h-2 w-2 rounded-full ${
                  health.db === "connected" ? "bg-[#8D5B4C] animate-pulse" : "bg-red-400"
                }`}
              />
              <span className="text-[#A8A093]">
                DB:{" "}
                <span className={health.db === "connected" ? "text-[#D8D2C5]" : "text-red-400"}>
                  {health.db === "connected" ? (isAr ? "متصل" : "Connecté") : (isAr ? "منقطع" : "Déconnecté")}
                </span>
              </span>
            </div>
          )}

          <NotificationCenter />
          <LanguageSwitcher />

          {/* User Block & Logout */}
          <div className="flex items-center gap-3 border-l border-[#2e4052] pl-3">
            <span className="text-xs text-[#F9F8F6] font-bold hidden sm:inline">{user?.fullName}</span>
            <button
              onClick={onLogout}
              className="text-[10px] font-bold bg-[#1f2d3a] hover:bg-red-900/30 text-[#D8D2C5] hover:text-red-400 px-3 py-1.5 rounded-lg border border-[#2e4052] transition-all active:scale-95"
            >
              {t("nav.logout")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
