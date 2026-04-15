import { MAX_RECENT_ORDERS_TO_SHOW, QUERY_KEYS } from "@/constants";
import { getCategoryById } from "@/lib/category-utils";
import {
  getBestSellingProducts,
  getDashboardMetrics,
  getOrders,
  getRevenueChartData,
} from "@/lib/dashboard-utils";
import { getCheckoutOrder } from "@/lib/order-storage";
import { getOrderById } from "@/lib/order-utils";
import {
  getAdminProducts,
  getProductById,
  getProductBySlug,
  getProducts,
  type Query,
} from "@/lib/product-utils";
import type { DashboardPeriod } from "@/types";
import { queryOptions } from "@tanstack/react-query";

export const createProductsQueryOptions = (query: Query) =>
  queryOptions({
    queryKey: QUERY_KEYS.products(query),
    queryFn: () => getProducts(query),
  });

export const createProductSlugQueryOptions = (productSlug: string) =>
  queryOptions({
    queryKey: QUERY_KEYS.productSlug(productSlug),
    queryFn: () => getProductBySlug(productSlug),
  });

export const createProductIdQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: QUERY_KEYS.productId(productId),
    queryFn: () => getProductById(productId),
  });

export const createCategoryQueryOptions = (categoryId: string) =>
  queryOptions({
    queryKey: QUERY_KEYS.category(categoryId),
    queryFn: () => getCategoryById(categoryId),
  });

export const createCheckoutOrderQueryOptions = (orderId: string) =>
  queryOptions({
    queryKey: QUERY_KEYS.checkoutOrder(orderId),
    queryFn: () => getCheckoutOrder(orderId),
  });

export const createMetricsQueryOptions = (period: DashboardPeriod) =>
  queryOptions({
    queryKey: QUERY_KEYS.metrics(period),
    queryFn: () => getDashboardMetrics(period),
  });

export const createRevenueChartDataQueryOptions = (period: DashboardPeriod) =>
  queryOptions({
    queryKey: QUERY_KEYS.revenueChartData(period),
    queryFn: () => getRevenueChartData(period),
  });

export const createBestSellersQueryOptions = (period: DashboardPeriod) =>
  queryOptions({
    queryKey: QUERY_KEYS.bestSellers(period),
    queryFn: () => getBestSellingProducts(period),
  });

export const createRecentOrdersQueryOptions = () =>
  queryOptions({
    queryKey: QUERY_KEYS.recentOrders,
    queryFn: () => getOrders({ limit: MAX_RECENT_ORDERS_TO_SHOW }),
  });

export const createAdminOrdersQueryOptions = () =>
  queryOptions({
    queryKey: QUERY_KEYS.adminOrders,
    queryFn: () => getOrders({}),
  });

export const createAdminProductsQueryOptions = () =>
  queryOptions({
    queryKey: QUERY_KEYS.adminProducts,
    queryFn: () => getAdminProducts(),
  });

export const createOrderDetailsQueryOptions = (orderId: string) =>
  queryOptions({
    queryKey: QUERY_KEYS.orderDetails(orderId),
    queryFn: () => getOrderById(orderId),
    retry: false,
  });
