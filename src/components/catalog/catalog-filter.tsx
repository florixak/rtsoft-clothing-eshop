import { type SortOptions } from "@/data/products";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";

import { Skeleton } from "../ui/skeleton";
import AvailabilityFilter from "./availability-filter";
import CategoryFilter from "./category-filter";
import ColorFilter from "./color-filter";
import PriceRangeFilter from "./price-range-filter";
import RatingFilter from "./rating-filter";
import SizeFilter from "./size-filter";
import SortFilter from "./sort-filter";

const CatalogFilter = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);
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

  const hasActiveFilters =
    category ||
    sort ||
    priceRange ||
    size?.length ||
    color?.length ||
    rating ||
    availability;

  const clearAllFilters = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        category: undefined,
        sort: undefined,
        priceRange: undefined,
        size: undefined,
        color: undefined,
        rating: undefined,
        availability: undefined,
        page: 1,
      }),
      replace: true,
    });
  };

  return (
    <aside className="flex flex-col gap-8 p-4 overflow-y-auto h-full">
      <Suspense fallback={<Skeleton className="w-full h-48" />}>
        <CategoryFilter
          category={category}
          patchSearch={(updates) => patchSearch(updates)}
        />
      </Suspense>
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

      <Button
        variant="outline"
        size="sm"
        onClick={clearAllFilters}
        className={"mt-auto"}
        disabled={!hasActiveFilters}
      >
        {t("filters.clearAll")}
      </Button>
    </aside>
  );
};

export default CatalogFilter;
