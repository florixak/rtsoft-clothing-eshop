import { orderStatuses } from "@/data/orders";
import { getStatusVariantMap } from "@/lib/dashboard-utils";
import type { Languages } from "@/lib/i18n";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Order } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Badge } from "../ui/badge";
import createSortableHeader from "./sortable-header";

type OrderColumnsParams = {
  locale: Languages;
  t: TFunction<"account" | "admin", undefined>;
};

const columnHelper = createColumnHelper<Order>();

const statusColumn = ({ t }: Pick<OrderColumnsParams, "t">) =>
  columnHelper.accessor("status", {
    header: () => t("orders.table.status"),
    filterFn: (row, columnId, filterValue) => {
      if (
        typeof filterValue !== "string" ||
        filterValue.length === 0 ||
        !orderStatuses.includes(filterValue as Order["status"])
      )
        return true;
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

export const createAdminOrderColumns = ({ locale, t }: OrderColumnsParams) => {
  return [
    columnHelper.accessor("id", {
      header: () => t("orders.table.orderId"),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.id.toUpperCase()}</span>
      ),
    }),
    columnHelper.display({
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
    }),
    columnHelper.accessor("createdAt", {
      header: createSortableHeader(t("orders.table.date")),
      cell: ({ row }) => formatDate(row.original.createdAt, locale),
    }),
    columnHelper.accessor((order) => order.priceDetails.total, {
      id: "amount",
      header: createSortableHeader(t("orders.table.amount")),
      cell: ({ row }) => (
        <span className="font-medium">
          {formatPrice(row.original.priceDetails.total, locale)}
        </span>
      ),
    }),
    columnHelper.accessor((order) => order.paymentMethod.id, {
      id: "payment",
      header: () => t("orders.table.paymentMethod"),
      cell: ({ row }) => row.original.paymentMethod.name[locale],
    }),
    statusColumn({ t }),
  ];
};

export const createAccountOrderColumns = ({
  locale,
  t,
}: OrderColumnsParams) => {
  return [
    columnHelper.accessor("id", {
      header: () => t("orders.table.orderId"),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.id.toUpperCase()}</span>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: createSortableHeader(t("orders.table.date")),
      cell: ({ row }) => formatDate(row.original.createdAt, locale),
    }),
    columnHelper.accessor((order) => order.priceDetails.total, {
      id: "amount",
      header: createSortableHeader(t("orders.table.amount")),
      cell: ({ row }) => (
        <span className="font-medium">
          {formatPrice(row.original.priceDetails.total, locale)}
        </span>
      ),
    }),
    columnHelper.accessor((order) => order.paymentMethod.id, {
      id: "payment",
      header: () => t("orders.table.paymentMethod"),
      cell: ({ row }) => row.original.paymentMethod.name[locale],
    }),
    statusColumn({ t }),
  ];
};
