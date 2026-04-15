import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

import { createOrderDetailsQueryOptions } from "@/hooks/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SuccessOrderSummary } from "../checkout/order-summary";
import OrderDetailCards, {
  type OrderDetailCardsModel,
} from "./order-detail-cards";
import OrderDetailsHeader from "./order-details-header";
import OrderItems from "./order-items";

const OrderDetails = () => {
  const { t, i18n } = useTranslation([
    TRANSLATION_NAMESPACES.orderDetails,
    TRANSLATION_NAMESPACES.checkout,
    TRANSLATION_NAMESPACES.orderConfirmation,
  ]);
  const { orderId } = useParams({ from: "/{-$locale}/admin/orders/$orderId" });
  const { data: order } = useSuspenseQuery(
    createOrderDetailsQueryOptions(orderId),
  );
  const locale = i18n.resolvedLanguage === "cs" ? "cs" : "en";

  const detailsModel: OrderDetailCardsModel = {
    shippingAddress: {
      name: `${order.customer.firstName} ${order.customer.lastName}`,
      lines: [
        order.customer.email || "-",
        order.customer.phone || "-",
        order.address.street || "-",
        `${order.address.postalCode} ${order.address.city}`.trim() || "-",
        order.address.country || "-",
      ],
      footer: (
        <p className="text-sm text-muted-foreground">
          {t("checkout:deliveryInfo.fields.street.label")},{" "}
          {t("checkout:deliveryInfo.fields.city.label")},{" "}
          {t("checkout:deliveryInfo.fields.postalCode.label")}
        </p>
      ),
    },
    shippingMethod: {
      name: order.shippingMethod.name[locale],
      description: order.shippingMethod.description[locale],
      priceLabel:
        order.shippingMethod.price === 0
          ? t("checkout:shippingMethod.free")
          : formatPrice(order.shippingMethod.price, locale),
      footer: (
        <p className="text-sm text-muted-foreground">
          {t("checkout:review.includesTrackingAndInsurance")}
        </p>
      ),
    },
    paymentMethod: {
      name: order.paymentMethod.name[locale],
      footer: undefined,
    },
  };

  return (
    <section className="flex flex-col gap-8">
      <OrderDetailsHeader orderId={order.id} />

      <OrderItems orderItems={order.items} />

      <OrderDetailCards
        model={detailsModel}
        labels={{
          shippingAddress: t("checkout:review.shippingAddress"),
          shippingMethod: t("checkout:review.shippingMethod"),
          paymentMethod: t("checkout:review.paymentMethod"),
          edit: t("checkout:actions.edit"),
        }}
      />

      <SuccessOrderSummary showProducts={false} order={order} />
    </section>
  );
};

export default OrderDetails;
