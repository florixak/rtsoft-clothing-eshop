import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/-$locale/admin/products"!</div>;
}
