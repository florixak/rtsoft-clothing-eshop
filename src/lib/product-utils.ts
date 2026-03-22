import { products } from "@/data";
import type { SortOptions } from "@/data/products";
import type { Category, Product, SizeCode, SKU } from "@/types";
import { findCategoryById } from "./category-utils";
import type { Languages } from "./i18n";
import i18n from "./i18n";
import { formatPrice, isDefined } from "./utils";

type Query = {
  category?: Category["id"];
  priceRange?: string;
  sort?: SortOptions;
  rating?: number;
  size?: string;
  color?: string;
  material?: string;
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

  if (query.size) {
    filteredProducts = filteredProducts.filter((p) =>
      p.skus.some((sku) => sku.size === query.size && sku.stock > 0),
    );
  }

  if (query.color) {
    filteredProducts = filteredProducts.filter((p) =>
      p.skus.some((sku) => sku.color === query.color && sku.stock > 0),
    );
  }

  if (query.material) {
    filteredProducts = filteredProducts.filter((p) =>
      p.skus.some((sku) => sku.material === query.material && sku.stock > 0),
    );
  }

  if (query.availability === "inStock") {
    filteredProducts = filteredProducts.filter((p) =>
      p.skus.some((sku) => sku.stock > 0),
    );
  } else if (query.availability === "outOfStock") {
    filteredProducts = filteredProducts.filter((p) =>
      p.skus.every((sku) => sku.stock === 0),
    );
  }

  const maxFilterPrice = filteredProducts.length
    ? Math.max(...filteredProducts.map((p) => p.basePrice))
    : 0;
  const minFilterPrice = filteredProducts.length
    ? Math.min(...filteredProducts.map((p) => p.basePrice))
    : 0;

  if (query.priceRange) {
    const [min, max] = query.priceRange.split("-").map(Number);
    if (Number.isFinite(min)) {
      filteredProducts = filteredProducts.filter((p) => p.basePrice >= min);
    }
    if (Number.isFinite(max)) {
      filteredProducts = filteredProducts.filter((p) => p.basePrice <= max);
    }
  }

  if (query.sort) {
    switch (query.sort) {
      case "priceAsc":
        filteredProducts = filteredProducts.sort(
          (a, b) => a.basePrice - b.basePrice,
        );
        break;
      case "priceDesc":
        filteredProducts = filteredProducts.sort(
          (a, b) => b.basePrice - a.basePrice,
        );
        break;
      case "newest":
        filteredProducts = filteredProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "rating":
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  const total = filteredProducts.length;
  const page = Math.max(1, query.page ?? 1);
  const perPage = Math.max(1, query.perPage ?? 12);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    products: filteredProducts.slice(start, end),
    information: { total, maxFilterPrice, minFilterPrice },
  };
};

const findProductById = (productId: string) => {
  return products.find((p) => p.id === productId);
};

const findSKU = (
  skus: SKU[],
  size: SizeCode,
  color?: string,
  material?: string,
): SKU | undefined => {
  return skus.find(
    (s) =>
      s.size === size &&
      (!color || s.color === color) &&
      (!material || s.material === material),
  );
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
    .map((code) => product.options.sizes.find((s) => s.code === code))
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
  if (query.material) {
    labels.push({
      label: `${t("filters.material")}: ${query.material}`,
      key: "material",
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
  findSKU,
  getAppliedFiltersLabel,
  getProducts,
  getTotalStock,
  getAllColors,
  getAvailableColors,
  getAvailableSizes,
  getImageBySelectedColor,
};
