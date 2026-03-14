import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/account/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/-$locale/user/"!</div>;
}
