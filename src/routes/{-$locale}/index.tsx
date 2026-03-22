import Catalog from "@/components/catalog/catalog";
import { SORT_BY_OPTIONS } from "@/data/products";
import { getProducts } from "@/lib/product-utils";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

const filterSchema = z.object({
  category: z.string().optional(),
  sort: z.enum(SORT_BY_OPTIONS).optional(),
  priceRange: z.string().optional(),
  rating: z.coerce.number().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  availability: z.enum(["inStock", "outOfStock"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  perPage: z.coerce.number().int().positive().optional(),
});

export const Route = createFileRoute("/{-$locale}/")({
  component: HomeComponent,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
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
