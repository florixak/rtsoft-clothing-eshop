import { getStatusVariantMap } from "@/lib/dashboard-utils";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";

import { createOrderDetailsQueryOptions } from "@/hooks/query-options";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { SuccessOrderSummary } from "../checkout/order-summary";
import { Badge } from "../ui/badge";
import { Card, CardHeader } from "../ui/card";
import OrderActions from "./order-actions";
import OrderDetailsHeader from "./order-details-header";
import OrderInformation from "./order-information";
import OrderItems from "./order-items";
import { formatDate } from "@/lib/utils";
import type { Order } from "@/types";
import useLocale from "@/hooks/use-locale";

type OrderDetailsProps = {
  orderId: Order["id"];
  ordersListPath: "/{-$locale}/admin/orders" | "/{-$locale}/account/orders";
  includeSessionFallback?: boolean;
};

const OrderDetails = ({
  orderId,
  ordersListPath,
  includeSessionFallback = false,
}: OrderDetailsProps) => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.orderDetails,
    TRANSLATION_NAMESPACES.common,
  ]);
  const { data } = useSuspenseQuery(
    createOrderDetailsQueryOptions(orderId, { includeSessionFallback }),
  );
  const [status, setStatus] = useState(data.status);
  const order = { ...data, status };

  const locale = useLocale();

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
      toast.success(t("common:toast.orderCancelled"));
    },
    onError: (error) => {
      console.error("Failed to cancel order: ", error);
      toast.error(t("common:toast.genericError"));
    },
  });

  const handleCancel = (orderId: string) => {
    mutate(orderId);
  };

  const formattedCreatedAt = formatDate(order.createdAt, locale);
  const formattedUpdatedAt = formatDate(order.updatedAt, locale);

  return (
    <section className="flex flex-col gap-4">
      <OrderDetailsHeader orderId={order.id} ordersListPath={ordersListPath} />

      <Card className="border-muted/70">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <Badge
              variant={getStatusVariantMap()[order.status]}
              className="w-fit px-3 py-1 text-sm font-semibold"
            >
              {t("orderDetails:status." + order.status)}
            </Badge>
            <div className="grid gap-1 text-sm text-muted-foreground">
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
            ordersListPath={ordersListPath}
          />
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.75fr)_minmax(20rem,1fr)] lg:items-start">
        <OrderItems orderItems={order.items} />

        <SuccessOrderSummary showProducts={false} order={order} />
      </div>

      <OrderInformation order={order} />
    </section>
  );
};

export default OrderDetails;
