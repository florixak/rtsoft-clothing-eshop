import { products } from "@/data";
import type { SortOptions } from "@/data/products";
import type { Category, Product, SizeCode, SKU } from "@/types";
import { findCategoryById } from "./category-utils";
import type { Languages } from "./i18n";
import i18n from "./i18n";
import { formatPrice } from "./utils";

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
      p.options.sizes.some((size) => size.code === query.size),
    );
  }

  if (query.color) {
    filteredProducts = filteredProducts.filter((p) =>
      (p.options.colors ?? []).some((color) => color.code === query.color),
    );
  }

  if (query.material) {
    filteredProducts = filteredProducts.filter((p) =>
      (p.options.material ?? []).some(
        (material) => material.code === query.material,
      ),
    );
  }

  if (query.availability === "outOfStock") {
    filteredProducts = [];
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

const getAppliedFiltersLabel = (query: Query, locale: Languages) => {
  const labels: { label: string; key: string }[] = [];
  const t = i18n.getFixedT(locale, "catalog");

  console.log(t("filters.activeTags.remove", { label: "Test" }));

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
        min !== undefined ? `${formatPrice(min, locale)}` : "0"
      } - ${max !== undefined ? `${formatPrice(max, locale)}` : "∞"}`,
      key: "priceRange",
    });
  }
  if (query.rating !== undefined) {
    labels.push({
      label: `${t("filters.rating")}: ${query.rating}+`,
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
      label: `${t("filters.availability")}: ${
        query.availability === "inStock" ? "In Stock" : "Out of Stock"
      }`,
      key: "availability",
    });
  }

  return labels;
};

export { findProductById, findSKU, getAppliedFiltersLabel, getProducts };
