import type { Languages } from "@/lib/i18n";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLanguage: Languages =
    i18n.resolvedLanguage === "en" ? "en" : "cs";

  const changeLanguage = async (value: string | null) => {
    if (value === "cs" || value === "en") {
      if (value === currentLanguage) return;

      const pathnameWithoutLocale = location.pathname.replace(
        /^\/(cs|en)(?=\/|$)/,
        "",
      );
      const localizedPath = `/${value}${pathnameWithoutLocale || "/"}`;

      await i18n.changeLanguage(value);
      await navigate({
        to: localizedPath,
        replace: true,
        search: location.search,
        hash: location.hash,
      });
    }
  };
  return { currentLanguage, changeLanguage };
};

export default useLanguage;
