import type {
  LocalizedString,
  Product,
  ProductOption,
  SizeCode,
  TypeCode,
} from "../types";

type OptionDef = {
  code: TypeCode;
  label: LocalizedString;
  priceAdjustment: number;
};

const sizeLabelByCode: Record<SizeCode, LocalizedString> = {
  xs: { cs: "XS", en: "XS" },
  s: { cs: "S", en: "S" },
  m: { cs: "M", en: "M" },
  l: { cs: "L", en: "L" },
  xl: { cs: "XL", en: "XL" },
  xxl: { cs: "XXL", en: "XXL" },
};

const createSizeOptions = (
  productId: string,
  sizes: Array<{ code: SizeCode; priceAdjustment: number }>,
): ProductOption<SizeCode>[] => {
  return sizes.map((size) => {
    const label = sizeLabelByCode[size.code];
    if (!label) {
      throw new Error(`Unknown size code: ${size.code}`);
    }
    return {
      id: `${productId}-size-${size.code}`,
      code: size.code,
      label,
      priceAdjustment: size.priceAdjustment,
    };
  });
};

const createTypeOptions = (
  productId: string,
  types: OptionDef[],
): ProductOption<TypeCode>[] => {
  return types.map((type) => {
    return {
      id: `${productId}-type-${type.code}`,
      code: type.code,
      label: {
        cs: type.label.cs,
        en: type.label.en,
      },
      priceAdjustment: type.priceAdjustment,
    };
  });
};

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
    options: {
      sizes: createSizeOptions("prod-1", [
        { code: "xs", priceAdjustment: -30 },
        { code: "s", priceAdjustment: -10 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 20 },
        { code: "xl", priceAdjustment: 40 },
        { code: "xxl", priceAdjustment: 70 },
      ]),
      types: createTypeOptions("prod-1", [
        {
          code: "classic",
          label: { cs: "Classic", en: "Classic" },
          priceAdjustment: 0,
        },
        {
          code: "organic",
          label: { cs: "Organic Cotton", en: "Organic Cotton" },
          priceAdjustment: 80,
        },
      ]),
    },
    createdAt: "2026-01-10T09:00:00.000Z",
    rating: 4.5,
  },
  {
    id: "prod-2",
    slug: {
      cs: "graficke-tricko-rtsoft-cerne",
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
    options: {
      sizes: createSizeOptions("prod-2", [
        { code: "s", priceAdjustment: -20 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 20 },
        { code: "xl", priceAdjustment: 35 },
        { code: "xxl", priceAdjustment: 55 },
      ]),
      types: createTypeOptions("prod-2", [
        {
          code: "print-basic",
          label: { cs: "Basic Print", en: "Basic Print" },
          priceAdjustment: 0,
        },
        {
          code: "print-premium",
          label: { cs: "Premium Print", en: "Premium Print" },
          priceAdjustment: 90,
        },
      ]),
    },
    createdAt: "2026-01-15T10:30:00.000Z",
    rating: 4.8,
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
    options: {
      sizes: createSizeOptions("prod-3", [
        { code: "xs", priceAdjustment: -30 },
        { code: "s", priceAdjustment: -15 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 30 },
        { code: "xl", priceAdjustment: 60 },
      ]),
      types: createTypeOptions("prod-3", [
        {
          code: "regular",
          label: { cs: "Regular Lining", en: "Regular Lining" },
          priceAdjustment: 0,
        },
        {
          code: "sherpa",
          label: { cs: "Sherpa Lining", en: "Sherpa Lining" },
          priceAdjustment: 150,
        },
      ]),
    },
    createdAt: "2026-01-20T08:00:00.000Z",
    rating: 4.2,
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
    options: {
      sizes: createSizeOptions("prod-4", [
        { code: "s", priceAdjustment: -10 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 25 },
        { code: "xl", priceAdjustment: 45 },
        { code: "xxl", priceAdjustment: 70 },
      ]),
      types: createTypeOptions("prod-4", [
        {
          code: "regular",
          label: { cs: "Regular", en: "Regular" },
          priceAdjustment: 0,
        },
        {
          code: "heavyweight",
          label: { cs: "Heavyweight Fleece", en: "Heavyweight Fleece" },
          priceAdjustment: 140,
        },
      ]),
    },
    createdAt: "2026-02-01T11:00:00.000Z",
    rating: 4.0,
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
    options: {
      sizes: createSizeOptions("prod-5", [
        { code: "s", priceAdjustment: -20 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 30 },
        { code: "xl", priceAdjustment: 60 },
      ]),
      types: createTypeOptions("prod-5", [
        {
          code: "classic",
          label: { cs: "Classic Denim", en: "Classic Denim" },
          priceAdjustment: 0,
        },
        {
          code: "stretch",
          label: { cs: "Comfort Stretch", en: "Comfort Stretch" },
          priceAdjustment: 120,
        },
      ]),
    },
    createdAt: "2026-02-05T09:15:00.000Z",
    rating: 4.2,
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
    options: {
      sizes: createSizeOptions("prod-6", [
        { code: "s", priceAdjustment: -20 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 20 },
        { code: "xl", priceAdjustment: 40 },
      ]),
      types: createTypeOptions("prod-6", [
        {
          code: "regular",
          label: { cs: "Regular", en: "Regular" },
          priceAdjustment: 0,
        },
        {
          code: "pro",
          label: { cs: "Pro Fabric", en: "Pro Fabric" },
          priceAdjustment: 110,
        },
      ]),
    },
    createdAt: "2026-02-10T14:00:00.000Z",
    rating: 4.1,
  },
  {
    id: "prod-7",
    slug: {
      cs: "zimni-bunda-puffa-cerna",
      en: "winter-puffer-jacket-black",
    },
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
    options: {
      sizes: createSizeOptions("prod-7", [
        { code: "xs", priceAdjustment: -50 },
        { code: "s", priceAdjustment: -20 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 40 },
        { code: "xl", priceAdjustment: 80 },
      ]),
      types: createTypeOptions("prod-7", [
        {
          code: "standard",
          label: { cs: "Standard Insulation", en: "Standard Insulation" },
          priceAdjustment: 0,
        },
        {
          code: "thermal",
          label: { cs: "Thermal Plus", en: "Thermal Plus" },
          priceAdjustment: 250,
        },
      ]),
    },
    createdAt: "2026-02-15T10:00:00.000Z",
    rating: 4.5,
  },
];
