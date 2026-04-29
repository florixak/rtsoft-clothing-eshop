import UserSidebar from "@/components/user/user-sidebar";
import RouteError from "@/components/layout/route-error";
import { isAuthenticated } from "@/lib/auth";
import { AccountLayoutSkeleton } from "@/components/skeletons";

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/account")({
  component: AccountLayout,
  pendingComponent: AccountLayoutSkeleton,
  errorComponent: RouteError,
  beforeLoad: async (/*{ context }*/) => {
    const isLoggedIn = isAuthenticated();
    if (!isLoggedIn) {
      throw redirect({ to: "/{-$locale}/login" });
    }
  },
});

function AccountLayout() {
  return (
    <section className="container mx-auto flex flex-col md:flex-row gap-8">
      <UserSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  );
}
