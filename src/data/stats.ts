import type { DashboardStats } from "../types";

export const dashboardStats: DashboardStats[] = [
  {
    period: "day",
    totalOrders: 3,
    totalRevenue: 5824,
    topProducts: [
      { productId: "prod-1", name: "Basic Cotton Tee – White",       sold: 5 },
      { productId: "prod-3", name: "Zip Hoodie – Grey",              sold: 2 },
      { productId: "prod-7", name: "Winter Puffer Jacket – Black",   sold: 1 },
    ],
  },
  {
    period: "week",
    totalOrders: 18,
    totalRevenue: 34210,
    topProducts: [
      { productId: "prod-7", name: "Winter Puffer Jacket – Black",   sold: 12 },
      { productId: "prod-4", name: "Oversized Fleece Hoodie – Black", sold: 9 },
      { productId: "prod-1", name: "Basic Cotton Tee – White",       sold: 8 },
    ],
  },
  {
    period: "month",
    totalOrders: 74,
    totalRevenue: 138500,
    topProducts: [
      { productId: "prod-7", name: "Winter Puffer Jacket – Black",   sold: 41 },
      { productId: "prod-3", name: "Zip Hoodie – Grey",              sold: 33 },
      { productId: "prod-5", name: "Slim Fit Jeans – Blue",          sold: 28 },
    ],
  },
  {
    period: "all",
    totalOrders: 312,
    totalRevenue: 589340,
    topProducts: [
      { productId: "prod-1", name: "Basic Cotton Tee – White",       sold: 180 },
      { productId: "prod-7", name: "Winter Puffer Jacket – Black",   sold: 95 },
      { productId: "prod-3", name: "Zip Hoodie – Grey",              sold: 88 },
    ],
  },
];
