import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Cart, CartItem } from "@/types";

type AddItemInput = {
  variantId: string;
  priceSnapshot: number;
  quantity?: number;
};

type CartStore = {
  cart: Cart;
  itemsCount: () => number;
  subtotal: () => number;
  addItem: (input: AddItemInput) => void;
  removeItem: (itemId: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  replaceCart: (nextCart: Cart) => void;
};

const nowIso = () => new Date().toISOString();

const createEmptyCart = (): Cart => ({
  sessionId: crypto.randomUUID(),
  userId: null,
  items: [],
  createdAt: nowIso(),
  updatedAt: nowIso(),
});

const touchCart = (cart: Cart): Cart => ({
  ...cart,
  updatedAt: nowIso(),
});

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: createEmptyCart(),

      itemsCount: () =>
        get().cart.items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().cart.items.reduce(
          (sum, item) => sum + item.priceSnapshot * item.quantity,
          0,
        ),

      addItem: ({ variantId, priceSnapshot, quantity = 1 }) => {
        if (!Number.isFinite(quantity) || Number.isNaN(quantity)) return;
        quantity = Math.max(1, Math.floor(quantity));
        if (quantity <= 0) return;

        set((state) => {
          const existing = state.cart.items.find(
            (item) => item.variantId === variantId,
          );

          let nextItems: CartItem[];

          if (existing) {
            nextItems = state.cart.items.map((item) =>
              item.variantId === variantId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            );
          } else {
            nextItems = [
              ...state.cart.items,
              {
                id: crypto.randomUUID(),
                variantId,
                quantity,
                priceSnapshot,
              },
            ];
          }

          return {
            cart: touchCart({
              ...state.cart,
              items: nextItems,
            }),
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          cart: touchCart({
            ...state.cart,
            items: state.cart.items.filter((item) => item.id !== itemId),
          }),
        }));
      },

      setQuantity: (itemId, quantity) => {
        if (!Number.isFinite(quantity) || Number.isNaN(quantity)) return;
        quantity = Math.max(1, Math.floor(quantity));
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: touchCart({
                ...state.cart,
                items: state.cart.items.filter((item) => item.id !== itemId),
              }),
            };
          }

          return {
            cart: touchCart({
              ...state.cart,
              items: state.cart.items.map((item) =>
                item.id === itemId ? { ...item, quantity } : item,
              ),
            }),
          };
        });
      },

      clearCart: () => {
        set((state) => ({
          cart: touchCart({
            ...state.cart,
            items: [],
          }),
        }));
      },

      replaceCart: (nextCart) => {
        set({ cart: nextCart });
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);
