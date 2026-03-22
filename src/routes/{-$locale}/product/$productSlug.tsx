import Product from "@/components/product/product";
import { createProductQueryOptions } from "@/hooks/query-options";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/product/$productSlug")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { productSlug } = params;
    context.queryClient.ensureQueryData(createProductQueryOptions(productSlug));
  },
});

function RouteComponent() {
  return <Product />;
}
