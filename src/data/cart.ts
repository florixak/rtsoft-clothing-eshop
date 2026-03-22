import type { Cart } from "../types";

export const mockCart: Cart = {
  sessionId: "sess-abc123",
  userId: null,
  items: [
    {
      id: "ci-1",
      productId: "prod-1",
      selectionSnapshot: { size: "m", color: "white" },
      quantity: 2,
      priceSnapshot: 399,
    },
    {
      id: "ci-2",
      productId: "prod-3",
      selectionSnapshot: { size: "l" },
      quantity: 1,
      priceSnapshot: 1229,
    },
    {
      id: "ci-3",
      productId: "prod-5",
      selectionSnapshot: { size: "m", color: "blue" },
      quantity: 1,
      priceSnapshot: 1299,
    },
  ],
  createdAt: "2026-03-10T14:22:00.000Z",
  updatedAt: "2026-03-13T09:05:00.000Z",
};
