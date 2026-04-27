import CheckoutSuccess from "@/components/checkout/checkout-success";
import { createCheckoutOrderQueryOptions } from "@/hooks/query-options";
import { createFileRoute, notFound } from "@tanstack/react-router";
import OrderNotFound from "@/components/order/order-not-found";
import * as z from "zod";

const successSchema = z.object({
  orderId: z.string(),
});

export const Route = createFileRoute("/{-$locale}/checkout/success")({
  component: RouteComponent,
  validateSearch: successSchema,
  loaderDeps: ({ search }) => [search.orderId],
  errorComponent: () => <OrderNotFound />,
  notFoundComponent: () => <OrderNotFound />,
  pendingComponent: () => <div>Loading...</div>,
  loader: async ({ context, deps }) => {
    const orderId = deps[0];
    const order = await context.queryClient.ensureQueryData(
      createCheckoutOrderQueryOptions(orderId),
    );

    if (!order) {
      throw notFound();
    }
  },
});

function RouteComponent() {
  return <CheckoutSuccess />;
}
