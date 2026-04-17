import UserOrders from "@/components/user/orders/user-orders";
import { ordersSchema } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/account/orders/")({
  component: RouteComponent,
  validateSearch: ordersSchema,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error loading account orders</div>,
});

function RouteComponent() {
  return <UserOrders />;
}
