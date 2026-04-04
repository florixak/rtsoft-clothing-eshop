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
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
