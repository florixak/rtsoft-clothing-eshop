import { SORT_BY_OPTIONS, type SortOptions } from "@/data/products";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

type SortFilterProps = {
  sort?: SortOptions;
  patchSearch: (updates: Partial<{ sort: SortOptions | undefined }>) => void;
};

const SortFilter = ({ sort, patchSearch }: SortFilterProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);

  const handleSetSort = (sort: string) => {
    patchSearch({ sort: (sort as SortOptions) || undefined });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor="sort"
        className="uppercase text-base text-muted-foreground"
      >
        {t("filters.sortBy")}
      </Label>
      <Select
        id="sort"
        value={sort ?? undefined}
        onValueChange={(value) => handleSetSort(value || "")}
      >
        <SelectTrigger className="w-full">
          {SORT_BY_OPTIONS.find((option) => option === sort)
            ? t(`filters.sortByOptions.${sort}`)
            : t("filters.selectAnOption")}
        </SelectTrigger>
        <SelectContent>
          {SORT_BY_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {t(`filters.sortByOptions.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilter;
