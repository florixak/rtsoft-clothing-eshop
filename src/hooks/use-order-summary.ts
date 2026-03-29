import { FREE_SHIPPING_THRESHOLD } from "@/constants";

type UseOrderSummaryParams = {
  subtotal: number;
  shipping: number;
  calculateTax?: boolean;
};

const useOrderSummary = ({
  subtotal,
  shipping,
  calculateTax = true,
}: UseOrderSummaryParams) => {
  const isEligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isEligibleForFreeShipping ? 0 : shipping || 0;
  const tax = calculateTax
    ? Math.round((subtotal + shippingCost) * 0.21 * 100) / 100
    : 0;
  const total = subtotal + shippingCost + tax;
  return {
    isEligibleForFreeShipping,
    shippingCost,
    tax,
    total,
  };
};

export default useOrderSummary;
