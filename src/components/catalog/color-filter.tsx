import { products } from "@/data/products";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import useLocale from "@/hooks/use-locale";

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
  const locale = useLocale();
  const colorOptions = Array.from(
    new Map(
      products
        .flatMap((product) =>
          product.options.colors.map((colorOption) => ({
            code: colorOption.code,
            label: colorOption.label[locale],
          })),
        )
        .map((option) => [option.code, option]),
    ).values(),
  );

  const selectedColors = Array.from(
    new Set(color?.filter((v): v is string => !!v) ?? []),
  );
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
          <div key={option.code} className="flex items-center gap-3">
            <Checkbox
              id={`color-${option.code}`}
              checked={selectedColors.includes(option.code)}
              value={option.code}
              onCheckedChange={() => {
                const next = Array.from(
                  new Set(toggleFilterValue(selectedColors, option.code)),
                );
                patchSearch({ color: next.length > 0 ? next : undefined });
              }}
            />
            <Label htmlFor={`color-${option.code}`} className="cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
