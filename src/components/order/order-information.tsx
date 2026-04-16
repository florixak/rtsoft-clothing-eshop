import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Order } from "@/types";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatPrice } from "@/lib/utils";

type OrderInformationProps = {
  order: Order;
};

const OrderInformation = ({ order }: OrderInformationProps) => {
  const { t, i18n } = useTranslation([
    TRANSLATION_NAMESPACES.orderDetails,
    TRANSLATION_NAMESPACES.checkout,
  ]);
  const { customer, address, shippingMethod, paymentMethod } = order;
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";
  return (
    <Card className="border-muted/70">
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {t("checkout:review.shippingAddress")} &{" "}
          {t("checkout:review.shippingMethod")}
        </h3>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("checkout:review.shippingAddress")}
          </p>
          <div className="space-y-1 text-sm">
            <p className="font-medium">
              {customer.firstName} {customer.lastName}
            </p>
            <p className="text-muted-foreground">{customer.email || "-"}</p>
            <p className="text-muted-foreground">{customer.phone || "-"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("checkout:deliveryInfo.fields.street.label")}
          </p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>{address.street || "-"}</p>
            <p>{`${address.postalCode} ${address.city}`.trim() || "-"}</p>
            <p>{address.country || "-"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("checkout:review.shippingMethod")}
          </p>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{shippingMethod.name[locale]}</p>
            <p className="text-muted-foreground">
              {shippingMethod.description[locale] || "-"}
            </p>
            <p>
              {shippingMethod.price === 0
                ? t("checkout:shippingMethod.free")
                : formatPrice(shippingMethod.price, locale)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("checkout:review.paymentMethod")}
          </p>
          <p className="text-sm font-medium">{paymentMethod.name[locale]}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderInformation;
