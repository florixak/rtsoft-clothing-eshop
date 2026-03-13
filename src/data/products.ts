import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "prod-1",
    slug: { cs: "basic-bavlnene-tricko-bile", en: "basic-cotton-tee-white" },
    name: {
      cs: "Základní bavlněné tričko – bílé",
      en: "Basic Cotton Tee – White",
    },
    description: {
      cs: "Pohodlné tričko z 100% bavlny, vhodné na každý den. Klasický střih, dostupné ve všech velikostech.",
      en: "Comfortable 100% cotton tee, perfect for everyday wear. Classic fit, available in all sizes.",
    },
    price: 399,
    categoryId: "cat-1",
    images: [
      "https://placehold.co/600x800?text=Basic+Tee+White+Front",
      "https://placehold.co/600x800?text=Basic+Tee+White+Back",
    ],
    variants: [
      { id: "var-1-xs", size: "XS", stock: 10 },
      { id: "var-1-s", size: "S", stock: 25 },
      { id: "var-1-m", size: "M", stock: 30 },
      { id: "var-1-l", size: "L", stock: 20 },
      { id: "var-1-xl", size: "XL", stock: 8 },
    ],
    createdAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "prod-2",
    slug: {
      cs: "graficke-tricko-rtsoft-cerné",
      en: "graphic-tee-rtsoft-black",
    },
    name: {
      cs: "Grafické tričko RTSoft – černé",
      en: "RTSoft Graphic Tee – Black",
    },
    description: {
      cs: "Tričko s originálním potiskem loga RTSoft. Unisex střih, prémiová bavlna.",
      en: "Tee with an original RTSoft logo print. Unisex fit, premium cotton.",
    },
    price: 549,
    categoryId: "cat-1",
    images: [
      "https://placehold.co/600x800?text=RTSoft+Tee+Black+Front",
      "https://placehold.co/600x800?text=RTSoft+Tee+Black+Back",
    ],
    variants: [
      { id: "var-2-s", size: "S", stock: 15 },
      { id: "var-2-m", size: "M", stock: 22 },
      { id: "var-2-l", size: "L", stock: 18 },
      { id: "var-2-xl", size: "XL", stock: 12 },
      { id: "var-2-xxl", size: "XXL", stock: 5 },
    ],
    createdAt: "2026-01-15T10:30:00.000Z",
  },
  {
    id: "prod-3",
    slug: { cs: "zip-mikina-seda", en: "zip-hoodie-grey" },
    name: { cs: "Zipová mikina – šedá", en: "Zip Hoodie – Grey" },
    description: {
      cs: "Teplá mikina na zip s kapsami. Ideální pro chladnější dny. Složení: 80% bavlna, 20% polyester.",
      en: "Warm zip-up hoodie with pockets. Ideal for cooler days. Composition: 80% cotton, 20% polyester.",
    },
    price: 1199,
    categoryId: "cat-2",
    images: [
      "https://placehold.co/600x800?text=Zip+Hoodie+Grey+Front",
      "https://placehold.co/600x800?text=Zip+Hoodie+Grey+Back",
    ],
    variants: [
      { id: "var-3-xs", size: "XS", stock: 6 },
      { id: "var-3-s", size: "S", stock: 14 },
      { id: "var-3-m", size: "M", stock: 20 },
      { id: "var-3-l", size: "L", stock: 16 },
      { id: "var-3-xl", size: "XL", stock: 9 },
    ],
    createdAt: "2026-01-20T08:00:00.000Z",
  },
  {
    id: "prod-4",
    slug: {
      cs: "oversize-mikina-navnitrni-fleece-cerna",
      en: "oversized-fleece-hoodie-black",
    },
    name: {
      cs: "Oversized mikina s fleecem – černá",
      en: "Oversized Fleece Hoodie – Black",
    },
    description: {
      cs: "Oversized mikina s měkkým fleecem uvnitř. Pohodlná a stylová.",
      en: "Oversized hoodie with soft fleece lining. Comfortable and stylish.",
    },
    price: 1499,
    categoryId: "cat-2",
    images: ["https://placehold.co/600x800?text=Fleece+Hoodie+Black+Front"],
    variants: [
      { id: "var-4-s", size: "S", stock: 10 },
      { id: "var-4-m", size: "M", stock: 18 },
      { id: "var-4-l", size: "L", stock: 15 },
      { id: "var-4-xl", size: "XL", stock: 7 },
      { id: "var-4-xxl", size: "XXL", stock: 3 },
    ],
    createdAt: "2026-02-01T11:00:00.000Z",
  },
  {
    id: "prod-5",
    slug: { cs: "slim-fit-dziny-modre", en: "slim-fit-jeans-blue" },
    name: { cs: "Slim fit džíny – modré", en: "Slim Fit Jeans – Blue" },
    description: {
      cs: "Klasické modré džíny se slim fit střihem. 98% bavlna, 2% elastan pro pohodlí pohybu.",
      en: "Classic blue jeans with a slim fit cut. 98% cotton, 2% elastane for ease of movement.",
    },
    price: 1299,
    categoryId: "cat-3",
    images: [
      "https://placehold.co/600x800?text=Slim+Jeans+Blue+Front",
      "https://placehold.co/600x800?text=Slim+Jeans+Blue+Back",
    ],
    variants: [
      { id: "var-5-s", size: "S", stock: 12 },
      { id: "var-5-m", size: "M", stock: 20 },
      { id: "var-5-l", size: "L", stock: 17 },
      { id: "var-5-xl", size: "XL", stock: 8 },
    ],
    createdAt: "2026-02-05T09:15:00.000Z",
  },
  {
    id: "prod-6",
    slug: { cs: "cargo-kalhoty-khaki", en: "cargo-pants-khaki" },
    name: { cs: "Cargo kalhoty – khaki", en: "Cargo Pants – Khaki" },
    description: {
      cs: "Odolné cargo kalhoty s bočními kapsami. Vhodné do města i přírody.",
      en: "Durable cargo pants with side pockets. Suitable for city and outdoor use.",
    },
    price: 999,
    categoryId: "cat-3",
    images: ["https://placehold.co/600x800?text=Cargo+Pants+Khaki+Front"],
    variants: [
      { id: "var-6-s", size: "S", stock: 9 },
      { id: "var-6-m", size: "M", stock: 14 },
      { id: "var-6-l", size: "L", stock: 11 },
      { id: "var-6-xl", size: "XL", stock: 6 },
    ],
    createdAt: "2026-02-10T14:00:00.000Z",
  },
  {
    id: "prod-7",
    slug: { cs: "zimni-bunda-puffa-cerna", en: "winter-puffer-jacket-black" },
    name: {
      cs: "Zimní prošívaná bunda – černá",
      en: "Winter Puffer Jacket – Black",
    },
    description: {
      cs: "Teplá zimní bunda s prošívanou výplní. Voděodolná vrstva, skrytá kapuce.",
      en: "Warm winter puffer jacket with water-resistant coating and hidden hood.",
    },
    price: 2799,
    categoryId: "cat-4",
    images: [
      "https://placehold.co/600x800?text=Puffer+Jacket+Black+Front",
      "https://placehold.co/600x800?text=Puffer+Jacket+Black+Side",
    ],
    variants: [
      { id: "var-7-xs", size: "XS", stock: 4 },
      { id: "var-7-s", size: "S", stock: 8 },
      { id: "var-7-m", size: "M", stock: 12 },
      { id: "var-7-l", size: "L", stock: 10 },
      { id: "var-7-xl", size: "XL", stock: 6 },
    ],
    createdAt: "2026-02-15T10:00:00.000Z",
  },
];
