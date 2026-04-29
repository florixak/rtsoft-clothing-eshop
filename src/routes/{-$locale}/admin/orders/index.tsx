import AdminOrders from "@/components/admin/orders/admin-orders";
import RouteError from "@/components/layout/route-error";
import { ordersSchema } from "@/lib/schema";
import { OrderListSkeleton } from "@/components/skeletons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/orders/")({
  component: RouteComponent,
  validateSearch: ordersSchema,
  pendingComponent: OrderListSkeleton,
  errorComponent: RouteError,
});

function RouteComponent() {
  return <AdminOrders />;
}
