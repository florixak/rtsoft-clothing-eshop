import type { ShippingMethod, PaymentMethod } from "../types";

export const shippingMethods: ShippingMethod[] = [
  { id: "ship-1", name: "Zásilkovna / Packeta", price: 79 },
  { id: "ship-2", name: "PPL kurýr / PPL Courier", price: 129 },
  { id: "ship-3", name: "Osobní odběr / Pickup", price: 0 },
  { id: "ship-4", name: "Česká pošta / Czech Post", price: 99 },
];

export const paymentMethods: PaymentMethod[] = [
  { id: "pay-1", name: "Platební karta / Credit Card" },
  { id: "pay-2", name: "Bankovní převod / Bank Transfer" },
  { id: "pay-3", name: "Dobírka / Cash on Delivery" },
  { id: "pay-4", name: "Apple Pay" },
];
