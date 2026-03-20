import { products } from "@/data";
import { useTranslation } from "react-i18next";
import AppliedFilters from "./applied-filters";

const CatalogHeader = () => {
  const { t } = useTranslation("catalog");
  const countOfProducts = products.length;
  const showingFrom = 1;
  const showingTo = countOfProducts < 12 ? countOfProducts : 12;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-heading font-semibold">
          {t("catalog.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("catalog.showing", {
            from: showingFrom,
            to: showingTo,
            total: countOfProducts,
          })}
        </p>
      </div>
      <AppliedFilters />
    </div>
  );
};

export default CatalogHeader;
