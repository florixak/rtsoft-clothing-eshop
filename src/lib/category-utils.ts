import { categories } from "@/data";
import type { Category } from "@/types";

export const findCategoryById = (categoryId: Category["id"]) => {
  return categories.find((c) => c.id === categoryId);
};
