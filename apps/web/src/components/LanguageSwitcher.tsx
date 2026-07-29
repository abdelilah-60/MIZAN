import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "ar";

  const toggleLanguage = () => {
    const nextLang = currentLang === "ar" ? "fr" : "ar";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-black text-emerald-400 hover:text-emerald-300 transition-all shadow-md active:scale-95 flex items-center gap-1.5"
      title="Changer la langue / تغيير اللغة"
    >
      <span>🌐</span>
      <span>{currentLang === "ar" ? "Français" : "العربية"}</span>
    </button>
  );
}
