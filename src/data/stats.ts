import type {
  DashboardMetrics,
  DashboardPeriod,
  DashboardStats,
} from "../types";

export type RevenueChartDataPoint = DashboardStats["revenueOverTime"][number];

export const dashboardMetrics: DashboardMetrics[] = [
  {
    period: "day",
    totalOrders: 3,
    totalRevenue: 5824,
    returningCustomerRate: 33.3,
  },
  {
    period: "week",
    totalOrders: 18,
    totalRevenue: 25824,
    returningCustomerRate: 27.8,
  },
  {
    period: "month",
    totalOrders: 74,
    totalRevenue: 138500,
    returningCustomerRate: 29.7,
  },
  {
    period: "all",
    totalOrders: 312,
    totalRevenue: 589340,
    returningCustomerRate: 31.4,
  },
];

export const dashboardPeriods: DashboardPeriod[] = [
  "day",
  "week",
  "month",
  "all",
] as const;

export const dashboardStats: DashboardStats[] = [
  {
    period: "day",
    totalOrders: 3,
    totalRevenue: 5824,
    topProducts: [
      {
        productId: "prod-1",
        name: { cs: "Základní bavlněné tričko", en: "Basic Cotton Tee" },
        sold: 5,
        fallbackImages: [],
      },
      {
        productId: "prod-3",
        name: { cs: "Zipová mikina", en: "Zip Hoodie" },
        sold: 2,
        fallbackImages: [],
      },
      {
        productId: "prod-7",
        name: { cs: "Zimní péřová bunda", en: "Winter Puffer Jacket" },
        sold: 1,
        fallbackImages: [],
      },
    ],
    revenueOverTime: [
      { date: "2026-03-10", revenue: 1200 },
      { date: "2026-03-11", revenue: 1500 },
      { date: "2026-03-12", revenue: 2000 },
      { date: "2026-03-13", revenue: 1124 },
    ],
  },
  {
    period: "week",
    totalOrders: 18,
    totalRevenue: 25824,
    topProducts: [
      {
        productId: "prod-7",
        name: { cs: "Zimní péřová bunda", en: "Winter Puffer Jacket" },
        sold: 12,
        fallbackImages: [],
      },
      {
        productId: "prod-4",
        name: { cs: "Oversized fleece mikina", en: "Oversized Fleece Hoodie" },
        sold: 9,
        fallbackImages: [],
      },
      {
        productId: "prod-1",
        name: { cs: "Základní bavlněné tričko", en: "Basic Cotton Tee" },
        sold: 8,
        fallbackImages: [],
      },
    ],
    revenueOverTime: [
      { date: "2026-03-07", revenue: 5000 },
      { date: "2026-03-08", revenue: 7000 },
      { date: "2026-03-09", revenue: 8000 },
      { date: "2026-03-10", revenue: 1200 },
      { date: "2026-03-11", revenue: 1500 },
      { date: "2026-03-12", revenue: 2000 },
      { date: "2026-03-13", revenue: 1124 },
    ],
  },
  {
    period: "month",
    totalOrders: 74,
    totalRevenue: 138500,
    topProducts: [
      {
        productId: "prod-7",
        name: { cs: "Zimní péřová bunda", en: "Winter Puffer Jacket" },
        sold: 41,
        fallbackImages: [],
      },
      {
        productId: "prod-3",
        name: { cs: "Zipová mikina", en: "Zip Hoodie" },
        sold: 33,
        fallbackImages: [],
      },
      {
        productId: "prod-5",
        name: { cs: "Slim fit džíny", en: "Slim Fit Jeans" },
        sold: 28,
        fallbackImages: [],
      },
    ],
    revenueOverTime: [
      { date: "2026-02-01", revenue: 4000 },
      { date: "2026-02-08", revenue: 6000 },
      { date: "2026-02-15", revenue: 9000 },
      { date: "2026-02-22", revenue: 15000 },
      { date: "2026-03-01", revenue: 20000 },
      { date: "2026-03-08", revenue: 30000 },
      { date: "2026-03-13", revenue: 54500 },
    ],
  },
  {
    period: "all",
    totalOrders: 312,
    totalRevenue: 589340,
    topProducts: [
      {
        productId: "prod-1",
        name: { cs: "Základní bavlněné tričko", en: "Basic Cotton Tee" },
        sold: 180,
        fallbackImages: [],
      },
      {
        productId: "prod-7",
        name: { cs: "Zimní péřová bunda", en: "Winter Puffer Jacket" },
        sold: 95,
        fallbackImages: [],
      },
      {
        productId: "prod-3",
        name: { cs: "Zipová mikina", en: "Zip Hoodie" },
        sold: 88,
        fallbackImages: [],
      },
    ],
    revenueOverTime: [
      { date: "2024-03-31", revenue: 32000 },
      { date: "2024-06-30", revenue: 41000 },
      { date: "2024-09-30", revenue: 48000 },
      { date: "2024-12-31", revenue: 56000 },
      { date: "2025-03-31", revenue: 62000 },
      { date: "2025-06-30", revenue: 69000 },
      { date: "2025-09-30", revenue: 74000 },
      { date: "2025-12-31", revenue: 81000 },
      { date: "2026-03-13", revenue: 126340 },
    ],
  },
];
