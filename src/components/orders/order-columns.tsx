import type { Languages } from "@/lib/i18n";
import { getStatusVariantMap } from "@/lib/dashboard-utils";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Order } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { TFunction } from "i18next";

type OrderColumnsParams = {
  locale: Languages;
  t: TFunction<"account" | "admin", undefined>;
};

const createSortableHeader = (label: string): ColumnDef<Order>["header"] => {
  return ({ column }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="-ml-2"
    >
      {label}
      <ArrowUpDown />
    </Button>
  );
};

const statusColumn = ({
  t,
}: Pick<OrderColumnsParams, "t">): ColumnDef<Order> => ({
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
});

export const createAdminOrderColumns = ({
  locale,
  t,
}: OrderColumnsParams): ColumnDef<Order>[] => {
  return [
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
      header: createSortableHeader(t("orders.table.date")),
      cell: ({ row }) => formatDate(row.original.createdAt, locale),
    },
    {
      id: "amount",
      accessorFn: (order) => order.priceDetails.total,
      header: createSortableHeader(t("orders.table.amount")),
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
    statusColumn({ t }),
  ];
};

export const createAccountOrderColumns = ({
  locale,
  t,
}: OrderColumnsParams): ColumnDef<Order>[] => {
  return [
    {
      accessorKey: "id",
      header: () => t("orders.table.orderId"),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.id.toUpperCase()}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: createSortableHeader(t("orders.table.date")),
      cell: ({ row }) => formatDate(row.original.createdAt, locale),
    },
    {
      id: "amount",
      accessorFn: (order) => order.priceDetails.total,
      header: createSortableHeader(t("orders.table.amount")),
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
    statusColumn({ t }),
  ];
};
