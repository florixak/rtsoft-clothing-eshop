import { createFileRoute, Outlet } from "@tanstack/react-router";
import AdminSidebar from "@/components/admin/admin-sidebar";

export const Route = createFileRoute("/{-$locale}/admin")({
  component: AdminLayout,
  beforeLoad: async ({ context }) => {
    const userIsAdmin = true; // Placeholder for actual admin check logic
    if (!userIsAdmin) {
      throw new Response("Unauthorized", { status: 401 });
    }
  },
});

function AdminLayout() {
  return (
    <section className="container mx-auto flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </section>
  );
}
