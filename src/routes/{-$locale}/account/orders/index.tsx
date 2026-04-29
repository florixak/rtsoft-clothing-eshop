import UserOrders from "@/components/user/orders/user-orders";
import RouteError from "@/components/layout/route-error";
import { ordersSchema } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/account/orders/")({
  component: RouteComponent,
  validateSearch: ordersSchema,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: RouteError,
});

function RouteComponent() {
  return <UserOrders />;
}
