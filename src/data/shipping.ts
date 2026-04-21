import type { ShippingMethod, PaymentMethod, PickupPoint } from "../types";

export const shippingMethods: ShippingMethod[] = [
  {
    id: "packeta",
    name: { cs: "Zásilkovna", en: "Packeta" },
    price: 79,
    description: { cs: "2-3 pracovní dny", en: "2-3 business days" },
  },
  {
    id: "ppl",
    name: { cs: "PPL kurýr", en: "PPL Courier" },
    price: 129,
    description: { cs: "4-5 pracovních dní", en: "4-5 business days" },
  },
  {
    id: "pickup",
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
    id: "payment-card",
    name: {
      cs: "Platební karta / Kreditní karta",
      en: "Credit Card / Payment Card",
    },
  },
  {
    id: "bank-transfer",
    name: {
      cs: "Bankovní převod",
      en: "Bank Transfer",
    },
  },
  {
    id: "cash-on-delivery",
    name: { cs: "Dobírka", en: "Cash on Delivery" },
  },
  { id: "apple-pay", name: { cs: "Apple Pay", en: "Apple Pay" } },
] as const;

export const pickupPoints: PickupPoint[] = [
  {
    id: "pickup-1",
    name: "Zásilkovna Praha",
    address: "Na Hřibě 123",
    city: "Praha",
    distance: "1.5 km",
    openingHours: "Po-Pá 9:00-18:00",
  },
  {
    id: "pickup-2",
    name: "Zásilkovna Brno",
    address: "Hlavní 456",
    city: "Brno",
    distance: "2.0 km",
    openingHours: "Po-Pá 9:00-18:00",
  },
] as const;
