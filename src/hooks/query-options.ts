import { QUERY_KEYS } from "@/constants";
import { getCategoryById } from "@/lib/category-utils";
import {
  getDashboardMetrics,
  getRevenueChartData,
} from "@/lib/dashboard-utils";
import { getCheckoutOrder } from "@/lib/order-storage";
import {
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
