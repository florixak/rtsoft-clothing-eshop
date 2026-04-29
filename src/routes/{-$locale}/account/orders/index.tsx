import UserOrders from "@/components/user/orders/user-orders";
import RouteError from "@/components/layout/route-error";
import { ordersSchema } from "@/lib/schema";
import { OrderListSkeleton } from "@/components/skeletons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/account/orders/")({
  component: RouteComponent,
  validateSearch: ordersSchema,
  pendingComponent: OrderListSkeleton,
  errorComponent: RouteError,
});

function RouteComponent() {
  return <UserOrders />;
}
