import { useMemo } from "react";

import { orders, orderStatuses } from "@/data/orders";
import { createAdminOrderColumns } from "@/components/orders/order-columns";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";

import { useAdminOverviewOrderFilter } from "@/hooks/use-order-filter";
import { globalOrderFilter } from "@/lib/dashboard-utils";
import DataTable from "../layout/data-table";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const RecentOrdersTable = () => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.admin);
  const locale = i18n.resolvedLanguage == "en" ? "en" : "cs";

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
  } = useAdminOverviewOrderFilter();

  const columns = useMemo(
    () => createAdminOrderColumns({ locale, t }),
    [locale, t],
  );

  return (
    <DataTable
      data={orders}
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
      toolbar={() => {
        const currentStatus = status ?? "all";

        return (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Input
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
              <SelectTrigger className="w-full sm:w-45">
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

export default RecentOrdersTable;
