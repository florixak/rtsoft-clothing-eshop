import type { Order, OrderStatus } from "../types";

export const orderStatuses: OrderStatus[] = [
  "pending",
  "paid",
  "shipped",
  "completed",
  "cancelled",
] as const;

export const orders: Order[] = [
  {
    id: "ord-1",
    userId: null,
    items: [
      {
        productId: "prod-1",
        nameSnapshot: "Basic Cotton Tee",
        selectionSnapshot: { size: "m", color: "white" },
        quantity: 2,
        priceSnapshot: 399,
      },
      {
        productId: "prod-3",
        nameSnapshot: "Zip Hoodie",
        selectionSnapshot: { size: "l", color: "black" },
        quantity: 1,
        priceSnapshot: 1229,
      },
      {
        productId: "prod-8",
        nameSnapshot: "Baseball Cap",
        selectionSnapshot: { size: "s", color: "navy" },
        quantity: 1,
        priceSnapshot: 499,
      },
      {
        productId: "prod-9",
        nameSnapshot: "Leather Belt",
        selectionSnapshot: { size: "l", color: "brown" },
        quantity: 1,
        priceSnapshot: 799,
      },
      {
        productId: "prod-10",
        nameSnapshot: "Canvas Backpack",
        selectionSnapshot: { size: "m", color: "green" },
        quantity: 1,
        priceSnapshot: 1499,
      },
    ],
    customer: {
      firstName: "Jan",
      lastName: "Novák",
      email: "jan.novak@example.cz",
      phone: "+420 601 234 567",
    },
    address: {
      street: "Náměstí Republiky 1",
      city: "Praha",
      postalCode: "110 00",
      country: "CZ",
    },
    shippingMethod: {
      id: "packeta",
      name: { cs: "Zásilkovna", en: "Packeta" },
      price: 79,
      description: { cs: "2-3 pracovní dny", en: "2-3 business days" },
    },
    paymentMethod: {
      id: "payment-card",
      name: { cs: "Platební karta", en: "Payment Card" },
    },
    priceDetails: {
      subtotal: 399 * 2 + 1229 + 499 + 799 + 1499,
      shippingCost: 79,
      tax: Math.round((399 * 2 + 1229 + 499 + 799 + 1499) * 0.21),
      total:
        399 * 2 +
        1229 +
        499 +
        799 +
        1499 +
        79 +
        Math.round((399 * 2 + 1229 + 499 + 799 + 1499) * 0.21),
    },
    status: "completed",
    createdAt: "2026-02-20T10:15:00.000Z",
    updatedAt: "2026-02-23T16:00:00.000Z",
  },
  {
    id: "ord-2",
    userId: "user-42",
    items: [
      {
        productId: "prod-7",
        nameSnapshot: "Winter Puffer Jacket",
        selectionSnapshot: { size: "m", color: "black" },
        quantity: 1,
        priceSnapshot: 2799,
      },
    ],
    customer: {
      firstName: "Tereza",
      lastName: "Svobodová",
      email: "tereza.svobodova@example.cz",
      phone: "+420 732 987 654",
    },
    address: {
      street: "Masarykova 42",
      city: "Brno",
      postalCode: "602 00",
      country: "CZ",
    },
    shippingMethod: {
      id: "ppl",
      name: { cs: "PPL kurýr", en: "PPL Courier" },
      price: 129,
      description: { cs: "4-5 pracovních dní", en: "4-5 business days" },
    },
    paymentMethod: {
      id: "bank-transfer",
      name: { cs: "Bankovní převod", en: "Bank Transfer" },
    },
    priceDetails: {
      subtotal: 2799,
      shippingCost: 129,
      tax: Math.round(2799 * 0.21),
      total: 2799 + 129 + Math.round(2799 * 0.21),
    },
    status: "shipped",
    createdAt: "2026-03-01T08:40:00.000Z",
    updatedAt: "2026-03-03T12:20:00.000Z",
  },
  {
    id: "ord-3",
    userId: null,
    items: [
      {
        productId: "prod-2",
        nameSnapshot: "RTSoft Graphic Tee",
        selectionSnapshot: { size: "l", color: "black" },
        quantity: 1,
        priceSnapshot: 569,
      },
      {
        productId: "prod-5",
        nameSnapshot: "Slim Fit Jeans",
        selectionSnapshot: { size: "l", color: "blue" },
        quantity: 1,
        priceSnapshot: 1329,
      },
      {
        productId: "prod-6",
        nameSnapshot: "Cargo Pants",
        selectionSnapshot: { size: "m", color: "olive" },
        quantity: 2,
        priceSnapshot: 999,
      },
    ],
    customer: {
      firstName: "Ondřej",
      lastName: "Kratochvíl",
      email: "ondrej.kratochvil@example.cz",
      phone: "+420 776 543 210",
    },
    address: {
      street: "Tylova 8",
      city: "Plzeň",
      postalCode: "301 00",
      country: "CZ",
    },
    shippingMethod: {
      id: "packeta",
      name: { cs: "Zásilkovna", en: "Packeta" },
      price: 99,
      description: { cs: "2-3 pracovní dny", en: "2-3 business days" },
    },
    paymentMethod: {
      id: "cash-on-delivery",
      name: { cs: "Dobírka", en: "Cash on Delivery" },
    },
    priceDetails: {
      subtotal: 569 + 1329 + 999 * 2,
      shippingCost: 99,
      tax: Math.round((569 + 1329 + 999 * 2) * 0.21),
      total:
        569 + 1329 + 999 * 2 + 99 + Math.round((569 + 1329 + 999 * 2) * 0.21),
    },
    status: "paid",
    createdAt: "2026-03-10T17:55:00.000Z",
    updatedAt: "2026-03-10T18:01:00.000Z",
  },
  {
    id: "ord-4",
    userId: "user-17",
    items: [
      {
        productId: "prod-4",
        nameSnapshot: "Oversized Fleece Hoodie",
        selectionSnapshot: { size: "s", color: "gray" },
        quantity: 1,
        priceSnapshot: 1489,
      },
    ],
    customer: {
      firstName: "Lucie",
      lastName: "Marková",
      email: "lucie.markova@example.cz",
      phone: "+420 608 111 222",
    },
    address: {
      street: "Pražská 15",
      city: "Olomouc",
      postalCode: "779 00",
      country: "CZ",
    },
    shippingMethod: {
      id: "pickup",
      name: { cs: "Osobní odběr", en: "In Person Pickup" },
      price: 0,
      description: {
        cs: "1-2 pracovní dny, pouze v Praze",
        en: "1-2 business days, pickup only in Prague",
      },
    },
    paymentMethod: {
      id: "apple-pay",
      name: { cs: "Apple Pay", en: "Apple Pay" },
    },
    priceDetails: {
      subtotal: 1489,
      shippingCost: 0,
      tax: Math.round(1489 * 0.21),
      total: 1489 + Math.round(1489 * 0.21),
    },
    status: "pending",
    createdAt: "2026-03-13T08:10:00.000Z",
    updatedAt: "2026-03-13T08:10:00.000Z",
  },
  {
    id: "ord-5",
    userId: null,
    items: [
      {
        productId: "prod-1",
        nameSnapshot: "Basic Cotton Tee",
        selectionSnapshot: { size: "s", color: "white" },
        quantity: 3,
        priceSnapshot: 389,
      },
    ],
    customer: {
      firstName: "Martin",
      lastName: "Horáček",
      email: "martin.horacek@example.cz",
      phone: "+420 724 000 333",
    },
    address: {
      street: "Jiráskova 2",
      city: "České Budějovice",
      postalCode: "370 01",
      country: "CZ",
    },
    shippingMethod: {
      id: "packeta",
      name: { cs: "Zásilkovna", en: "Packeta" },
      price: 79,
      description: { cs: "2-3 pracovní dny", en: "2-3 business days" },
    },
    paymentMethod: {
      id: "payment-card",
      name: { cs: "Platební karta", en: "Payment Card" },
    },
    priceDetails: {
      subtotal: 389 * 3,
      shippingCost: 79,
      tax: Math.round(389 * 3 * 0.21),
      total: 389 * 3 + 79 + Math.round(389 * 3 * 0.21),
    },
    status: "cancelled",
    createdAt: "2026-03-05T13:00:00.000Z",
    updatedAt: "2026-03-06T09:30:00.000Z",
  },
];
