import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/checkout/success")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/-$locale/checkout/success"!</div>;
}
