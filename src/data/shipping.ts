import type { ShippingMethod, PaymentMethod } from "../types";

export const shippingMethods: ShippingMethod[] = [
  {
    id: "ship-1",
    name: { cs: "Zásilkovna", en: "Packeta" },
    price: 79,
    description: { cs: "2-3 pracovní dny", en: "2-3 business days" },
  },
  {
    id: "ship-2",
    name: { cs: "PPL kurýr", en: "PPL Courier" },
    price: 129,
    description: { cs: "4-5 pracovních dní", en: "4-5 business days" },
  },
  {
    id: "ship-3",
    name: { cs: "Osobní odběr", en: "In Person Pickup" },
    price: 0,
    description: {
      cs: "1-2 pracovní dny, pouze v Praze",
      en: "1-2 business days, pickup only in Prague",
    },
  },
] as const;

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pay-1",
    name: {
      cs: "Platební karta / Kreditní karta",
      en: "Credit Card / Payment Card",
    },
  },
  {
    id: "pay-2",
    name: {
      cs: "Bankovní převod",
      en: "Bank Transfer",
    },
  },
  {
    id: "pay-3",
    name: { cs: "Dobírka", en: "Cash on Delivery" },
  },
  { id: "pay-4", name: { cs: "Apple Pay", en: "Apple Pay" } },
] as const;
