import Cart from "@/components/cart/cart";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Cart />;
}
