import { products } from "@/data";
import type { SortOptions } from "@/data/products";
import type { Category, Product, SizeCode, SKU } from "@/types";
import { findCategoryById } from "./category-utils";
import type { Languages } from "./i18n";
import i18n from "./i18n";
import { formatPrice, isDefined } from "./utils";
import { MAX_SEEN_PRODUCTS, SEEN_PRODUCTS_STORAGE_KEY } from "@/constants";

export type Query = {
  category?: Category["id"];
  priceRange?: string;
  sort?: SortOptions;
  rating?: number;
  size?: string;
  color?: string;
  availability?: "inStock" | "outOfStock";
  page?: number;
  perPage?: number;
};

const getProducts = async (
  query: Query,
): Promise<{
  products: Product[];
  information: {
    total: number;
    maxFilterPrice: number;
    minFilterPrice: number;
  };
}> => {
  let filteredProducts = [...products];
  const [rawMinPrice, rawMaxPrice] = (query.priceRange ?? "")
    .split("-")
    .map(Number);
  const hasMinPrice = Number.isFinite(rawMinPrice);
  const hasMaxPrice = Number.isFinite(rawMaxPrice);

  const getMatchingSkus = (
    p: Product,
    options?: { includePriceRange?: boolean },
  ) => {
    const includePriceRange = options?.includePriceRange ?? false;

    return p.skus.filter((sku) => {
      if (query.size && sku.size !== query.size) return false;
      if (query.color && sku.color !== query.color) return false;

      if (query.availability === "inStock") {
        if (sku.stock <= 0) return false;
      } else if (query.availability === "outOfStock") {
        if (sku.stock !== 0) return false;
      } else if (query.size || query.color) {
        if (sku.stock <= 0) return false;
      }

      if (includePriceRange) {
        if (hasMinPrice && sku.price < rawMinPrice) return false;
        if (hasMaxPrice && sku.price > rawMaxPrice) return false;
      }

      return true;
    });
  };

  const getPriceStats = (skus: SKU[]) => {
    if (skus.length === 0) {
      return { minPrice: 0, maxPrice: 0 };
    }

    const prices = skus.map((sku) => sku.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  };

  if (query.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.categoryId === query.category,
    );
  }

  if (query.rating !== undefined) {
    filteredProducts = filteredProducts.filter(
      (p) => p.rating >= query.rating!,
    );
  }

  let productsWithMatchingSkus = filteredProducts
    .map((p) => ({
      p,
      matchingSkus: getMatchingSkus(p),
    }))
    .filter(({ matchingSkus }) => matchingSkus.length > 0);

  const matchingSkuPrices = productsWithMatchingSkus.flatMap(
    ({ matchingSkus }) => matchingSkus.map((sku) => sku.price),
  );
  const maxFilterPrice =
    matchingSkuPrices.length > 0 ? Math.max(...matchingSkuPrices) : 0;
  const minFilterPrice =
    matchingSkuPrices.length > 0 ? Math.min(...matchingSkuPrices) : 0;

  productsWithMatchingSkus = productsWithMatchingSkus
    .map(({ p }) => ({
      p,
      matchingSkus: getMatchingSkus(p, { includePriceRange: true }),
    }))
    .filter(({ matchingSkus }) => matchingSkus.length > 0);

  if (query.sort) {
    switch (query.sort) {
      case "priceAsc":
        productsWithMatchingSkus = productsWithMatchingSkus.sort(
          (a, b) =>
            getPriceStats(a.matchingSkus).minPrice -
            getPriceStats(b.matchingSkus).minPrice,
        );
        break;
      case "priceDesc":
        productsWithMatchingSkus = productsWithMatchingSkus.sort(
          (a, b) =>
            getPriceStats(b.matchingSkus).maxPrice -
            getPriceStats(a.matchingSkus).maxPrice,
        );
        break;
      case "newest":
        productsWithMatchingSkus = productsWithMatchingSkus.sort(
          (a, b) =>
            new Date(b.p.createdAt).getTime() -
            new Date(a.p.createdAt).getTime(),
        );
        break;
      case "rating":
        productsWithMatchingSkus = productsWithMatchingSkus.sort(
          (a, b) => b.p.rating - a.p.rating,
        );
        break;
    }
  }

  const total = productsWithMatchingSkus.length;
  const perPage = Math.max(1, query.perPage ?? 12);
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const page = Math.min(Math.max(1, query.page ?? 1), totalPages);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pagedProducts = productsWithMatchingSkus.slice(start, end);

  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    products: pagedProducts.map(({ p }) => p),
    information: { total, maxFilterPrice, minFilterPrice },
  };
};

const getProductBySlug = async (slug: string): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const product = findProductBySlug(slug);
  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const findProductById = (productId: string) => {
  return products.find((p) => p.id === productId);
};

const findProductBySlug = (slug: string) => {
  return products.find((p) => p.slug.en === slug || p.slug.cs === slug);
};

