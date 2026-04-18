import AdminSidebar from "@/components/admin/admin-sidebar";
import { hasRole } from "@/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin")({
  component: AdminLayout,
  beforeLoad: async (/*{ context }*/) => {
    if (!hasRole("admin")) {
      throw redirect({ to: "/{-$locale}" });
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
