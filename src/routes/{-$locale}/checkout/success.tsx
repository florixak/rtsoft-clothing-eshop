import CheckoutSuccess from "@/components/checkout/checkout-success";
import { createCheckoutOrderQueryOptions } from "@/hooks/query-options";
import { createFileRoute, notFound } from "@tanstack/react-router";
import OrderNotFound from "@/components/order/order-not-found";
import * as z from "zod";

const successSchema = z.object({
  orderId: z.string().optional(),
});

export const Route = createFileRoute("/{-$locale}/checkout/success")({
  component: RouteComponent,
  validateSearch: successSchema,
  loaderDeps: ({ search }) => [search.orderId],
  notFoundComponent: () => <OrderNotFound />,
  errorComponent: () => <div>Error loading order details</div>,
  pendingComponent: () => <div>Loading...</div>,
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
      if (error instanceof Error && error.message === "Order not found") {
        throw notFound();
      }

      throw error;
    }
  },
});

function RouteComponent() {
  return <CheckoutSuccess />;
}
