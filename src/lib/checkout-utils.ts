import { FREE_SHIPPING_THRESHOLD } from "@/constants";
import type { FormValues } from "./validators";
import type { CartItem, Order, OrderItem } from "@/types";
import { paymentMethods, shippingMethods } from "@/data/shipping";
import { getProductById } from "./product-utils";
import type { Languages } from "./i18n";
import { saveOrder } from "./order-storage";
import { getCurrentUserId } from "./auth";

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

export const handleCreateOrder = async (
  values: FormValues,
  cartItems: CartItem[],
  locale: Languages,
  subtotal: number,
) => {
  const orderId = await createOrderSimulation();

  const orderItems: OrderItem[] = await Promise.all(
    cartItems.map(async (item) => {
      const product = await getProductById(item.productId);
      return {
        productId: item.productId,
        selectionSnapshot: item.selectionSnapshot,
        quantity: item.quantity,
        priceSnapshot: item.priceSnapshot,
        nameSnapshot: product.name[locale],
      };
    }),
  );

  const shippingMethod = shippingMethods.find(
    (method) => method.id === values.shipping.shippingMethod,
  )!;
  const paymentMethod = paymentMethods.find(
    (method) => method.id === values.payment.paymentMethod,
  )!;

  const { shippingCost, tax } = calculateOrderSummary({
    subtotal,
    shipping: shippingMethod.price,
    calculateTax: true,
  });

  const normalizedPhone = values.shipping.phone
    ? values.shipping.phone.replace(/\D/g, "")
    : undefined;

  const normalizedShipping = {
    firstName: values.shipping.firstName.trim(),
    lastName: values.shipping.lastName.trim(),
    email: values.shipping.email.trim(),
    phone: normalizedPhone,
    streetAddress: values.shipping.streetAddress.trim(),
    city: values.shipping.city.trim(),
    postalCode: values.shipping.postalCode.trim(),
    country: values.shipping.country.trim(),
    useDifferentShippingAddress: values.shipping.useDifferentShippingAddress,
    differentShippingAddress: {
      streetAddress:
        values.shipping.differentShippingAddress.streetAddress.trim(),
      city: values.shipping.differentShippingAddress.city.trim(),
      postalCode: values.shipping.differentShippingAddress.postalCode.trim(),
      country: values.shipping.differentShippingAddress.country.trim(),
    },
  };

  const shippingAddress = normalizedShipping.useDifferentShippingAddress
    ? normalizedShipping.differentShippingAddress
    : {
        streetAddress: normalizedShipping.streetAddress,
        city: normalizedShipping.city,
        postalCode: normalizedShipping.postalCode,
        country: normalizedShipping.country,
      };

  const order: Order = {
    id: orderId,
    userId: getCurrentUserId(),
    items: orderItems,
    customer: {
      firstName: normalizedShipping.firstName,
      lastName: normalizedShipping.lastName,
      email: normalizedShipping.email,
      phone: normalizedShipping.phone || undefined,
    },
    address: {
      street: shippingAddress.streetAddress,
      city: shippingAddress.city,
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country,
    },
    shippingMethod: shippingMethod,
    paymentMethod: paymentMethod,
    priceDetails: {
      subtotal: subtotal,
      shippingCost,
      tax: tax,
      total: subtotal + shippingCost + tax,
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveOrder(order);
  return order;
};
