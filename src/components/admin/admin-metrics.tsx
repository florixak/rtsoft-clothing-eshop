import { METRIC_CARDS } from "@/constants";
import { createMetricsQueryOptions } from "@/hooks/query-options";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import MetricCard from "./metric-card";
import { useTranslation } from "react-i18next";
import type { DashboardMetricsKey } from "@/types";
import useLocale from "@/hooks/use-locale";

const AdminMetrics = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);
  const locale = useLocale();
  const { period: selectedPeriod } = useSearch({ from: "/{-$locale}/admin/" });

  const { data: metrics } = useSuspenseQuery(
    createMetricsQueryOptions(selectedPeriod),
  );
  const formattedMetrics: Record<DashboardMetricsKey, string> = {
    totalRevenue: formatPrice(metrics.totalRevenue, locale),
    totalOrders: metrics.totalOrders.toString(),
    averageOrderValue: formatPrice(
      metrics.totalOrders > 0 ? metrics.totalRevenue / metrics.totalOrders : 0,
      locale,
    ),
    returningCustomerRate: `${metrics.returningCustomerRate.toFixed(1)}%`,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {METRIC_CARDS.map((metricCard) => (
        <MetricCard
          key={metricCard.key}
          title={t(`overview.stats.${metricCard.key}`)}
          value={formattedMetrics[metricCard.key]}
          evolution_percentage={metricCard.evolution}
          icon={metricCard.icon}
        />
      ))}
    </div>
  );
};

export default AdminMetrics;
