import Login from "@/components/auth/login";
import { isAuthenticated } from "@/lib/auth";
import { getSafeReturnPath } from "@/lib/return-path";
import { loginSearchSchema } from "@/lib/schema";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/login")({
  component: RouteComponent,
  validateSearch: loginSearchSchema,
  beforeLoad: async ({ search }) => {
    const isLoggedIn = isAuthenticated();
    if (isLoggedIn) {
      const returnPath = getSafeReturnPath(search.redirect);
      if (returnPath) {
        throw redirect({ href: returnPath });
      }
      throw redirect({ to: "/{-$locale}/account" });
    }
  },
});

function RouteComponent() {
  return <Login />;
}
