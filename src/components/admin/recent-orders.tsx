import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/card";
import RecentOrdersTable from "./recent-orders-table";

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
        <RecentOrdersTable />
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
