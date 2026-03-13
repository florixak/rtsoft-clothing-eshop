import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const VALID_LOCALES = ["en", "cs"] as const;

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const locale = params.locale;

    // Redirect /cs/* to /* (cs has no URL prefix)
    if (locale === "cs") {
      const pathWithoutLocale = location.pathname.replace(/^\/cs/, "") || "/";
      const to =
        pathWithoutLocale === "/"
          ? "/{-$locale}"
          : `/{-$locale}${
              pathWithoutLocale.startsWith("/")
                ? pathWithoutLocale
                : "/" + pathWithoutLocale
            }`;
      throw redirect({ to, params: { locale: undefined } });
    }

    if (
      locale &&
      !VALID_LOCALES.includes(locale as (typeof VALID_LOCALES)[number])
    ) {
      throw redirect({ to: "/{-$locale}", params: { locale: undefined } });
    }

    return { locale: (locale ?? "cs") as "en" | "cs" };
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
