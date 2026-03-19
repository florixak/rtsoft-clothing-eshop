import { products } from "@/data";
import { findCategoryById } from "./category-utils";
import type { Languages } from "./i18n";

export const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

export const searchForProducts = (
  normalizedQuery: string,
  locale: Languages,
  maxResults: number = 5,
) => {
  const safeMaxResults = Number.isFinite(maxResults)
    ? Math.max(0, Math.trunc(maxResults))
    : 5;

  return products
    .filter((product) => {
      if (!normalizedQuery) {
        return true;
      }

      const category = findCategoryById(product.categoryId);
      const searchableParts = [
        product.name[locale],
        product.description[locale],
        category?.name[locale] ?? "",
      ];

      return searchableParts.some((part) =>
        normalizeText(part).includes(normalizedQuery),
      );
    })
    .slice(0, safeMaxResults)
    .map((product) => ({
      ...product,
      categoryName: findCategoryById(product.categoryId)?.name[locale] ?? "",
    }));
};
