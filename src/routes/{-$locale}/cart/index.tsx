import Cart from "@/components/cart/cart";
import RouteError from "@/components/layout/route-error";
import { CartSkeleton } from "@/components/skeletons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/cart/")({
  pendingComponent: CartSkeleton,
  errorComponent: RouteError,
  component: RouteComponent,
});

function RouteComponent() {
  return <Cart />;
}
