import Catalog from "@/components/catalog/catalog";
import { SORT_BY_OPTIONS } from "@/data/products";
import { getProducts } from "@/lib/product-utils";
import { createFileRoute } from "@tanstack/react-router";
import RouteError from "@/components/layout/route-error";
import NotFound from "@/components/layout/not-found";
import * as z from "zod";
import { CatalogSkeleton } from "@/components/skeletons";

const multiValueParamSchema = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .transform((value) => {
    if (!value) return undefined;

    const normalized = (Array.isArray(value) ? value : [value])
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);

    if (normalized.length === 0) return undefined;

    return Array.from(new Set(normalized));
  });

const filterSchema = z.object({
  category: z.string().optional(),
  sort: z.enum(SORT_BY_OPTIONS).optional(),
  priceRange: z.string().optional(),
  rating: z.coerce.number().optional(),
  size: multiValueParamSchema,
  color: multiValueParamSchema,
  availability: z.enum(["inStock", "outOfStock"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  perPage: z.coerce.number().int().positive().optional(),
});

export const Route = createFileRoute("/{-$locale}/")({
  component: HomeComponent,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  pendingComponent: CatalogSkeleton,
  errorComponent: RouteError,
  notFoundComponent: () => <NotFound />,
  loader: async ({ context, deps }) => {
    const filters = deps;
    await context.queryClient.ensureQueryData({
      queryKey: ["products", filters],
      queryFn: () => getProducts(filters),
    });
  },
});

function HomeComponent() {
  return <Catalog />;
}
