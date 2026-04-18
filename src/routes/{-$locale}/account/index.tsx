import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/account/")({
  component: RouteComponent,
  loader: () => {
    throw redirect({ to: "/{-$locale}/account/orders" });
  },
});

function RouteComponent() {
  return null;
}
