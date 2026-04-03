import { FREE_SHIPPING_THRESHOLD } from "@/constants";

export const handlePaymentSimulation = async (): Promise<void> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

export const createOrderSimulation = async (): Promise<string> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });

  return `ord-${Date.now()}`;
};

type UseOrderSummaryParams = {
  subtotal: number;
  shipping: number;
  calculateTax?: boolean;
};

export const calculateOrderSummary = ({
  subtotal,
  shipping,
  calculateTax = true,
}: UseOrderSummaryParams) => {
  const isEligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isEligibleForFreeShipping ? 0 : shipping || 0;
  const tax = calculateTax
    ? Math.round((subtotal + shippingCost) * 0.21 * 100) / 100
    : 0;
  const total = Math.round((subtotal + shippingCost + tax) * 100) / 100;
  return {
    isEligibleForFreeShipping,
    shippingCost,
    tax,
    total,
  };
};