const setLastSeenProduct = (productId: string) => {
  const seenProducts: string[] = JSON.parse(
    localStorage.getItem("lastSeenProducts") ?? "[]",
  ) as string[];

  const updatedSeenProducts = [
    productId,
    ...seenProducts.filter((id) => id !== productId),
  ].slice(0, MAX_SEEN_PRODUCTS + 1);

  localStorage.setItem(
    SEEN_PRODUCTS_STORAGE_KEY,
    JSON.stringify(updatedSeenProducts),
  );
};

const getLastSeenProducts = (count: number, excludeId?: string): Product[] => {
  const seenProducts = JSON.parse(
    localStorage.getItem(SEEN_PRODUCTS_STORAGE_KEY) ?? "[]",
  ) as string[];
  return seenProducts
    .map((id) => findProductById(id))
    .filter(isDefined)
    .filter((p) => p.id !== excludeId)
    .slice(0, count);
};

const findSKU = (
  skus: SKU[],
  size: SizeCode,
  color?: string,
): SKU | undefined => {
  return skus.find((s) => s.size === size && (!color || s.color === color));
};

const getTotalStock = (product: Product) => {
  return product.skus.reduce((total, sku) => total + sku.stock, 0);
};

const getAvailableColors = (product: Product) => {
  const colorCodes = [
    ...new Set(
      product.skus
        .filter((sku) => sku.stock > 0)
        .map((sku) => sku.color)
        .filter(Boolean),
    ),
  ];

  return colorCodes
    .map((code) => product.options.colors?.find((c) => c.code === code))
    .filter(isDefined);
};

const getAllColors = (product: Product) => {
  const colorCodes = [
    ...new Set(product.skus.map((sku) => sku.color).filter(Boolean)),
  ];

  return colorCodes
    .map((code) => product.options.colors?.find((c) => c.code === code))
    .filter(isDefined);
};

const getAllSizes = (product: Product) => {
  const sizeCodes = [
    ...new Set(product.skus.map((sku) => sku.size).filter(Boolean)),
  ];

  return sizeCodes
    .map((code) => product.options.sizes?.find((s) => s.code === code))
    .filter(isDefined);
};

const getAvailableSizes = (product: Product) => {
  const sizeCodes = [
    ...new Set(
      product.skus
        .filter((sku) => sku.stock > 0)
        .map((sku) => sku.size)
        .filter(Boolean),
    ),
  ];

  return sizeCodes
    .map((code) => product.options.sizes?.find((s) => s.code === code))
    .filter(isDefined);
};

const getAppliedFiltersLabel = (query: Query, locale: Languages) => {
  const labels: { label: string; key: string }[] = [];
  const t = i18n.getFixedT(locale, "catalog");

  if (query.category) {
    labels.push({
      label: `${t("filters.categories")}: ${findCategoryById(query.category)?.name[locale] ?? query.category}`,
      key: "category",
    });
  }
  if (query.priceRange) {
    const [min, max] = query.priceRange.split("-").map(Number);
    labels.push({
      label: `${t("filters.priceRange")}: ${
        Number.isFinite(min) ? `${formatPrice(min, locale)}` : "0"
      } - ${Number.isFinite(max) ? `${formatPrice(max, locale)}` : "∞"}`,
      key: "priceRange",
    });
  }

  if (query.sort) {
    const sortLabelKey = `filters.sortByOptions.${query.sort}`;
    labels.push({
      label: `${t("filters.sortBy")}: ${t(sortLabelKey, query.sort)}`,
      key: "sort",
    });
  }

  if (query.rating !== undefined) {
    labels.push({
      label: `${t("filters.rating")}: ${query.rating}${query.rating !== 5 ? "+" : ""}`,
      key: "rating",
    });
  }
  if (query.size) {
    labels.push({
      label: `${t("filters.size")}: ${query.size.toUpperCase()}`,
      key: "size",
    });
  }
  if (query.color) {
    labels.push({
      label: `${t("filters.color")}: ${query.color}`,
      key: "color",
    });
  }
  if (query.availability) {
    labels.push({
      label: `${t("filters.availability.title")}: ${
        query.availability === "inStock"
          ? t("filters.availability.inStock")
          : t("filters.availability.outOfStock")
      }`,
      key: "availability",
    });
  }

  return labels;
};

const getImageBySelectedColor = (
  product: Product,
  selectedColor: string | undefined,
) => {
  const placeholderImages = {
    primary: product.images[0],
    secondary: product.images[1] || product.images[0],
  };
  if (!selectedColor) {
    return placeholderImages;
  }

  const colorImages = product.images.filter((image) =>
    image.toLowerCase().includes(selectedColor.toLowerCase()),
  );

  if (colorImages.length === 0) {
    return placeholderImages;
  }

  return {
    primary: colorImages[0],
    secondary: colorImages[1] || colorImages[0],
  };
};

export {
  findProductById,
  findProductBySlug,
  findSKU,
  getAppliedFiltersLabel,
  getProducts,
  getTotalStock,
  getAllColors,
  getAvailableColors,
  getAllSizes,
  getAvailableSizes,
  getImageBySelectedColor,
  getProductBySlug,
  setLastSeenProduct,
  getLastSeenProducts,
};
