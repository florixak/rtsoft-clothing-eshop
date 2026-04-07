import { orderStatuses } from "@/data/orders";
import type { OrderStatus } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type {
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

type UseOrderFilterProps = {
  from: "/{-$locale}/admin/" | "/{-$locale}/admin/orders/";
  /*| "/{-$locale}/account/";*/
};

type OrderTableSearch = {
  q?: string;
  sort?: string;
  sortOrder?: "asc" | "desc";
  status?: OrderStatus;
  page?: number;
  perPage?: number;
};

const useOrderFilter = ({ from }: UseOrderFilterProps) => {
  const search = useSearch({ from }) as OrderTableSearch;
  const { q, sort, sortOrder, status, page, perPage } = search;
  const navigate = useNavigate({ from });
  const patchSearch = (
    updates: Partial<{
      q: string | undefined;
      sort: "createdAt" | "amount" | undefined;
      sortOrder: "asc" | "desc" | undefined;
      status: OrderStatus | undefined;
      page: number;
      perPage: number;
    }>,
  ) => {
    navigate({
      search: (prev) => ({ ...prev, ...updates }),
      replace: true,
      resetScroll: false,
    });
  };

  const sorting: SortingState = sort
    ? [{ id: sort, desc: sortOrder !== "asc" }]
    : [{ id: "createdAt", desc: true }];

  const columnFilters: ColumnFiltersState = status
    ? [{ id: "status", value: status }]
    : [];

  const globalFilter = q ?? "";

  const pagination: PaginationState = {
    pageIndex: Math.max((page ?? 1) - 1, 0),
    pageSize: perPage ?? 5,
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    const nextSorting =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting)
        : updaterOrValue;
    const firstSort = nextSorting[0];

    patchSearch({
      sort: firstSort?.id as "createdAt" | "amount" | undefined,
      sortOrder: firstSort ? (firstSort.desc ? "desc" : "asc") : undefined,
      page: 1,
    });
  };

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (
    updaterOrValue,
  ) => {
    const nextFilters =
      typeof updaterOrValue === "function"
        ? updaterOrValue(columnFilters)
        : updaterOrValue;

    const statusFilter = nextFilters.find((filter) => filter.id === "status");
    const statusValue =
      typeof statusFilter?.value === "string" ? statusFilter.value : undefined;
    const nextStatus = orderStatuses.includes(statusValue as OrderStatus)
      ? (statusValue as OrderStatus)
      : undefined;

    patchSearch({ status: nextStatus, page: 1 });
  };

  const handleGlobalFilterChange: OnChangeFn<string> = (updaterOrValue) => {
    const nextValue =
      typeof updaterOrValue === "function"
        ? updaterOrValue(globalFilter)
        : updaterOrValue;
    const normalizedValue = nextValue.trim();
    patchSearch({ q: normalizedValue || undefined, page: 1 });
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue,
  ) => {
    const nextPagination =
      typeof updaterOrValue === "function"
        ? updaterOrValue(pagination)
        : updaterOrValue;

    patchSearch({
      page: nextPagination.pageIndex + 1,
      perPage: nextPagination.pageSize,
    });
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

export const useAdminOverviewOrderFilter = () =>
  useOrderFilter({ from: "/{-$locale}/admin/" });

export const useAdminOrdersRouteFilter = () =>
  useOrderFilter({ from: "/{-$locale}/admin/orders/" });

/*export const useAccountOrdersFilter = () =>
  useOrderFilter({ from: "/{-$locale}/account/" });*/

export default useOrderFilter;
