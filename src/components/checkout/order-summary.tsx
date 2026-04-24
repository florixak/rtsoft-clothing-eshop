import {
  FREE_SHIPPING_THRESHOLD,
  MAX_CART_ITEMS_TO_SHOW_IN_ORDER_SUMMARY,
} from "@/constants";
import { calculateOrderSummary } from "@/lib/checkout-utils";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { clamp, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import type { Order } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import CartItem from "../cart/cart-item";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import useLocale from "@/hooks/use-locale";

type OrderSummaryProps = {
  data?: {
    shipping?: number;
  };
  showProducts?: boolean;
  disableCheckout?: boolean;
  isCheckout?: boolean;
};

export const OrderSummary = ({
  data: summary = { shipping: 0 },
  showProducts = true,
  disableCheckout = false,
  isCheckout = false,
}: OrderSummaryProps) => {
  const {
    subtotal,
    itemsCount,
    cart: { items },
  } = useCartStore();
  const navigate = useNavigate();
  const { t } = useTranslation(TRANSLATION_NAMESPACES.cart);
  const locale = useLocale();
  const { shipping } = summary;
  const subtotalValue = subtotal();
  const {
    isEligibleForFreeShipping,
    shippingCost,
    tax: taxValue,
    total: totalValue,
  } = calculateOrderSummary({
    subtotal: subtotalValue,
    shipping: shipping || 0,
    calculateTax: isCheckout,
  });

  const canProceedToCheckout =
    subtotalValue > 0 && itemsCount() > 0 && !disableCheckout;

  const tax = !isCheckout ? 0 : taxValue;

  const progressToFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotalValue,
  );

  const lineWidth = clamp(
    0,
    100,
    (subtotalValue / FREE_SHIPPING_THRESHOLD) * 100,
  );

  const slicedItems = items.slice(0, MAX_CART_ITEMS_TO_SHOW_IN_ORDER_SUMMARY);

  const handleCheckout = () => {
    if (canProceedToCheckout) {
      navigate({ to: "/{-$locale}/checkout" });
    }
  };

  return (
    <Card className="md:max-w-sm w-full px-8 h-fit">
      <h2 className="text-xl font-heading font-bold">{t("summary.title")}</h2>
      {showProducts && items.length > 0 && (
        <>
          <div className="flex flex-col gap-2 my-2">
            {slicedItems.map((item) => (
              <Suspense
                key={item.id}
                fallback={<Skeleton className="h-16 w-full" />}
              >
                <CartItem item={item} compact />
              </Suspense>
            ))}
            {items.length > MAX_CART_ITEMS_TO_SHOW_IN_ORDER_SUMMARY && (
              <p className="text-sm text-muted-foreground">
                {t("summary.andMore", {
                  count: items.length - MAX_CART_ITEMS_TO_SHOW_IN_ORDER_SUMMARY,
                })}
              </p>
            )}
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
            <td className="text-right">{formatPrice(subtotalValue, locale)}</td>
          </tr>
          <tr>
            <th
              scope="row"
              className="text-muted-foreground py-2 text-left font-normal"
            >
              {t("summary.shipping")}
            </th>
            <td className="text-right">
              {isEligibleForFreeShipping
                ? t("summary.freeShipping")
                : shippingCost > 0
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
              {tax > 0 ? formatPrice(tax, locale) : "-"}
            </td>
          </tr>
          {!isCheckout && (
            <tr>
              <td colSpan={2} className="text-xs text-muted-foreground py-2">
                {t("summary.shippingTaxNote")}
              </td>
            </tr>
          )}
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
              {formatPrice(totalValue, locale)}
            </td>
          </tr>
        </tbody>
      </table>
      {!isCheckout && (
        <>
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
              nativeButton={false}
              render={
                <Link to="/{-$locale}">{t("actions.continueShopping")}</Link>
              }
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
        </>
      )}
    </Card>
  );
};

export const SuccessOrderSummary = ({
  order,
  showProducts = true,
}: {
  order: Order;
  showProducts?: boolean;
}) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.orderConfirmation);
  const locale = useLocale();
  const {
    total,
    subtotal: subtotalValue,
    shippingCost,
    tax,
  } = order.priceDetails;

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">{t("summary.title")}</h3>
      </CardHeader>
      <CardContent
        className={
          showProducts
            ? "flex flex-col items-start gap-8 md:grid md:grid-cols-2"
            : "flex flex-col items-start gap-6"
        }
      >
        {showProducts && (
          <ul className="flex min-w-0 flex-col gap-4 w-full">
            {order.items.map((item) => (
              <Suspense
                fallback={<Skeleton className="h-16 w-full" />}
                key={`${item.productId}-${item.selectionSnapshot.size}-${item.selectionSnapshot.color}`}
              >
                <CartItem
                  item={{
                    id: item.productId,
                    ...item,
                  }}
                  compact
                />
              </Suspense>
            ))}
          </ul>
        )}

        <table
          className={
            showProducts ? "w-full text-base md:max-w-sm" : "w-full text-base"
          }
        >
          <tbody>
            <tr>
              <th
                scope="row"
                className="text-muted-foreground py-2 text-left font-normal"
              >
                {t("summary.subtotal")}
              </th>
              <td className="text-right">
                {formatPrice(subtotalValue, locale)}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="text-muted-foreground py-2 text-left font-normal"
              >
                {t("summary.shipping")}
              </th>
              <td className="text-right">
                {formatPrice(shippingCost, locale)}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="text-muted-foreground py-2 text-left font-normal"
              >
                {t("summary.tax")}
              </th>
              <td className="text-right">{formatPrice(tax, locale)}</td>
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
      </CardContent>
    </Card>
  );
};
