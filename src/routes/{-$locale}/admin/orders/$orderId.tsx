import OrderDetails from "@/components/order/order-details";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/orders/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderDetails />;
}
