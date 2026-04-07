import AdminOrders from "@/components/admin/orders/admin-orders";
import { ordersSchema } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/orders/")({
  component: RouteComponent,
  validateSearch: ordersSchema,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error loading admin orders</div>,
});

function RouteComponent() {
  return <AdminOrders />;
}
