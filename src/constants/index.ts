import type { Query } from "@/lib/product-utils";
import {
  LayoutTemplate,
  Shirt,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

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

const MAX_CART_ITEMS_TO_SHOW = 3;
const MAX_CART_ITEMS_TO_SHOW_IN_ORDER_SUMMARY = 2;

const FREE_SHIPPING_THRESHOLD = 1000;

const CHECKOUT_STEPS = ["shipping", "payment", "review"] as const;

export type CheckoutStep = (typeof CHECKOUT_STEPS)[number];

const ADMIN_MENU_ITEMS: {
  icon: LucideIcon;
  label: `nav.${string}`;
  path: string;
}[] = [
  { icon: LayoutTemplate, label: "nav.overview", path: "/{-$locale}/admin" },
  { icon: ShoppingBag, label: "nav.orders", path: "/{-$locale}/admin/orders" },
  {
    icon: Shirt,
    label: "nav.products",
    path: "/{-$locale}/admin/products",
  },
];

export {
  MAX_COLORS_TO_SHOW_PER_CARD,
  MAX_SIZES_TO_SHOW_PER_CARD,
  QUERY_KEYS,
  SEEN_PRODUCTS_STORAGE_KEY,
  MAX_SEEN_PRODUCTS,
  MAX_CART_ITEMS_TO_SHOW,
  MAX_CART_ITEMS_TO_SHOW_IN_ORDER_SUMMARY,
  FREE_SHIPPING_THRESHOLD,
  CHECKOUT_STEPS,
  ADMIN_MENU_ITEMS,
};
