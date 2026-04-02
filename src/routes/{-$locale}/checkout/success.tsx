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
  loader: async ({ context, deps }) => {
    const orderId = deps[0];
    const order = await context.queryClient.ensureQueryData(
      createCheckoutOrderQueryOptions(orderId),
    );

    console.log("Loaded order in success page:", order);

    if (!order) {
      throw new Response("Order not found", { status: 404 });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/-$locale/checkout/success"!</div>;
}
