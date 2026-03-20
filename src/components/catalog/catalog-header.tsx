import { useTranslation } from "react-i18next";
import AppliedFilters from "./applied-filters";

const CatalogHeader = () => {
  const { t } = useTranslation("catalog");

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-heading font-semibold">
        {t("catalog.title")}
      </h2>

      <AppliedFilters />
    </div>
  );
};

export default CatalogHeader;
