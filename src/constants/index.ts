import type { Query } from "@/lib/product-utils";

const MAX_COLORS_TO_SHOW_PER_CARD = 3;
const MAX_SIZES_TO_SHOW_PER_CARD = 3;

const QUERY_KEYS = {
  products: (query: Query) => ["products", query] as const,
  productSlug: (productSlug: string) =>
    ["product", "slug", productSlug] as const,
  productId: (productId: string) => ["product", "id", productId] as const,
  category: (categoryId: string) => ["category", categoryId] as const,
  checkoutOrder: (orderId: string) => ["checkoutOrder", orderId] as const,
};

const SEEN_PRODUCTS_STORAGE_KEY = "seenProducts";
const MAX_SEEN_PRODUCTS = 3;

const FREE_SHIPPING_THRESHOLD = 1000;

const CART_ITEM_SHOW_MORE = 3;

const CHECKOUT_STEPS = ["shipping", "payment", "review"] as const;

export type CheckoutStep = (typeof CHECKOUT_STEPS)[number];

export {
  MAX_COLORS_TO_SHOW_PER_CARD,
  MAX_SIZES_TO_SHOW_PER_CARD,
  QUERY_KEYS,
  SEEN_PRODUCTS_STORAGE_KEY,
  MAX_SEEN_PRODUCTS,
  FREE_SHIPPING_THRESHOLD,
  CART_ITEM_SHOW_MORE,
  CHECKOUT_STEPS,
};
