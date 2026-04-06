import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";

import { orders, orderStatuses } from "@/data/orders";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Order } from "@/types";
import { useTranslation } from "react-i18next";

import { getStatusVariantMap, globalOrderFilter } from "@/lib/dashboard-utils";
import DataTable from "../layout/data-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const RecentOrders = () => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.admin);
  const locale = i18n.resolvedLanguage == "en" ? "en" : "cs";

  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

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
        header: () => "Payment",
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
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {t("overview.recentTransactions.title")}
        </h2>
      </CardHeader>

      <CardContent>
        <DataTable
          data={orders}
          columns={columns}
          sorting={sorting}
          onSortingChange={setSorting}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilterFn={globalOrderFilter}
          emptyLabel="No orders found."
          toolbar={(table) => {
            const statusColumn = table.getColumn("status");
            const currentStatus = String(
              statusColumn?.getFilterValue() ?? t("orders.status.all"),
            );

            return (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Input
                  value={globalFilter}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  placeholder={t("orders.search")}
                  className="sm:max-w-sm"
                />

                <Select
                  value={currentStatus}
                  onValueChange={(value) => {
                    if (value === t("orders.status.all")) {
                      statusColumn?.setFilterValue(undefined);
                      return;
                    }
                    statusColumn?.setFilterValue(value);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder={t("orders.status.all")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={t("orders.status.all")}>
                      {t("orders.status.all")}
                    </SelectItem>
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
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
