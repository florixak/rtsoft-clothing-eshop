import {
  dashboardMetrics,
  dashboardStats,
  type RevenueChartDataPoint,
} from "@/data/stats";
import type { DashboardMetrics, DashboardPeriod } from "@/types";
import type { Languages } from "./i18n";

export const getDashboardMetrics = async (
  period: DashboardPeriod,
): Promise<DashboardMetrics> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const metric = dashboardMetrics.find((metric) => metric.period === period);

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

  return stats?.revenueOverTime ?? dashboardStats[0].revenueOverTime;
};

export const getRevenueChartLabel = (
  date: string,
  locale: Languages,
  period: DashboardPeriod,
) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  if (period === "all") {
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
  }).format(parsedDate);
};
