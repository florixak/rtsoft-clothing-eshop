import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/product/$productSlug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { locale, productSlug } = Route.useParams();
  return (
    <div>
      Hello "/{locale ?? "cs"}/product/{productSlug}"!
    </div>
  );
}
