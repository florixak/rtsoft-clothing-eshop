import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useMemo } from "react";

import { orders, orderStatuses } from "@/data/orders";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Order } from "@/types";
import { useTranslation } from "react-i18next";

import useOrderFilter from "@/hooks/use-order-filter";
import { getStatusVariantMap, globalOrderFilter } from "@/lib/dashboard-utils";
import DataTable from "../layout/data-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
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
    sorting,
    columnFilters,
    globalFilter,
    pagination,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onPaginationChange,
    onSortingChange,
  } = useOrderFilter({ from: "/{-$locale}/admin/" });

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => t("orders.table.orderId"),
        cell: ({ row }) => (
          <span className="font-medium">{row.original.id.toUpperCase()}</span>
        ),
      },
      {
        id: "customer",
        header: () => t("orders.table.customer"),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span>
              {row.original.customer.firstName} {row.original.customer.lastName}
            </span>
            <span className="text-xs text-muted-foreground">
              {row.original.customer.email}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-2"
          >
            {t("orders.table.date")}
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => formatDate(row.original.createdAt, locale),
      },
      {
        id: "amount",
        accessorFn: (order) => order.priceDetails.total,
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-2"
          >
            {t("orders.table.amount")}
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="font-medium">
            {formatPrice(row.original.priceDetails.total, locale)}
          </span>
        ),
      },
      {
        id: "payment",
        accessorFn: (order) => order.paymentMethod.id,
        header: () => t("orders.table.paymentMethod"),
        cell: ({ row }) => row.original.paymentMethod.name[locale],
      },
      {
        accessorKey: "status",
        header: () => t("orders.table.status"),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) return true;
          return row.getValue(columnId) === filterValue;
        },
        cell: ({ row }) => {
          const status = row.original.status;
          const translationKey = "orders.status." + status;
          return (
            <Badge variant={getStatusVariantMap()[status]}>
              {t(translationKey, { defaultValue: status })}
            </Badge>
          );
        },
      },
    ],
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
                <SelectValue placeholder={t("orders.status.all")} />
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
