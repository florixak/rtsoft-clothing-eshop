import type { Query } from "@/lib/product-utils";
import type { DashboardMetricsKey, DashboardPeriod } from "@/types";
import {
  Banknote,
  HandCoins,
  LayoutTemplate,
  Shirt,
  ShoppingBag,
  Users,
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
  metrics: (period: DashboardPeriod) => ["metrics", period] as const,
  revenueChartData: (period: DashboardPeriod) =>
    ["revenueChartData", period] as const,
  bestSellers: (period: DashboardPeriod) => ["bestSellers", period] as const,
  recentOrders: ["recentOrders"] as const,
};

const SEEN_PRODUCTS_STORAGE_KEY = "seenProducts";
const MAX_SEEN_PRODUCTS = 3;

const MAX_CART_ITEMS_TO_SHOW = 3;
const MAX_CART_ITEMS_TO_SHOW_IN_ORDER_SUMMARY = 2;

const MAX_RECENT_ORDERS_TO_SHOW = 5;

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

const METRIC_CARDS: {
  key: DashboardMetricsKey;
  evolution: number;
  icon: LucideIcon;
}[] = [
  { key: "totalRevenue", evolution: 5.2, icon: HandCoins },
  { key: "totalOrders", evolution: 3.6, icon: ShoppingBag },
  { key: "averageOrderValue", evolution: -1.3, icon: Banknote },
  { key: "returningCustomerRate", evolution: 2.1, icon: Users },
];

export {
  MAX_COLORS_TO_SHOW_PER_CARD,
  MAX_SIZES_TO_SHOW_PER_CARD,
  QUERY_KEYS,
  SEEN_PRODUCTS_STORAGE_KEY,
  MAX_SEEN_PRODUCTS,
  MAX_CART_ITEMS_TO_SHOW,
  MAX_CART_ITEMS_TO_SHOW_IN_ORDER_SUMMARY,
  MAX_RECENT_ORDERS_TO_SHOW,
  FREE_SHIPPING_THRESHOLD,
  CHECKOUT_STEPS,
  ADMIN_MENU_ITEMS,
  METRIC_CARDS,
};
