import type { Cart } from "../types";

export const mockCart: Cart = {
  sessionId: "sess-abc123",
  userId: null,
  items: [
    { id: "ci-1", variantId: "var-1-m", quantity: 2, priceSnapshot: 399 },
    { id: "ci-2", variantId: "var-3-l", quantity: 1, priceSnapshot: 1199 },
    { id: "ci-3", variantId: "var-5-m", quantity: 1, priceSnapshot: 1299 },
  ],
  createdAt: "2026-03-10T14:22:00.000Z",
  updatedAt: "2026-03-13T09:05:00.000Z",
};
