import type { Languages } from "@/lib/i18n";
import { useTranslation } from "react-i18next";

const useLocale = (): Languages => {
  const { i18n } = useTranslation();
  return i18n.resolvedLanguage === "en" ? "en" : "cs";
};

export default useLocale;
