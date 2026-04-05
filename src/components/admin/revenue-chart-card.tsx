import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import RevenueChart from "./revenue-chart";
import { useTranslation } from "react-i18next";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";

const RevenueChartCard = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {t("overview.revenueAnalytics.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("overview.revenueAnalytics.subtitle")}
        </p>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="h-64 w-full rounded-md" />}>
          <RevenueChart />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default RevenueChartCard;
