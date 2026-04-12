import { orderStatuses } from "@/data/orders";
import type { OrdersSearch } from "@/lib/schema";
import useTableFilter, { type TableFilterFrom } from "@/hooks/use-table-filter";

type UseOrderFilterProps = {
  from: Extract<
    TableFilterFrom,
    "/{-$locale}/admin/" | "/{-$locale}/admin/orders/"
  >;
  /*| "/{-$locale}/account/";*/
};

const useOrderFilter = ({ from }: UseOrderFilterProps) => {
  return {
    ...useTableFilter<
      OrdersSearch,
      "createdAt" | "amount",
      UseOrderFilterProps["from"],
      (typeof orderStatuses)[number]
    >({
      from,
      searchKeys: {
        query: "orderQ",
        sort: "sort",
        sortOrder: "sortOrder",
        page: "page",
        perPage: "perPage",
        status: "status",
        allowedSortIds: ["createdAt", "amount"],
      },
      defaultSorting: {
        id: "createdAt",
        desc: true,
      },
      defaultPerPage: 5,
      debounceMs: 300,
      statusValues: orderStatuses,
    }),
  };
};

export const useAdminOverviewOrderFilter = () =>
  useOrderFilter({ from: "/{-$locale}/admin/" });

export const useAdminOrdersRouteFilter = () =>
  useOrderFilter({ from: "/{-$locale}/admin/orders/" });

/*export const useAccountOrdersFilter = () =>
  useOrderFilter({ from: "/{-$locale}/account/" });*/

export default useOrderFilter;
