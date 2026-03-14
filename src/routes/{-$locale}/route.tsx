import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const VALID_LOCALES = ["en", "cs"] as const;
type Locale = (typeof VALID_LOCALES)[number];

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const locale = params.locale;

    if (!locale) return { locale: "cs" as Locale };
    if (VALID_LOCALES.includes(locale as Locale)) {
      return { locale: locale as Locale };
    }

    throw notFound();
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { locale } = Route.useRouteContext();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return <Outlet />;
}
