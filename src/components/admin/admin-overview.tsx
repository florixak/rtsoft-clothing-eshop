import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";
import AdminMetrics from "./admin-metrics";
import AdminPeriodFilter from "./admin-period-filter";
import BestSellers from "./best-sellers";
import RevenueChartCard from "./revenue-chart-card";

const AdminOverview = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <AdminPeriodFilter />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col gap-4 col-span-1 md:col-span-3">
          <Suspense fallback={<Skeleton className="h-36 w-full rounded-md" />}>
            <AdminMetrics />
          </Suspense>
        </div>
        <div className="col-span-1 md:col-span-2">
          <RevenueChartCard />
        </div>
        <BestSellers />
      </div>
    </section>
  );
};

export default AdminOverview;
