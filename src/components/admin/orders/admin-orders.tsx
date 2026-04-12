import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import AdminOrdersTable from "./admin-orders-table";
import { Suspense } from "react";

const AdminOrders = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">{t("orders.title")}</h2>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <AdminOrdersTable />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default AdminOrders;
