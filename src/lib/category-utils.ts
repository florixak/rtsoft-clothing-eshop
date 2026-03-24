import { categories } from "@/data";
import type { Category } from "@/types";

export const findCategoryById = (categoryId: Category["id"]) => {
  return categories.find((c) => c.id === categoryId);
};

export const getCategoryById = async (categoryId: Category["id"]) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return findCategoryById(categoryId);
};
