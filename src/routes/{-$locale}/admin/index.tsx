import AdminOverview from "@/components/admin/admin-overview";
import RouteError from "@/components/layout/route-error";
import { ordersSchema } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/")({
  component: RouteComponent,
  validateSearch: ordersSchema,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: RouteError,
});

function RouteComponent() {
  return <AdminOverview />;
}
