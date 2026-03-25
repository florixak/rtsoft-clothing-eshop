import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FREE_SHIPPING_THRESHOLD } from "@/constants";
import CartItem from "./cart/cart-item";
import { Separator } from "./ui/separator";

type OrderSummaryProps = {
  data?: {
    tax: number;
    shipping: number;
  };
  showProducts?: boolean;
};

const OrderSummary = ({
  data: summary = { tax: 0, shipping: 0 },
  showProducts = true,
}: OrderSummaryProps) => {
  const {
    subtotal,
    itemsCount,
    cart: { items },
  } = useCartStore();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.cart);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";
  const { tax, shipping } = summary;

  const canProceedToCheckout = subtotal() > 0 && itemsCount() > 0;
  const isEligibleForFreeShipping = subtotal() >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isEligibleForFreeShipping ? 0 : shipping;
  const total = subtotal() + tax + shippingCost;

  const progressToFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal(),
  );
  const lineWidth = (subtotal() / FREE_SHIPPING_THRESHOLD) * 100;

  const handleCheckout = () => {
    if (canProceedToCheckout) {
      navigate({ to: "/{-$locale}/checkout" });
    }
  };

  return (
    <Card className="w-full md:w-1/3 px-8 h-fit">
      <h2 className="text-xl font-heading font-bold">Order Summary</h2>
      {showProducts && items.length > 0 && (
        <>
          <div className="flex flex-col gap-2 my-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} compact />
            ))}
          </div>
          <Separator />
        </>
      )}
      <table className="w-full text-base">
        <tbody>
          <tr>
            <th
              scope="row"
              className="text-muted-foreground py-2 text-left font-normal"
            >
              {t("summary.subtotal")}
            </th>
            <td className="text-right">{formatPrice(subtotal(), locale)}</td>
          </tr>
          <tr>
            <th
              scope="row"
              className="text-muted-foreground py-2 text-left font-normal"
            >
              {t("summary.shipping")}
            </th>
            <td className="text-right">
              {shippingCost !== undefined
                ? formatPrice(shippingCost, locale)
                : "-"}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="text-muted-foreground py-2 text-left font-normal"
            >
              {t("summary.tax")}
            </th>
            <td className="text-right">
              {tax ? formatPrice(tax, locale) : "-"}
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="text-xs text-muted-foreground py-2">
              {t("summary.shippingTaxNote")}
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="py-2">
              <Separator />
            </td>
          </tr>

          <tr>
            <th
              scope="row"
              className="text-muted-foreground py-2 text-left font-bold"
            >
              {t("summary.total")}
            </th>
            <td className="text-right font-bold">
              {formatPrice(total, locale)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-col gap-2">
        <Button
          className="w-full"
          disabled={!canProceedToCheckout}
          onClick={handleCheckout}
        >
          <Lock size={16} />
          {t("actions.proceedToCheckout")}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          render={<Link to="/{-$locale}">{t("actions.continueShopping")}</Link>}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="w-full bg-muted rounded-full overflow-hidden">
          <div
            style={{ width: `${lineWidth}%` }}
            className={`bg-primary h-2 rounded-full`}
          />
        </div>

        <p className="text-sm text-muted-foreground text-center">
          {progressToFreeShipping > 0
            ? t("summary.freeShippingNote", {
                amount: formatPrice(progressToFreeShipping, locale),
              })
            : t("summary.freeShippingEligible")}
        </p>
      </div>
    </Card>
  );
};

export default OrderSummary;
