import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import csCommon from "@/locales/cs/common.json";
import enCommon from "@/locales/en/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      cs: {
        common: csCommon,
      },
    },
    lng: "cs",
    fallbackLng: "cs",
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

export default i18n;
