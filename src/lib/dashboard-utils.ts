import { dashboardMetrics } from "@/data/stats";
import type { DashboardMetrics, DashboardPeriod } from "@/types";

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
