import { useMemo } from "react";

import DataTable from "@/components/layout/data-table";
import { createAccountOrderColumns } from "@/components/table/order-columns";
import { Input } from "@/components/ui/input";
import { orderStatuses } from "@/data/orders";
import { createAccountOrdersQueryOptions } from "@/hooks/query-options";
import { useAccountOrdersFilter } from "@/hooks/use-order-filter";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { globalOrderFilter } from "@/lib/dashboard-utils";
import { getCurrentUserId } from "@/lib/auth";
import type { Order } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserOrdersTable = () => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.account);
  const locale = i18n.resolvedLanguage == "en" ? "en" : "cs";
  const navigate = useNavigate();
  const { data: userOrders } = useSuspenseQuery(
    createAccountOrdersQueryOptions(getCurrentUserId()),
  );

  const {
    status,
    sorting,
    columnFilters,
    globalFilter,
    pagination,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onPaginationChange,
    onSortingChange,
  } = useAccountOrdersFilter();

  const columns = useMemo(
    () => createAccountOrderColumns({ locale, t }) as ColumnDef<Order>[],
    [locale, t],
  );

  return (
    <DataTable
      data={userOrders}
      columns={columns}
      sorting={sorting}
      onSortingChange={onSortingChange}
      columnFilters={columnFilters}
      onColumnFiltersChange={onColumnFiltersChange}
      globalFilter={globalFilter}
      onGlobalFilterChange={onGlobalFilterChange}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      globalFilterFn={globalOrderFilter}
      emptyLabel={t("orders.noResults")}
      onRowClick={(row) =>
        navigate({
          to: "/{-$locale}/account/orders/$orderId",
          params: { orderId: row.id },
        })
      }
      toolbar={() => {
        const currentStatus = status ?? "all";

        return (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Input
              aria-label={t("orders.search")}
              value={globalFilter}
              onChange={(e) => onGlobalFilterChange(e.target.value)}
              placeholder={t("orders.search")}
              className="sm:max-w-sm"
            />
            <Select
              value={currentStatus}
              onValueChange={(value) =>
                onColumnFiltersChange((prev) => {
                  const newFilters = prev.filter((f) => f.id !== "status");
                  if (value !== "all") {
                    newFilters.push({ id: "status", value });
                  }
                  return newFilters;
                })
              }
            >
              <SelectTrigger
                aria-label={t("orders.table.status")}
                className="w-full sm:w-45"
              >
                <SelectValue>
                  {currentStatus === "all"
                    ? t("orders.status.all")
                    : t("orders.status." + currentStatus, {
                        defaultValue: currentStatus,
                      })}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("orders.status.all")}</SelectItem>
                {orderStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t("orders.status." + status, {
                      defaultValue: status,
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      }}
    />
  );
};

export default UserOrdersTable;
