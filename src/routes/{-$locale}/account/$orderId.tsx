import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/account/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { locale, orderId } = Route.useParams();

  return (
    <div>
      Hello "/{locale ?? "cs"}/account/{orderId}"!
    </div>
  );
}
