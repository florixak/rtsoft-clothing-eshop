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

export const generatePages = (
  currentPage: number,
  totalPages: number,
): Array<number> => {
  const maxPagesToShow = 5;

  const half = Math.floor(maxPagesToShow / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxPagesToShow - 1);
  start = Math.max(1, end - maxPagesToShow + 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return pages;
};
