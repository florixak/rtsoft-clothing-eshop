import { orders } from "@/data";

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
