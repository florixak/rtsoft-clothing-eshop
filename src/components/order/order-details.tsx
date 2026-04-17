import { getStatusVariantMap } from "@/lib/dashboard-utils";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";

import { createOrderDetailsQueryOptions } from "@/hooks/query-options";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SuccessOrderSummary } from "../checkout/order-summary";
import { Badge } from "../ui/badge";
import { Card, CardHeader } from "../ui/card";
import OrderActions from "./order-actions";
import OrderDetailsHeader from "./order-details-header";
import OrderInformation from "./order-information";
import OrderItems from "./order-items";
import { formatDate } from "@/lib/utils";

const OrderDetails = () => {
  const { t, i18n } = useTranslation([TRANSLATION_NAMESPACES.orderDetails]);
  const { orderId } = useParams({ from: "/{-$locale}/admin/orders/$orderId" });
  const { data } = useSuspenseQuery(createOrderDetailsQueryOptions(orderId));
  const [status, setStatus] = useState(data.status);
  const order = { ...data, status };

  const locale = i18n.resolvedLanguage === "cs" ? "cs" : "en";

  const { mutate, isPending } = useMutation({
    mutationFn: (orderId: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(orderId);
        }, 1000);
      });
    },
    onSuccess: (data) => {
      console.log("Order cancelled: ", data);
      setStatus("cancelled");
    },
    onError: (error) => {
      console.error("Failed to cancel order: ", error);
    },
  });

  const handleCancel = (orderId: string) => {
    mutate(orderId);
  };

  const formattedCreatedAt = formatDate(order.createdAt, locale);
  const formattedUpdatedAt = formatDate(order.updatedAt, locale);

  return (
    <section className="flex flex-col gap-8 xl:gap-10">
      <OrderDetailsHeader orderId={order.id} />

      <Card className="border-muted/70">
        <CardHeader className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <Badge
              variant={getStatusVariantMap()[order.status]}
              className="w-fit px-3 py-1 text-sm font-semibold"
            >
              {t("orderDetails:status." + order.status)}
            </Badge>
            <div className="grid gap-1.5 text-sm text-muted-foreground">
              <p>
                {t("orderDetails:meta.placedAt")}: {formattedCreatedAt}
              </p>
              <p>
                {t("orderDetails:meta.lastUpdated")}: {formattedUpdatedAt}
              </p>
            </div>
          </div>

          <OrderActions
            order={order}
            onCancel={handleCancel}
            isPending={isPending}
          />
        </CardHeader>
      </Card>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.75fr)_minmax(20rem,1fr)] lg:items-start">
        <div className="flex flex-col gap-8">
          <OrderItems orderItems={order.items} />
        </div>

        <div className="lg:sticky lg:top-24">
          <SuccessOrderSummary showProducts={false} order={order} />
        </div>
      </div>

      <OrderInformation order={order} />
    </section>
  );
};

export default OrderDetails;
