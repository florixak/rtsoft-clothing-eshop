import type { Product } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import createSortableHeader from "./sortable-header";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Languages } from "@/lib/i18n";

type ProductColumnsParams = {
  locale: Languages;
  t: TFunction<"admin", undefined>;
};

const columnHelper = createColumnHelper<Product>();

export const createAdminProductColumns = ({
  locale,
  t,
}: ProductColumnsParams) => {
  return [
    columnHelper.accessor("id", {
      header: () => t("products.table.productId"),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.id.toUpperCase()}</span>
      ),
    }),
    columnHelper.display({
      id: "name",
      header: () => t("products.table.title"),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span>{row.original.name[locale]}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.name[locale]}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: createSortableHeader(t("products.table.dateAdded")),
      cell: ({ row }) => formatDate(row.original.createdAt, locale),
    }),
    columnHelper.accessor((product) => product.basePrice, {
      id: "amount",
      header: createSortableHeader(t("products.table.price")),
      cell: ({ row }) => (
        <span className="font-medium">
          {formatPrice(row.original.basePrice, locale)}
        </span>
      ),
    }),
    columnHelper.accessor(
      (product) => product.skus.reduce((sum, sku) => sum + sku.stock, 0),
      {
        id: "stock",
        header: () => t("products.table.stock"),
        cell: ({ getValue }) => {
          const totalStock = getValue();
          return (
            <span
              className={`font-medium ${totalStock > 0 ? "" : "text-destructive"}`}
            >
              {totalStock}
            </span>
          );
        },
      },
    ),
  ];
};
