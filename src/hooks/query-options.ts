import { getProducts, type Query } from "@/lib/product-utils";
import { queryOptions } from "@tanstack/react-query";

export const createProductsQueryOptions = (query: Query) =>
  queryOptions({
    queryKey: ["products", query],
    queryFn: () => getProducts(query),
  });

export const createProductQueryOptions = (productSlug: string) =>
  queryOptions({
    queryKey: ["product", productSlug],
    queryFn: () => findProductBySlug(productSlug),
  });
