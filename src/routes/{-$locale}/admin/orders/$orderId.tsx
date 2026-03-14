import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/orders/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/-$locale/admin/orders/$orderId"!</div>;
}
