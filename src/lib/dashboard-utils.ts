import {
  dashboardMetrics,
  dashboardStats,
  type RevenueChartDataPoint,
} from "@/data/stats";
import type {
  DashboardMetrics,
  DashboardPeriod,
  Order,
  OrderStatus,
  Product,
  TopProduct,
} from "@/types";
import type { FilterFn } from "@tanstack/react-table";
import type { Languages } from "./i18n";
import { getProductById } from "./product-utils";

export const getDashboardMetrics = async (
  period: DashboardPeriod,
): Promise<DashboardMetrics> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const metric = dashboardMetrics.find((metric) => metric.period === period);

  if (!metric) {
    throw new Error(`No metrics found for period: ${period}`);
  }

  return metric ?? dashboardMetrics[0];
};

export const getRevenueChartData = async (
  period: DashboardPeriod,
): Promise<RevenueChartDataPoint[]> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const stats = dashboardStats.find((entry) => entry.period === period);

  if (!stats) {
    throw new Error(`No stats found for period: ${period}`);
  }

  return stats?.revenueOverTime ?? dashboardStats[0].revenueOverTime;
};

export const getRevenueChartLabel = (
  date: string,
  locale: Languages,
  period: DashboardPeriod,
) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) {
    return date;
  }
  const parsedDate = new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])),
  );
  if (period === "all") {
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(parsedDate);
  }
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(parsedDate);
};

export const getBestSellingProducts = async (
  period: DashboardPeriod,
): Promise<TopProduct[]> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const stats = dashboardStats.find((entry) => entry.period === period);

  if (!stats) {
    throw new Error(`No stats found for period: ${period}`);
  }

  const topProducts = stats?.topProducts ?? dashboardStats[0].topProducts;

  const topProductsWithDetails = await Promise.all(
    topProducts.map(async (product) => {
      try {
        const details = await getProductById(product.productId);
        return { ...product, fallbackImages: details.fallbackImages };
      } catch {
        return { ...product, fallbackImages: [] };
      }
    }),
  );

  return topProductsWithDetails;
};

export const globalOrderFilter: FilterFn<Order> = (
  row,
  _columnId,
  filterValue,
) => {
  const search = String(filterValue ?? "")
    .trim()
    .toLowerCase();
  if (!search) return true;

  const order = row.original;
  const customerName = (
    order.customer.firstName +
    " " +
    order.customer.lastName
  ).toLowerCase();
  const email = order.customer.email.toLowerCase();
  const id = order.id.toLowerCase();

  return (
    id.includes(search) ||
    customerName.includes(search) ||
    email.includes(search)
  );
};

export const createGlobalProductFilter =
  (locale: Languages): FilterFn<Product> =>
  (row, _columnId, filterValue): boolean => {
    const search = String(filterValue ?? "")
      .trim()
      .toLowerCase();
    if (!search) return true;

    const product = row.original;
    const name = product.name[locale].toLowerCase();
    const id = product.id.toLowerCase();

    return id.includes(search) || name.includes(search);
  };

export const getStatusVariantMap = (): Record<
  OrderStatus,
  "default" | "secondary" | "destructive" | "outline"
> => {
  return {
    pending: "outline",
    paid: "secondary",
    shipped: "secondary",
    completed: "default",
    cancelled: "destructive",
  };
};
