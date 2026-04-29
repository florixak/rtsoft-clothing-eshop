import OrderDetails from "@/components/order/order-details";
import OrderNotFound from "@/components/order/order-not-found";
import RouteError from "@/components/layout/route-error";
import { Skeleton } from "@/components/ui/skeleton";
import { createOrderDetailsQueryOptions } from "@/hooks/query-options";
import { ERROR_CODES, isErrorCode } from "@/lib/errors";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/orders/$orderId")({
  component: RouteComponent,
  pendingComponent: () => <Skeleton className="h-10 w-full rounded" />,
  errorComponent: RouteError,
  notFoundComponent: () => <OrderNotFound />,
  loader: async ({ params, context }) => {
    const { orderId } = params;
    try {
      const order = await context.queryClient.ensureQueryData(
        createOrderDetailsQueryOptions(orderId),
      );

      if (!order) {
        throw notFound();
      }
    } catch (error) {
      if (isErrorCode(error, ERROR_CODES.orderNotFound)) {
        throw notFound();
      }

      throw error;
    }
  },
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  return (
    <OrderDetails orderId={orderId} ordersListPath="/{-$locale}/admin/orders" />
  );
}
