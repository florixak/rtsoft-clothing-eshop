import CheckoutSuccess from "@/components/checkout/checkout-success";
import { createCheckoutOrderQueryOptions } from "@/hooks/query-options";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

const successSchema = z.object({
  orderId: z.string(),
});

export const Route = createFileRoute("/{-$locale}/checkout/success")({
  component: RouteComponent,
  validateSearch: successSchema,
  loaderDeps: ({ search }) => [search.orderId],
  errorComponent: () => <div>Order not found</div>,
  pendingComponent: () => <div>Loading...</div>,
  loader: async ({ context, deps }) => {
    const orderId = deps[0];
    const order = await context.queryClient.ensureQueryData(
      createCheckoutOrderQueryOptions(orderId),
    );

    if (!order) {
      throw new Response("Order not found", { status: 404 });
    }
  },
});

function RouteComponent() {
  return <CheckoutSuccess />;
}
