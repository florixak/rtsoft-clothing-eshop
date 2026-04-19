import Login from "@/components/auth/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
