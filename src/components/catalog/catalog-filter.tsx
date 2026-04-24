import { type SortOptions } from "@/data/products";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";

import { Skeleton } from "../ui/skeleton";
import AvailabilityFilter from "./availability-filter";
import CategoryFilter from "./category-filter";
import ColorFilter from "./color-filter";
import PriceRangeFilter from "./price-range-filter";
import RatingFilter from "./rating-filter";
import SizeFilter from "./size-filter";
import SortFilter from "./sort-filter";

const CatalogFilter = () => {
  const search = useSearch({ from: "/{-$locale}/" });
  const { category, sort, priceRange, size, color, rating, availability } =
    search;
  const navigate = useNavigate({ from: "/{-$locale}/" });

  const toggleFilterValue = (current: string[], value: string) => {
    if (current.includes(value)) {
      return current.filter((entry) => entry !== value);
    }

    return [...current, value];
  };

  const patchSearch = (
    updates: Partial<{
      category: string | undefined;
      sort: SortOptions | undefined;
      priceRange: string | undefined;
      size: string[] | undefined;
      color: string[] | undefined;
      rating: number | undefined;
      availability: "inStock" | "outOfStock" | undefined;
    }>,
  ): void => {
    navigate({
      search: (prev) => ({ ...prev, ...updates, page: 1 }),
      replace: true,
    });
  };

  return (
    <aside className="flex flex-col gap-8 p-4 overflow-y-auto h-full">
      <CategoryFilter
        category={category}
        patchSearch={(updates) => patchSearch(updates)}
      />
      <Suspense fallback={<Skeleton className="w-full h-24" />}>
        <PriceRangeFilter
          priceRange={priceRange}
          patchSearch={(updates) => patchSearch(updates)}
        />
      </Suspense>
      <SortFilter sort={sort} patchSearch={(updates) => patchSearch(updates)} />
      <RatingFilter
        rating={rating}
        patchSearch={(updates) => patchSearch(updates)}
      />
      <SizeFilter
        size={size}
        patchSearch={patchSearch}
        toggleFilterValue={toggleFilterValue}
      />
      <ColorFilter
        color={color}
        patchSearch={patchSearch}
        toggleFilterValue={toggleFilterValue}
      />
      <AvailabilityFilter
        availability={availability}
        patchSearch={(updates) => patchSearch(updates)}
      />
    </aside>
  );
};

export default CatalogFilter;
