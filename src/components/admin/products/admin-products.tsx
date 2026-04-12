import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";

import { Suspense } from "react";
import AdminProductsTable from "./admin-products-table";

const AdminProducts = () => {
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
          <AdminProductsTable />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default AdminProducts;
