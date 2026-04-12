import type { ProductsSearch } from "@/lib/schema";
import useTableFilter from "./use-table-filter";

const useProductFilter = () => {
  return {
    ...useTableFilter<
      ProductsSearch,
      "createdAt" | "amount",
      "/{-$locale}/admin/products"
    >({
      from: "/{-$locale}/admin/products",
      searchKeys: {
        query: "productQ",
        sort: "sort",
        sortOrder: "sortOrder",
        page: "page",
        perPage: "perPage",
        allowedSortIds: ["createdAt", "amount"],
      },
      defaultSorting: {
        id: "createdAt",
        desc: true,
      },
      defaultPerPage: 5,
      debounceMs: 300,
    }),
  };
};

export default useProductFilter;
