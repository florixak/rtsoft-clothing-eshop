import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import AdminMetrics from "./admin-metrics";
import AdminPeriodFilter from "./admin-period-filter";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import RevenueChart from "./revenue-chart";

const AdminOverview = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <AdminPeriodFilter />
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<Skeleton className="h-36 w-full rounded-md" />}>
          <AdminMetrics />
        </Suspense>
      </div>

      <div className="space-y-2 rounded-xl border bg-card p-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">
            {t("overview.revenueAnalytics.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("overview.revenueAnalytics.subtitle")}
          </p>
        </div>
        <Suspense fallback={<Skeleton className="h-64 w-full rounded-md" />}>
          <RevenueChart />
        </Suspense>
      </div>
    </section>
  );
};

export default AdminOverview;
