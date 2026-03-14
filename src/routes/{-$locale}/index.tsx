import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/")({
  component: HomeComponent,
});

function HomeComponent() {
  return <main></main>;
}
