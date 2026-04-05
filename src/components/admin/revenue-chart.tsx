import { dashboardPeriods } from "@/data/stats";
import { createRevenueChartDataQueryOptions } from "@/hooks/query-options";
import { getRevenueChartLabel } from "@/lib/dashboard-utils";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import type { DashboardPeriod } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";

const chartConfig = {
  revenue: {
    label: "overview.revenueAnalytics.revenue",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

const RevenueChart = () => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.admin);
  const { period } = useSearch({ from: "/{-$locale}/admin/" });
  const { data } = useSuspenseQuery(createRevenueChartDataQueryOptions(period));
  const selectedPeriod: DashboardPeriod = dashboardPeriods.includes(
    period as DashboardPeriod,
  )
    ? (period as DashboardPeriod)
    : "all";
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) =>
            getRevenueChartLabel(String(value), locale, selectedPeriod)
          }
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => (
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-muted-foreground">
                    {t(chartConfig.revenue.label)}
                  </span>
                  <span className="font-semibold">
                    {formatPrice(Number(value), locale)}
                  </span>
                </div>
              )}
            />
          }
          labelFormatter={(label) =>
            getRevenueChartLabel(String(label), locale, selectedPeriod)
          }
        />
        <Bar dataKey="revenue" radius={6} fill="var(--color-revenue)" />
      </BarChart>
    </ChartContainer>
  );
};

export default RevenueChart;
