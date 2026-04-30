import Checkout from "@/components/checkout/checkout";
import RouteError from "@/components/layout/route-error";
import { CheckoutSkeleton } from "@/components/skeletons";
import { CHECKOUT_STEPS } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

const checkoutSearchSchema = z.object({
  section: z.enum(CHECKOUT_STEPS).default("shipping"),
});

export const Route = createFileRoute("/{-$locale}/checkout/")({
  validateSearch: checkoutSearchSchema,
  pendingComponent: CheckoutSkeleton,
  errorComponent: RouteError,
  component: RouteComponent,
});

function RouteComponent() {
  return <Checkout />;
}
