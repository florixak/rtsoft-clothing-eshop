import { products } from "@/data/products";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type ColorFilterProps = {
  color?: string[];
  patchSearch: (updates: Partial<{ color: string[] | undefined }>) => void;
  toggleFilterValue: (current: string[], value: string) => string[];
};

const ColorFilter = ({
  color,
  patchSearch,
  toggleFilterValue,
}: ColorFilterProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);
  const colorOptions = Array.from(
    new Set(
      products.flatMap((product) =>
        product.skus
          .filter((sku) => sku.stock > 0 && sku.color)
          .map((sku) => sku.color),
      ),
    ),
  );
  const selectedColors = color ?? [];
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor="color"
        className="uppercase text-base text-muted-foreground"
      >
        {t("filters.color")}
      </Label>
      <div id="color" className="grid grid-cols-2 gap-2">
        {colorOptions.map((option) => (
          <div key={option} className="flex items-center gap-3">
            <Checkbox
              id={`color-${option}`}
              checked={selectedColors.includes(option)}
              onCheckedChange={() => {
                const next = toggleFilterValue(selectedColors, option);
                patchSearch({ color: next.length > 0 ? next : undefined });
              }}
            />
            <Label htmlFor={`color-${option}`} className="cursor-pointer">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
