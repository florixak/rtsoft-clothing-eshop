import { Suspense } from "react";

import UserOrdersTable from "@/components/user/orders/user-orders-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";

const UserOrders = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.account);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">{t("orders.title")}</h2>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <UserOrdersTable />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default UserOrders;
