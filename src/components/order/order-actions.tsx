import type { Order } from "@/types";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

type OrderActionsProps = {
  order: Order;
  onCancel?: (orderId: string) => void;
};

const cancellableStatuses: Order["status"][] = ["pending", "paid"];

const OrderActions = ({ order, onCancel }: OrderActionsProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.orderDetails);
  const canCancel = cancellableStatuses.includes(order.status);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        render={
          <Link to="/{-$locale}/admin/orders">{t("actions.backToOrders")}</Link>
        }
      />

      {canCancel ? (
        <Button
          variant="destructive"
          onClick={() => onCancel?.(order.id)}
          disabled={!onCancel}
        >
          {t("actions.cancelOrder")}
        </Button>
      ) : null}
    </div>
  );
};

export default OrderActions;
