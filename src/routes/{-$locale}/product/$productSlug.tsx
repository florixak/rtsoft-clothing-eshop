import Product from "@/components/product/product";
import ProductNotFound from "@/components/product/product-not-found";
import { Skeleton } from "@/components/ui/skeleton";
import {
  createCategoryQueryOptions,
  createProductSlugQueryOptions,
} from "@/hooks/query-options";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/product/$productSlug")({
  component: RouteComponent,
  notFoundComponent: () => <ProductNotFound />,
  errorComponent: () => <ProductNotFound />,
  pendingComponent: () => <Skeleton className="h-10 w-full rounded" />,
  loader: async ({ context, params }) => {
    const { productSlug } = params;
    const product = await context.queryClient.ensureQueryData(
      createProductSlugQueryOptions(productSlug),
    );

    if (!product) {
      throw notFound();
    }

    const category = await context.queryClient.ensureQueryData(
      createCategoryQueryOptions(product.categoryId),
    );

    if (!category) {
      throw notFound();
    }
  },
});

function RouteComponent() {
  return <Product />;
}
