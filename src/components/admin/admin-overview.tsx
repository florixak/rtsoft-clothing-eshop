import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import AdminMetrics from "./admin-metrics";
import AdminPeriodFilter from "./admin-period-filter";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

const AdminOverview = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <AdminPeriodFilter />
      </div>
      <Suspense fallback={<Skeleton className="h-36 w-full rounded-md" />}>
        <AdminMetrics />
      </Suspense>
    </section>
  );
};

export default AdminOverview;
