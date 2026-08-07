import type { User, ActiveTab } from "../lib/types";
import { useTranslation } from "react-i18next";

interface SidebarLeftProps {
  user: User | null;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  fieldsCount: number;
  onLogout: () => void;
  selectedFieldId?: string | null;
  setSelectedFieldId?: (id: string | null) => void;
}

export function SidebarLeft({
  user,
  activeTab,
  setActiveTab,
  fieldsCount,
  onLogout,
  setSelectedFieldId,
}: SidebarLeftProps) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (setSelectedFieldId) setSelectedFieldId(null);
  };

  return (
    <aside className="space-y-4">
      {/* Profile Card */}
      <div className="bg-[#1f2d3a] border border-[#2e4052] rounded-2xl p-4 backdrop-blur-sm space-y-4 shadow-xl">
        <div
          onClick={() => handleTabClick("profile")}
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-all ${
            activeTab === "profile"
              ? "bg-[#8D5B4C]/20 border border-[#8D5B4C]/40"
              : "hover:bg-[#2C3E50]/40"
          }`}
          title={t("nav.profile")}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#8D5B4C] to-[#A0522D] flex items-center justify-center text-[#F9F8F6] font-bold text-sm shadow-md border border-[#B86B53]/30">
            {user?.fullName?.charAt(0) || "U"}
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#F9F8F6] hover:text-[#8D5B4C] transition-colors">
              {user?.fullName || (isAr ? "مزارع ميزان" : "Agriculteur Mizan")}
            </h4>
            <p className="text-[10px] text-[#A8A093] font-medium">
              {isAr ? "منصة ميزان • نمط الحكيم" : "Mizan AgTech • Mode Sage"}
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5" aria-label="Main Navigation">
          <button
            type="button"
            onClick={() => handleTabClick("fields")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "fields"
                ? "bg-[#8D5B4C]/20 text-[#F9F8F6] border border-[#8D5B4C]/40"
                : "text-[#D8D2C5] hover:bg-[#2C3E50]/40 hover:text-[#F9F8F6] border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-sm">🏠</span>
              <span>{t("nav.feed")}</span>
            </div>
            {fieldsCount > 0 && (
              <span className="bg-[#16212b] text-[10px] px-1.5 py-0.5 rounded-md font-bold text-[#D8D2C5]">
                {fieldsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTabClick("analytics")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "analytics"
                ? "bg-[#8D5B4C]/20 text-[#F9F8F6] border border-[#8D5B4C]/40"
                : "text-[#D8D2C5] hover:bg-[#2C3E50]/40 hover:text-[#F9F8F6] border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-sm">📊</span>
              <span>{t("nav.analytics")}</span>
            </div>
          </button>

          {user?.role === "DEVELOPER" && (
            <button
              type="button"
              onClick={() => handleTabClick("knowledge")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "knowledge"
                  ? "bg-[#2C3E50] text-[#F9F8F6] border border-[#8D5B4C]/40"
                  : "text-[#D8D2C5] hover:bg-[#2C3E50]/40 hover:text-[#F9F8F6] border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">🧠</span>
                <span>{t("nav.knowledge")}</span>
              </div>
            </button>
          )}

          {/* "+ Créer une Parcelle" Button */}
          <button
            type="button"
            onClick={() => handleTabClick("create-field")}
            className={`w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all active:scale-[0.98] ${
              activeTab === "create-field"
                ? "bg-[#A0522D] text-[#F9F8F6]"
                : "bg-[#8D5B4C] hover:bg-[#A0522D] text-[#F9F8F6]"
            }`}
          >
            <span>➕</span>
            <span>{t("nav.createField")}</span>
          </button>
        </nav>
      </div>

      {/* Logout button */}
      <div className="pt-4 border-t border-[#2e4052]">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400/90 hover:text-red-400 hover:bg-red-900/20 transition-all"
        >
          <span>🚪</span>
          <span>{t("nav.logout")}</span>
        </button>
      </div>
    </aside>
  );
}
