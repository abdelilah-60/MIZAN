import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./ar.json";
import fr from "./fr.json";

const savedLang = localStorage.getItem("mizan_lang") || "ar";

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    fr: { translation: fr },
  },
  lng: savedLang,
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

// Update document direction based on active language
const updateDirection = (lang: string) => {
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;
  localStorage.setItem("mizan_lang", lang);
};

updateDirection(savedLang);

i18n.on("languageChanged", (lang) => {
  updateDirection(lang);
});

export default i18n;
