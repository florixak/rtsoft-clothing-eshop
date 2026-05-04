import { orders } from "@/data";
import type { Order } from "@/types";
import { NotFoundError, ERROR_CODES } from "./errors";
import { delayFor } from "./network";

export const getOrderById = async (orderId: string) => {
  await delayFor("orders");

  const order = orders.find((order) => order.id === orderId);

  if (!order) {
    throw new NotFoundError(ERROR_CODES.orderNotFound);
  }

  return order;
};

type GetOrdersFilter = {
  limit?: number;
  userId?: string;
};

export const getOrders = async (filter: GetOrdersFilter): Promise<Order[]> => {
  await delayFor("ordersList");

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
