import UserSidebar from "@/components/user/user-sidebar";
import { getCurrentUserId } from "@/lib/auth";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/account")({
  component: AccountLayout,
  beforeLoad: async (/*{ context }*/) => {
    const isLoggedIn = Boolean(getCurrentUserId());
    if (!isLoggedIn) {
      throw new Response("Unauthorized", { status: 401 });
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
