import { categories } from "@/data";
import type { Category } from "@/types";
import { delayFor } from "./network";

export const findCategoryById = (categoryId: Category["id"]) => {
  return categories.find((c) => c.id === categoryId);
};

export const getCategoryById = async (categoryId: Category["id"]) => {
  await delayFor("category");
  return findCategoryById(categoryId);
};
