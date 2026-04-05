import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/card";
import BestSellerItems from "./best-seller-items";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

const BestSellers = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {t("overview.bestSellers.title")}
        </h2>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="h-64 w-full rounded-md" />}>
          <BestSellerItems />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default BestSellers;
