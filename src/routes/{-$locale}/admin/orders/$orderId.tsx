import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/orders/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { locale, orderId } = Route.useParams();

  return (
    <div>
      Hello "/{locale ?? "cs"}/admin/orders/{orderId}"!
    </div>
  );
}
