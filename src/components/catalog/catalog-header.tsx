import { useTranslation } from "react-i18next";
import AppliedFilters from "./applied-filters";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";

const CatalogHeader = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-2xl font-heading font-semibold">
        {t("catalog.title")}
      </h2>

      <AppliedFilters />
    </div>
  );
};

export default CatalogHeader;
