import type { Query } from "@/lib/product-utils";

const MAX_COLORS_TO_SHOW_PER_CARD = 3;
const MAX_SIZES_TO_SHOW_PER_CARD = 3;

const QUERY_KEYS = {
  products: (query: Query) => ["products", query] as const,
  product: (productSlug: string) => ["product", productSlug] as const,
};

export { MAX_COLORS_TO_SHOW_PER_CARD, MAX_SIZES_TO_SHOW_PER_CARD, QUERY_KEYS };
