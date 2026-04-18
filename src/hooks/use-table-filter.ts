import { useEffect, useState } from "react";

import useDebounce from "@/hooks/use-debounce";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type {
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export type TableFilterFrom =
  | "/{-$locale}/admin/"
  | "/{-$locale}/admin/orders/"
  | "/{-$locale}/admin/products"
  | "/{-$locale}/account/orders/";

type SearchKeys<
  TSearch extends Record<string, unknown>,
  TSortId extends string,
> = {
  query: keyof TSearch;
  sort: keyof TSearch;
  sortOrder: keyof TSearch;
  page: keyof TSearch;
  perPage: keyof TSearch;
  status?: keyof TSearch;
  statusFilterId?: string;
  allowedSortIds: readonly TSortId[];
};

type UseTableFilterProps<
  TSearch extends Record<string, unknown>,
  TSortId extends string,
  TFrom extends TableFilterFrom,
  TStatus extends string = never,
> = {
  from: TFrom;
  searchKeys: SearchKeys<TSearch, TSortId>;
  defaultSorting: {
    id: TSortId;
    desc: boolean;
  };
  defaultPerPage: number;
  debounceMs?: number;
  statusValues?: readonly TStatus[];
};

const useTableFilter = <
  TSearch extends Record<string, unknown>,
  TSortId extends string,
  TFrom extends TableFilterFrom,
  TStatus extends string = never,
>({
  from,
  searchKeys,
  defaultSorting,
  defaultPerPage,
  debounceMs = 300,
  statusValues,
}: UseTableFilterProps<TSearch, TSortId, TFrom, TStatus>) => {
  const search = useSearch({ from } as never) as TSearch;
  const navigate = useNavigate({ from } as never);

  const patchSearch = (updates: Partial<TSearch>) => {
    navigate({
      search: (prev: TSearch) => ({ ...prev, ...updates }),
      replace: true,
      resetScroll: false,
    } as never);
  };

  const currentSort = search[searchKeys.sort];
  const currentSortOrder = search[searchKeys.sortOrder];
  const hasValidSort =
    typeof currentSort === "string" &&
    searchKeys.allowedSortIds.includes(currentSort as TSortId);

  const sorting: SortingState = hasValidSort
    ? [{ id: currentSort as TSortId, desc: currentSortOrder !== "asc" }]
    : [{ id: defaultSorting.id, desc: defaultSorting.desc }];

  const statusKey = searchKeys.status;
  const currentStatusValue = statusKey ? search[statusKey] : undefined;
  const status =
    statusKey &&
    typeof currentStatusValue === "string" &&
    statusValues?.includes(currentStatusValue as TStatus)
      ? (currentStatusValue as TStatus)
      : undefined;

  const statusFilterId = searchKeys.statusFilterId ?? "status";
  const columnFilters: ColumnFiltersState =
    status !== undefined ? [{ id: statusFilterId, value: status }] : [];

  const rawGlobalFilter = search[searchKeys.query];
  const urlGlobalFilter =
    typeof rawGlobalFilter === "string" ? rawGlobalFilter : "";
  const [globalFilter, setGlobalFilter] = useState(urlGlobalFilter);

  useEffect(() => {
    setGlobalFilter(urlGlobalFilter);
  }, [urlGlobalFilter]);

  useDebounce({
    value: globalFilter,
    delay: debounceMs,
    onDebounce: (value) => {
      const normalizedValue = value.trim();
      const nextQueryValue = normalizedValue || undefined;
      const previousQueryValue =
        typeof search[searchKeys.query] === "string"
          ? (search[searchKeys.query] as string)
          : undefined;

      if (nextQueryValue === previousQueryValue) {
        return;
      }

      patchSearch({
        [searchKeys.query]: nextQueryValue,
        [searchKeys.page]: 1,
      } as Partial<TSearch>);
    },
  });

  const rawPage = search[searchKeys.page];
  const rawPerPage = search[searchKeys.perPage];
  const page = typeof rawPage === "number" ? rawPage : 1;
  const perPage = typeof rawPerPage === "number" ? rawPerPage : defaultPerPage;

  const pagination: PaginationState = {
    pageIndex: Math.max(page - 1, 0),
    pageSize: perPage,
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    const nextSorting =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting)
        : updaterOrValue;

    const firstSort = nextSorting[0];
    const sortId =
      firstSort && searchKeys.allowedSortIds.includes(firstSort.id as TSortId)
        ? (firstSort.id as TSortId)
        : undefined;

    patchSearch({
      [searchKeys.sort]: sortId,
      [searchKeys.sortOrder]: firstSort
        ? firstSort.desc
          ? "desc"
          : "asc"
        : undefined,
      [searchKeys.page]: 1,
    } as Partial<TSearch>);
  };

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (
    updaterOrValue,
  ) => {
    if (!statusKey || !statusValues) {
      return;
    }

    const nextFilters =
      typeof updaterOrValue === "function"
        ? updaterOrValue(columnFilters)
        : updaterOrValue;

    const statusFilter = nextFilters.find(
      (filter) => filter.id === statusFilterId,
    );

    const statusValue =
      typeof statusFilter?.value === "string"
        ? (statusFilter.value as TStatus)
        : undefined;

    const nextStatus =
      statusValue && statusValues.includes(statusValue)
        ? statusValue
        : undefined;

    patchSearch({
      [statusKey]: nextStatus,
      [searchKeys.page]: 1,
    } as Partial<TSearch>);
  };

  const handleGlobalFilterChange: OnChangeFn<string> = (updaterOrValue) => {
    setGlobalFilter((prev) =>
      typeof updaterOrValue === "function"
        ? updaterOrValue(prev)
        : updaterOrValue,
    );
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue,
  ) => {
    const nextPagination =
      typeof updaterOrValue === "function"
        ? updaterOrValue(pagination)
        : updaterOrValue;

    const normalizedQuery = globalFilter.trim() || undefined;
    const nextPage = nextPagination.pageIndex + 1;

    if (nextPage === page && nextPagination.pageSize === perPage) {
      return;
    }

    patchSearch({
      [searchKeys.query]: normalizedQuery,
      [searchKeys.page]: nextPage,
      [searchKeys.perPage]: nextPagination.pageSize,
    } as Partial<TSearch>);
  };

  return {
    status,
    sorting,
    onSortingChange: handleSortingChange,
    columnFilters,
    onColumnFiltersChange: handleColumnFiltersChange,
    globalFilter,
    onGlobalFilterChange: handleGlobalFilterChange,
    pagination,
    onPaginationChange: handlePaginationChange,
  };
};

export default useTableFilter;
