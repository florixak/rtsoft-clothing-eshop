import Product from "@/components/product/product";
import {
  createCategoryQueryOptions,
  createProductSlugQueryOptions,
} from "@/hooks/query-options";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/product/$productSlug")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { productSlug } = params;
    const { categoryId } = await context.queryClient.ensureQueryData(
      createProductSlugQueryOptions(productSlug),
    );
    await context.queryClient.ensureQueryData(
      createCategoryQueryOptions(categoryId),
    );
  },
});

function RouteComponent() {
  return <Product />;
}
