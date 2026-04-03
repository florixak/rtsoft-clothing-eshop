import type { Order } from "@/types";

const ORDERS_STORAGE_KEY = "checkout-orders";

type StoredOrders = Record<string, Order>;

const readOrders = (): StoredOrders => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    return JSON.parse(sessionStorage.getItem(ORDERS_STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
};

const writeOrders = (orders: StoredOrders) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    sessionStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch {
    console.warn("Failed to persist order to sessionStorage");
  }
};

export const saveOrder = (order: Order) => {
  const orders = readOrders();
  orders[order.id] = order;
  writeOrders(orders);
};

export const getCheckoutOrder = async (orderId: Order["id"]) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
  return readOrders()[orderId] ?? null;
};
