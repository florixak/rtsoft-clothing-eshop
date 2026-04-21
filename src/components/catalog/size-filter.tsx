import { products } from "@/data";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";

type SizeFilterProps = {
  size?: string[];
  patchSearch: (updates: Partial<{ size: string[] | undefined }>) => void;
  toggleFilterValue: (current: string[], value: string) => string[];
};

const SizeFilter = ({
  size,
  patchSearch,
  toggleFilterValue,
}: SizeFilterProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);
  const sizeOptions = Array.from(
    new Set(
      products.flatMap((product) =>
        product.skus.filter((sku) => sku.stock > 0).map((sku) => sku.size),
      ),
    ),
  );

  const selectedSizes = size ?? [];
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor="size"
        className="uppercase text-base text-muted-foreground"
      >
        {t("filters.size")}
      </Label>
      <div id="size" className="flex flex-wrap items-center gap-2">
        {sizeOptions.map((option) => (
          <Button
            key={option}
            id={`size-${option}`}
            variant={selectedSizes.includes(option) ? "default" : "outline"}
            onClick={() => {
              const next = toggleFilterValue(selectedSizes, option);
              patchSearch({ size: next.length > 0 ? next : undefined });
            }}
          >
            {option.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;
