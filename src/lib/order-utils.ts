import { orders } from "@/data";
import type { Order } from "@/types";

export const getOrderById = async (orderId: string) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

  const order = orders.find((order) => order.id === orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

type GetOrdersFilter = {
  limit?: number;
  userId?: string;
};

export const getOrders = async (filter: GetOrdersFilter): Promise<Order[]> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const sortedOrders = orders
    .filter((order) => (filter.userId ? order.userId === filter.userId : true))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return typeof filter.limit === "number"
    ? sortedOrders.slice(0, filter.limit)
    : sortedOrders;
};
