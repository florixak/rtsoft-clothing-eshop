import AdminProducts from "@/components/admin/products/admin-products";
import RouteError from "@/components/layout/route-error";
import { productsSchema } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/products")({
  component: RouteComponent,
  validateSearch: productsSchema,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: RouteError,
});

function RouteComponent() {
  return <AdminProducts />;
}
