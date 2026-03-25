import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Cart, CartItem, SizeCode, TypeCode } from "@/types";
import { findProductById, findSKU } from "@/lib/product-utils";

type AddItemInput = {
  productId: string;
  size: SizeCode;
  color: TypeCode;
  quantity?: number;
};

type CartStore = {
  cart: Cart;
  itemsCount: () => number;
  subtotal: () => number;
  addItem: (input: AddItemInput) => void;
  removeItem: (itemId: string) => void;
  getQuantity: (itemId: string) => number | undefined;
  changeItemQuantity: (itemId: string, newQuantity: number) => void;
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
          (sum, item) => sum + item.quantity * item.priceSnapshot,
          0,
        ),

      addItem: ({ productId, size, color, quantity = 1 }) => {
        const product = findProductById(productId);
        const selectedSku = findSKU(product?.skus ?? [], size, color);
        const unitPrice = selectedSku?.price;

        if (
          !selectedSku ||
          selectedSku.stock <= 0 ||
          unitPrice == null ||
          !Number.isFinite(unitPrice) ||
          unitPrice < 0
        ) {
          return;
        }
        if (!Number.isFinite(quantity) || Number.isNaN(quantity)) return;
        quantity = Math.max(1, Math.floor(quantity));
        if (quantity <= 0) return;

        set((state) => {
          const existing = state.cart.items.find(
            (item) =>
              item.productId === productId &&
              item.selectionSnapshot.size === size &&
              item.selectionSnapshot.color === color &&
              item.priceSnapshot === unitPrice,
          );

          const nextQuantity = (existing?.quantity ?? 0) + quantity;
          if (nextQuantity > selectedSku.stock) {
            return state;
          }

          let nextItems: CartItem[];

          if (existing) {
            nextItems = state.cart.items.map((item) =>
              item.productId === productId &&
              item.selectionSnapshot.size === size &&
              item.selectionSnapshot.color === color &&
              item.priceSnapshot === unitPrice
                ? { ...item, quantity: nextQuantity }
                : item,
            );
          } else {
            nextItems = [
              ...state.cart.items,
              {
                id: crypto.randomUUID(),
                productId,
                selectionSnapshot: { size, color },
                quantity: nextQuantity,
                priceSnapshot: unitPrice,
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

      getQuantity: (itemId) => {
        const item = get().cart.items.find((item) => item.id === itemId);
        return item?.quantity;
      },

      changeItemQuantity: (itemId, newQuantity) => {
        if (!Number.isFinite(newQuantity) || Number.isNaN(newQuantity)) return;
        newQuantity = Math.max(1, Math.floor(newQuantity));
        if (newQuantity <= 0) return;

        set((state) => {
          const item = state.cart.items.find((item) => item.id === itemId);
          if (!item) return state;

          const product = findProductById(item.productId);
          const selectedSku = findSKU(
            product?.skus ?? [],
            item.selectionSnapshot.size,
            item.selectionSnapshot.color,
          );
          if (!selectedSku) return state;

          if (newQuantity > selectedSku.stock) {
            return state;
          }

          const nextItems = state.cart.items.map((cartItem) =>
            cartItem.id === itemId
              ? { ...cartItem, quantity: newQuantity }
              : cartItem,
          );

          return {
            cart: touchCart({
              ...state.cart,
              items: nextItems,
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
