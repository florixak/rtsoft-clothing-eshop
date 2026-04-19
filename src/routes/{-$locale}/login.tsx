import Login from "@/components/auth/login";
import { isAuthenticated } from "@/lib/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/login")({
  component: RouteComponent,
  beforeLoad: async (/*{ context }*/) => {
    const isLoggedIn = isAuthenticated();
    if (isLoggedIn) {
      throw redirect({ to: "/{-$locale}/account" });
    }
  },
});

function RouteComponent() {
  return <Login />;
}
