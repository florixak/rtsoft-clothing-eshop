import Checkout from "@/components/checkout/checkout";
import { CHECKOUT_STEPS } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

const checkoutSearchSchema = z.object({
  section: z.enum(CHECKOUT_STEPS).default("shipping"),
});

export const Route = createFileRoute("/{-$locale}/checkout/")({
  validateSearch: checkoutSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return <Checkout />;
}
