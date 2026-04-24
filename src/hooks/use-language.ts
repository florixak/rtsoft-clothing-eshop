import type { Languages } from "@/lib/i18n";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import useLocale from "./use-locale";

const useLanguage = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLanguage: Languages = useLocale();

  const changeLanguage = async (value: string | null) => {
    if (value === "cs" || value === "en") {
      if (value === currentLanguage) return;

      const pathnameWithoutLocale = location.pathname.replace(
        /^\/(cs|en)(?=\/|$)/,
        "",
      );
      const localizedPath = `/${value}${pathnameWithoutLocale || "/"}`;

      await navigate({
        to: localizedPath,
        replace: true,
        search: true,
        hash: true,
      });

      await i18n.changeLanguage(value);
    }
  };
  return { currentLanguage, changeLanguage };
};

export default useLanguage;
