import { useMemo } from "react";

import DataTable from "@/components/layout/data-table";
import { createAdminProductColumns } from "@/components/table/product-columns";
import { Input } from "@/components/ui/input";
import { createAdminProductsQueryOptions } from "@/hooks/query-options";
import useProductFilter from "@/hooks/use-product-filter";
import { createGlobalProductFilter } from "@/lib/dashboard-utils";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Product } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

const AdminProductsTable = () => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.admin);
  const locale = i18n.resolvedLanguage == "en" ? "en" : "cs";

  const { data: products } = useSuspenseQuery(
    createAdminProductsQueryOptions(),
  );

  const {
    sorting,
    columnFilters,
    globalFilter,
    pagination,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onPaginationChange,
    onSortingChange,
  } = useProductFilter();

  const columns = useMemo(
    () => createAdminProductColumns({ locale, t }) as ColumnDef<Product>[],
    [locale, t],
  );

  return (
    <DataTable
      data={products}
      columns={columns}
      sorting={sorting}
      onSortingChange={onSortingChange}
      columnFilters={columnFilters}
      onColumnFiltersChange={onColumnFiltersChange}
      globalFilter={globalFilter}
      onGlobalFilterChange={onGlobalFilterChange}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      globalFilterFn={createGlobalProductFilter(locale)}
      emptyLabel={t("products.noResults")}
      onRowClick={(row) => console.log("click ", row.id)}
      toolbar={() => {
        return (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Input
              aria-label={t("products.search")}
              value={globalFilter}
              onChange={(e) => onGlobalFilterChange(e.target.value)}
              placeholder={t("products.search")}
              className="sm:max-w-sm"
            />
          </div>
        );
      }}
    />
  );
};

export default AdminProductsTable;
