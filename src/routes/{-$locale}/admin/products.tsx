import AdminProducts from "@/components/admin/products/admin-products";
import { productsSchema } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/admin/products")({
  component: RouteComponent,
  validateSearch: productsSchema,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error loading products</div>,
});

function RouteComponent() {
  return <AdminProducts />;
}
