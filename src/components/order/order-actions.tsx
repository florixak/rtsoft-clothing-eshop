import type { Order } from "@/types";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

type OrderActionsProps = {
  order: Order;
  onCancel?: (orderId: string) => void;
  isPending?: boolean;
  ordersListPath: "/{-$locale}/admin/orders" | "/{-$locale}/account/orders";
};

const cancellableStatuses: Order["status"][] = ["pending", "paid"];

const OrderActions = ({
  order,
  onCancel,
  isPending,
  ordersListPath,
}: OrderActionsProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.orderDetails);
  const canCancel = cancellableStatuses.includes(order.status);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        render={<Link to={ordersListPath}>{t("actions.backToOrders")}</Link>}
      />

      {canCancel ? (
        <Button
          variant="destructive"
          onClick={() => onCancel?.(order.id)}
          disabled={!onCancel || isPending}
        >
          {isPending ? t("actions.cancelPending") : t("actions.cancelOrder")}
        </Button>
      ) : null}
    </div>
  );
};

export default OrderActions;
