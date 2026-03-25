import type { Query } from "@/lib/product-utils";

const MAX_COLORS_TO_SHOW_PER_CARD = 3;
const MAX_SIZES_TO_SHOW_PER_CARD = 3;

const QUERY_KEYS = {
  products: (query: Query) => ["products", query] as const,
  productSlug: (productSlug: string) => ["product", productSlug] as const,
  productId: (productId: string) => ["product", productId] as const,
  category: (categoryId: string) => ["category", categoryId] as const,
};

const SEEN_PRODUCTS_STORAGE_KEY = "seenProducts";
const MAX_SEEN_PRODUCTS = 3;

const FREE_SHIPPING_THRESHOLD = 1000;

export {
  MAX_COLORS_TO_SHOW_PER_CARD,
  MAX_SIZES_TO_SHOW_PER_CARD,
  QUERY_KEYS,
  SEEN_PRODUCTS_STORAGE_KEY,
  MAX_SEEN_PRODUCTS,
  FREE_SHIPPING_THRESHOLD,
};
