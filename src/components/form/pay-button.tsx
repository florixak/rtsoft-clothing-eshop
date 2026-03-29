import { shippingMethods } from "@/data";
import { useFormContext } from "@/hooks/form-context";
import useOrderSummary from "@/hooks/use-order-summary";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import type { FormValues } from "@/lib/validators";
import { useCartStore } from "@/stores/cart-store";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

const PayButton = () => {
  const form = useFormContext();
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const subtotal = useCartStore((state) => state.subtotal);
  const values = form.state.values as unknown as FormValues;
  const selectedShippingMethod = values.shipping.shippingMethod;

  const shippingCost =
    shippingMethods.find((method) => method.id === selectedShippingMethod)
      ?.price || 0;

  const { total } = useOrderSummary({
    subtotal: subtotal(),
    shipping: shippingCost,
    calculateTax: true,
  });

  const locale = i18n.resolvedLanguage === "cs" ? "cs" : "en";
  const formattedAmount = formatPrice(total, locale);

  return (
    <Button className="w-full">
      {t("paymentMethod.secureForm.payButton", { amount: formattedAmount })}
    </Button>
  );
};

export default PayButton;
