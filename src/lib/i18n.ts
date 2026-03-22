import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import csCommon from "@/locales/cs/common.json";
import csCatalog from "@/locales/cs/catalog.json";
import enCommon from "@/locales/en/common.json";
import enCatalog from "@/locales/en/catalog.json";

const resources = {
  cs: {
    common: csCommon,
    catalog: csCatalog,
  },
  en: {
    common: enCommon,
    catalog: enCatalog,
  },
};

export type Languages = keyof typeof resources;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "cs",
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

export default i18n;
