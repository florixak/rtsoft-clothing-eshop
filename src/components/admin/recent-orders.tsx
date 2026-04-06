import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/card";
import RecentOrdersTable from "./recent-orders-table";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

const RecentOrders = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {t("overview.recentTransactions.title")}
        </h2>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <RecentOrdersTable />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
