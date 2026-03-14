import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/{-$locale}/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { t } = useTranslation();
  return (
    <main>
      <h1>{t("nav.home")}</h1>
    </main>
  );
}
