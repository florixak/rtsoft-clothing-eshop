import useDebounce from "@/hooks/use-debounce";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { getProducts } from "@/lib/product-utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useEffectEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

type PriceRangeFilterProps = {
  priceRange?: string;
  patchSearch: (updates: Partial<{ priceRange: string | undefined }>) => void;
};

const PriceRangeFilter = ({
  priceRange,
  patchSearch,
}: PriceRangeFilterProps) => {
  const search = useSearch({ from: "/{-$locale}/" });
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);
  const {
    data: { information } = {
      information: { total: 0, minFilterPrice: 0, maxFilterPrice: 0 },
    },
  } = useSuspenseQuery({
    queryKey: ["products", search],
    queryFn: () => getProducts(search),
  });

  const [priceRangeState, setPriceRange] = useState<string | undefined>(
    search.priceRange,
  );

  const setPriceRangeEffect = useEffectEvent((value: string | undefined) => {
    setPriceRange(value);
  });

  useEffect(() => {
    setPriceRangeEffect(search.priceRange);
  }, [search.priceRange]);

  useDebounce({
    value: priceRangeState,
    delay: 100,
    onDebounce: (value) => {
      patchSearch({ priceRange: value });
    },
  });

  const handleSetPriceRange = (min: number, max: number) => {
    const baseMin = information.minFilterPrice;
    const baseMax = information.maxFilterPrice;
    const safeMin = Math.max(baseMin, Math.floor(min));
    const safeMax = Math.min(baseMax, Math.floor(max));
    setPriceRange(`${safeMin}-${safeMax}`);
  };

  const baseMin = information.minFilterPrice;
  const baseMax = information.maxFilterPrice;
  const effectivePriceRange = priceRangeState ?? priceRange;
  const parsedRange = effectivePriceRange?.split("-").map(Number) ?? [];
  const rawMin = Number.isFinite(parsedRange[0]) ? parsedRange[0] : baseMin;
  const rawMax = Number.isFinite(parsedRange[1]) ? parsedRange[1] : baseMax;
  const minFilterPrice = Math.max(baseMin, Math.min(rawMin, baseMax));
  const maxFilterPrice = Math.max(minFilterPrice, Math.min(rawMax, baseMax));

  const stepCount = Math.floor((baseMax - baseMin) / 100);

  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor="price-range"
        className="uppercase text-base text-muted-foreground"
      >
        {t("filters.priceRange")}
      </Label>
      <Slider
        value={[minFilterPrice, maxFilterPrice]}
        max={baseMax}
        min={baseMin}
        step={stepCount > 0 ? Math.floor((baseMax - baseMin) / stepCount) : 1}
        id="price-range"
        className="w-full"
        onValueChange={(value) => {
          const next = Array.isArray(value) ? value : [value, value];
          handleSetPriceRange(next[0], next[1]);
        }}
      />
      <div className="flex gap-20">
        <Input
          placeholder={t("filters.minPrice")}
          type="number"
          value={effectivePriceRange ? String(minFilterPrice) : ""}
          onChange={(event) => {
            if (event.target.value === "") {
              setPriceRange(undefined);
              return;
            }
            const next = Number(event.target.value);
            if (!Number.isFinite(next)) return;
            handleSetPriceRange(next, maxFilterPrice);
          }}
        />
        <Input
          placeholder={t("filters.maxPrice")}
          type="number"
          value={effectivePriceRange ? String(maxFilterPrice) : ""}
          onChange={(event) => {
            if (event.target.value === "") {
              setPriceRange(undefined);
              return;
            }
            const next = Number(event.target.value);
            if (!Number.isFinite(next)) return;
            handleSetPriceRange(minFilterPrice, next);
          }}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
