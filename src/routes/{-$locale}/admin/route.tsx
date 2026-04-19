import AdminSidebar from "@/components/admin/admin-sidebar";
import { hasRole, isAuthenticated } from "@/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin")({
  component: AdminLayout,
  beforeLoad: async (/*{ context }*/) => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/{-$locale}/login" });
    }
    if (!hasRole("admin")) {
      throw redirect({ to: "/{-$locale}/account" });
    }
  },
});

function AdminLayout() {
  return (
    <section className="container mx-auto flex flex-col md:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  );
}
