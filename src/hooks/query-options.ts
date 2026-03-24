import { QUERY_KEYS } from "@/constants";
import { getCategoryById } from "@/lib/category-utils";
import { getProductBySlug, getProducts, type Query } from "@/lib/product-utils";
import { queryOptions } from "@tanstack/react-query";

export const createProductsQueryOptions = (query: Query) =>
  queryOptions({
    queryKey: QUERY_KEYS.products(query),
    queryFn: () => getProducts(query),
  });

export const createProductQueryOptions = (productSlug: string) =>
  queryOptions({
    queryKey: QUERY_KEYS.product(productSlug),
    queryFn: () => getProductBySlug(productSlug),
  });

export const createCategoryQueryOptions = (categoryId: string) =>
  queryOptions({
    queryKey: QUERY_KEYS.category(categoryId),
    queryFn: () => getCategoryById(categoryId),
  });
