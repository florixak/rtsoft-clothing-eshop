import OrderDetails from "@/components/order/order-details";
import OrderNotFound from "@/components/order/order-not-found";
import { Skeleton } from "@/components/ui/skeleton";
import { createOrderDetailsQueryOptions } from "@/hooks/query-options";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/orders/$orderId")({
  component: RouteComponent,
  pendingComponent: () => <Skeleton className="h-10 w-full rounded" />,
  errorComponent: () => <div>Error loading order details</div>,
  notFoundComponent: () => <OrderNotFound />,
  loader: async ({ params, context }) => {
    const { orderId } = params;
    const order = await context.queryClient.ensureQueryData(
      createOrderDetailsQueryOptions(orderId),
    );

    if (!order) {
      throw notFound();
    }
  },
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  return (
    <OrderDetails orderId={orderId} ordersListPath="/{-$locale}/admin/orders" />
  );
}
