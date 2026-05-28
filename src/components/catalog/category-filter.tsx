import { categories } from "@/data";
import { createProductsQueryOptions } from "@/hooks/query-options";
import useLocale from "@/hooks/use-locale";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

type CategoryFilterProps = {
  category?: string;
  patchSearch: (updates: Partial<{ category: string | undefined }>) => void;
};

const CategoryFilter = ({ category, patchSearch }: CategoryFilterProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);
  const search = useSearch({ from: "/{-$locale}/" });
  const locale = useLocale();

  const handleSetCategory = (category: string) => {
    patchSearch({ category: category || undefined });
  };

  const {
    data: { information } = {
      information: { total: 0, minFilterPrice: 0, maxFilterPrice: 0 },
    },
  } = useSuspenseQuery(createProductsQueryOptions(search));

  return (
    <div className="flex flex-col gap-2">
      <h3 className="uppercase text-base text-muted-foreground">
        {t("filters.categories") + " (" + information.total + ")"}
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={category ? "outline" : "default"}
          onClick={() => handleSetCategory("")}
        >
          {t("filters.all")}
        </Button>
        {categories.map((entry) => (
          <Button
            key={entry.id}
            variant={category === entry.id ? "default" : "outline"}
            onClick={() => handleSetCategory(entry.id)}
          >
            {entry.name[locale]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
