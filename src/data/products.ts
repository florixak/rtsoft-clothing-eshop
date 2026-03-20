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

export type SortOptions = "priceAsc" | "priceDesc" | "newest" | "rating";

const sizeLabelByCode: Record<SizeCode, LocalizedString> = {
  xs: { cs: "XS", en: "XS" },
  s: { cs: "S", en: "S" },
  m: { cs: "M", en: "M" },
  l: { cs: "L", en: "L" },
  xl: { cs: "XL", en: "XL" },
  xxl: { cs: "XXL", en: "XXL" },
};

export const SORT_BY_OPTIONS: SortOptions[] = [
  "priceAsc",
  "priceDesc",
  "newest",
  "rating",
] as const;

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
    slug: { cs: "basic-bavlnene-tricko", en: "basic-cotton-tee" },
    name: {
      cs: "Základní bavlněné tričko",
      en: "Basic Cotton Tee",
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
      colors: createTypeOptions("prod-1", [
        {
          code: "white",
          label: { cs: "Bílé", en: "White" },
          priceAdjustment: 0,
        },
        {
          code: "black",
          label: { cs: "Černé", en: "Black" },
          priceAdjustment: 80,
        },
      ]),
    },
    createdAt: "2026-01-10T09:00:00.000Z",
    rating: 4.5,
    reviewsCount: 150,
  },
  {
    id: "prod-2",
    slug: {
      cs: "graficke-tricko-rtsoft",
      en: "graphic-tee-rtsoft",
    },
    name: {
      cs: "Grafické tričko RTSoft",
      en: "RTSoft Graphic Tee",
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
      colors: createTypeOptions("prod-2", [
        {
          code: "black",
          label: { cs: "Černé", en: "Black" },
          priceAdjustment: 0,
        },
        {
          code: "white",
          label: { cs: "Bílé", en: "White" },
          priceAdjustment: 90,
        },
      ]),
    },
    createdAt: "2026-01-15T10:30:00.000Z",
    rating: 4.8,
    reviewsCount: 120,
  },
  {
    id: "prod-3",
    slug: { cs: "zip-mikina", en: "zip-hoodie" },
    name: { cs: "Zipová mikina", en: "Zip Hoodie" },
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
      material: createTypeOptions("prod-3", [
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
    reviewsCount: 45,
  },
  {
    id: "prod-4",
    slug: {
      cs: "oversize-mikina-navnitrni-fleece",
      en: "oversized-fleece-hoodie",
    },
    name: {
      cs: "Oversized mikina s fleecem",
      en: "Oversized Fleece Hoodie",
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
      material: createTypeOptions("prod-4", [
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
    reviewsCount: 80,
  },
  {
    id: "prod-5",
    slug: { cs: "slim-fit-dziny", en: "slim-fit-jeans" },
    name: { cs: "Slim fit džíny", en: "Slim Fit Jeans" },
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
      colors: createTypeOptions("prod-5", [
        {
          code: "blue",
          label: { cs: "Blue", en: "Blue" },
          priceAdjustment: 0,
        },
        {
          code: "black",
          label: { cs: "Black", en: "Black" },
          priceAdjustment: 100,
        },
      ]),
    },
    createdAt: "2026-02-05T09:15:00.000Z",
    rating: 4.2,
    reviewsCount: 120,
  },
  {
    id: "prod-6",
    slug: { cs: "cargo-kalhoty", en: "cargo-pants" },
    name: { cs: "Cargo kalhoty", en: "Cargo Pants" },
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
      material: createTypeOptions("prod-6", [
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
    reviewsCount: 45,
  },
  {
    id: "prod-7",
    slug: {
      cs: "zimni-bunda-puffa",
      en: "winter-puffer-jacket",
    },
    name: {
      cs: "Zimní prošívaná bunda",
      en: "Winter Puffer Jacket",
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
      material: createTypeOptions("prod-7", [
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
    reviewsCount: 60,
  },
  {
    id: "prod-8",
    slug: { cs: "lnena-kosile", en: "linen-shirt" },
    name: { cs: "Lněná košile", en: "Linen Shirt" },
    description: {
      cs: "Lehká lněná košile vhodná na léto. Prodyšný materiál a volnější střih.",
      en: "Light linen shirt perfect for summer. Breathable fabric and relaxed fit.",
    },
    price: 799,
    categoryId: "cat-1",
    images: [
      "https://placehold.co/600x800?text=Linen+Shirt+Beige+Front",
      "https://placehold.co/600x800?text=Linen+Shirt+Beige+Back",
    ],
    options: {
      sizes: createSizeOptions("prod-8", [
        { code: "s", priceAdjustment: -10 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 20 },
        { code: "xl", priceAdjustment: 40 },
      ]),
      colors: createTypeOptions("prod-8", [
        {
          code: "beige",
          label: { cs: "Béžová", en: "Beige" },
          priceAdjustment: 0,
        },
        {
          code: "white",
          label: { cs: "Bílá", en: "White" },
          priceAdjustment: 50,
        },
      ]),
    },
    createdAt: "2026-02-20T09:30:00.000Z",
    rating: 4.3,
    reviewsCount: 22,
  },
  {
    id: "prod-9",
    slug: { cs: "letni-saty-kvetovane", en: "floral-summer-dress" },
    name: { cs: "Letní květované šaty", en: "Floral Summer Dress" },
    description: {
      cs: "Vzdušné šaty s květinovým potiskem. Zapínání na knoflíky a podšívka.",
      en: "Airy dress with floral print. Button front and lightweight lining.",
    },
    price: 999,
    categoryId: "cat-1",
    images: ["https://placehold.co/600x800?text=Floral+Dress+Front"],
    options: {
      sizes: createSizeOptions("prod-9", [
        { code: "xs", priceAdjustment: -20 },
        { code: "s", priceAdjustment: -5 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 25 },
      ]),
      colors: createTypeOptions("prod-9", [
        {
          code: "floral",
          label: { cs: "Květovaný", en: "Floral" },
          priceAdjustment: 0,
        },
      ]),
    },
    createdAt: "2026-02-22T12:00:00.000Z",
    rating: 4.6,
    reviewsCount: 37,
  },
  {
    id: "prod-10",
    slug: { cs: "plátěne-sortky", en: "canvas-shorts" },
    name: { cs: "Plátěné šortky", en: "Canvas Shorts" },
    description: {
      cs: "Praktické plátěné šortky s nastavitelným pasem. Odolné a pohodlné.",
      en: "Practical canvas shorts with adjustable waist. Durable and comfortable.",
    },
    price: 649,
    categoryId: "cat-3",
    images: ["https://placehold.co/600x800?text=Canvas+Shorts+Khaki+Front"],
    options: {
      sizes: createSizeOptions("prod-10", [
        { code: "s", priceAdjustment: -15 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 20 },
      ]),
      colors: createTypeOptions("prod-10", [
        {
          code: "khaki",
          label: { cs: "Khaki", en: "Khaki" },
          priceAdjustment: 0,
        },
        {
          code: "navy",
          label: { cs: "Tmavě modrá", en: "Navy" },
          priceAdjustment: 60,
        },
      ]),
    },
    createdAt: "2026-02-25T08:45:00.000Z",
    rating: 4.0,
    reviewsCount: 18,
  },
  {
    id: "prod-11",
    slug: { cs: "kozeny-opasek", en: "leather-belt" },
    name: { cs: "Kožený opasek", en: "Leather Belt" },
    description: {
      cs: "Klasický kožený opasek s kovovou sponou. Elegantní a pevný.",
      en: "Classic leather belt with metal buckle. Elegant and sturdy.",
    },
    price: 499,
    categoryId: "cat-3",
    images: ["https://placehold.co/600x800?text=Leather+Belt+Brown+Front"],
    options: {
      sizes: createSizeOptions("prod-11", [
        { code: "s", priceAdjustment: -10 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 10 },
      ]),
      colors: createTypeOptions("prod-11", [
        {
          code: "brown",
          label: { cs: "Hnědá", en: "Brown" },
          priceAdjustment: 0,
        },
        {
          code: "black",
          label: { cs: "Černá", en: "Black" },
          priceAdjustment: 40,
        },
      ]),
    },
    createdAt: "2026-03-01T09:00:00.000Z",
    rating: 4.7,
    reviewsCount: 64,
  },
  {
    id: "prod-12",
    slug: { cs: "plstena-capkacka", en: "wool-beanie" },
    name: { cs: "Plstěná čepice", en: "Wool Beanie" },
    description: {
      cs: "Teplá pletená čepice pro chladné dny. Jemná vlna a příjemný pružný lem.",
      en: "Warm knitted beanie for cold days. Soft wool and a comfortable stretch hem.",
    },
    price: 249,
    categoryId: "cat-4",
    images: ["https://placehold.co/600x800?text=Wool+Beanie+Grey+Front"],
    options: {
      sizes: createSizeOptions("prod-12", [
        { code: "s", priceAdjustment: 0 },
        { code: "m", priceAdjustment: 0 },
      ]),
      colors: createTypeOptions("prod-12", [
        { code: "grey", label: { cs: "Šedá", en: "Grey" }, priceAdjustment: 0 },
        {
          code: "olive",
          label: { cs: "Olivová", en: "Olive" },
          priceAdjustment: 20,
        },
      ]),
    },
    createdAt: "2026-03-03T07:30:00.000Z",
    rating: 4.4,
    reviewsCount: 12,
  },
  {
    id: "prod-13",
    slug: { cs: "tenisky-bezove", en: "beige-sneakers" },
    name: { cs: "Tenisky béžové", en: "Beige Sneakers" },
    description: {
      cs: "Nízké tenisky s měkkou stélkou. Univerzální design pro každodenní nošení.",
      en: "Low sneakers with cushioned insole. Versatile design for everyday wear.",
    },
    price: 1799,
    categoryId: "cat-3",
    images: ["https://placehold.co/600x800?text=Beige+Sneakers+Side"],
    options: {
      sizes: createSizeOptions("prod-13", [
        { code: "s", priceAdjustment: -30 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 40 },
      ]),
      colors: createTypeOptions("prod-13", [
        {
          code: "beige",
          label: { cs: "Béžová", en: "Beige" },
          priceAdjustment: 0,
        },
        {
          code: "white",
          label: { cs: "Bílá", en: "White" },
          priceAdjustment: 60,
        },
      ]),
    },
    createdAt: "2026-03-05T10:00:00.000Z",
    rating: 4.5,
    reviewsCount: 29,
  },
  {
    id: "prod-14",
    slug: { cs: "triko-longline", en: "longline-tee" },
    name: { cs: "Tričko longline", en: "Longline Tee" },
    description: {
      cs: "Delší střih trička pro vrstvení. Jemný jemný materiál a moderní look.",
      en: "Longer cut tee for layering. Soft fabric and modern look.",
    },
    price: 459,
    categoryId: "cat-1",
    images: ["https://placehold.co/600x800?text=Longline+Tee+Black+Front"],
    options: {
      sizes: createSizeOptions("prod-14", [
        { code: "s", priceAdjustment: -10 },
        { code: "m", priceAdjustment: 0 },
        { code: "l", priceAdjustment: 20 },
      ]),
      colors: createTypeOptions("prod-14", [
        {
          code: "black",
          label: { cs: "Černá", en: "Black" },
          priceAdjustment: 0,
        },
        {
          code: "olive",
          label: { cs: "Olivová", en: "Olive" },
          priceAdjustment: 40,
        },
      ]),
    },
    createdAt: "2026-03-06T11:30:00.000Z",
    rating: 4.1,
    reviewsCount: 8,
  },
  {
    id: "prod-15",
    slug: { cs: "prakticka-taska", en: "utility-bag" },
    name: { cs: "Praktická taška", en: "Utility Bag" },
    description: {
      cs: "Víceúčelová taška přes rameno s několika kapsami. Robustní a skladná.",
      en: "Multi-purpose shoulder bag with multiple pockets. Robust and packable.",
    },
    price: 699,
    categoryId: "cat-3",
    images: ["https://placehold.co/600x800?text=Utility+Bag+Black+Front"],
    options: {
      sizes: createSizeOptions("prod-15", [{ code: "m", priceAdjustment: 0 }]),
      colors: createTypeOptions("prod-15", [
        {
          code: "black",
          label: { cs: "Černá", en: "Black" },
          priceAdjustment: 0,
        },
        {
          code: "olive",
          label: { cs: "Olivová", en: "Olive" },
          priceAdjustment: 30,
        },
      ]),
    },
    createdAt: "2026-03-07T09:45:00.000Z",
    rating: 4.2,
    reviewsCount: 5,
  },
];
