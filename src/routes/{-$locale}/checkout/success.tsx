import CheckoutSuccess from "@/components/checkout/checkout-success";
import RouteError from "@/components/layout/route-error";
import { createCheckoutOrderQueryOptions } from "@/hooks/query-options";
import { ERROR_CODES, isErrorCode } from "@/lib/errors";
import { createFileRoute, notFound } from "@tanstack/react-router";
import OrderNotFound from "@/components/order/order-not-found";
import { OrderDetailSkeleton } from "@/components/skeletons";
import * as z from "zod";

const successSchema = z.object({
  orderId: z.string().optional(),
});

export const Route = createFileRoute("/{-$locale}/checkout/success")({
  component: RouteComponent,
  validateSearch: successSchema,
  loaderDeps: ({ search }) => [search.orderId],
  notFoundComponent: () => <OrderNotFound />,
  errorComponent: RouteError,
  pendingComponent: OrderDetailSkeleton,
  loader: async ({ context, deps }) => {
    const orderId = deps[0];
    if (!orderId) {
      throw notFound();
    }

    try {
      const order = await context.queryClient.ensureQueryData(
        createCheckoutOrderQueryOptions(orderId),
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
  return <CheckoutSuccess />;
}
