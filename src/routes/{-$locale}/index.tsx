import Catalog from "@/components/catalog/catalog";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/")({
  component: HomeComponent,
});

function HomeComponent() {
  return <Catalog />;
}
