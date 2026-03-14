import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/product/$productSlug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/-$locale/product/$productSlug"!</div>;
}
