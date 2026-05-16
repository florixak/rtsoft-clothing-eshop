import useDebounce from "@/hooks/use-debounce";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { getProducts } from "@/lib/product-utils";
import { clamp } from "@/lib/utils";
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
  const searchWithoutPriceRange = { ...search, priceRange: undefined };
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);
  const {
    data: { information } = {
      information: { total: 0, minFilterPrice: 0, maxFilterPrice: 0 },
    },
  } = useSuspenseQuery({
    queryKey: ["products", "bounds", searchWithoutPriceRange],
    queryFn: () => getProducts(searchWithoutPriceRange),
  });

  const [priceRangeState, setPriceRange] = useState<string | undefined>(
    search.priceRange,
  );

  const baseMin = information.minFilterPrice;
  const baseMax = information.maxFilterPrice;
  const effectivePriceRange =
    priceRangeState ?? priceRange ?? `${baseMin}-${baseMax}`;
  const parsedRange = effectivePriceRange?.split("-").map(Number) ?? [];
  const rawMin = Number.isFinite(parsedRange[0]) ? parsedRange[0] : baseMin;
  const rawMax = Number.isFinite(parsedRange[1]) ? parsedRange[1] : baseMax;
  const minFilterPrice = Math.max(baseMin, Math.min(rawMin, baseMax));
  const maxFilterPrice = Math.max(minFilterPrice, Math.min(rawMax, baseMax));

  const [minRaw, setMinRaw] = useState<string>(String(minFilterPrice));
  const [maxRaw, setMaxRaw] = useState<string>(String(maxFilterPrice));

  const setPriceRangeEffect = useEffectEvent((value: string | undefined) => {
    setPriceRange(value);
  });

  useEffect(() => {
    setPriceRangeEffect(search.priceRange);
  }, [search.priceRange]);

  const setMinRawEffect = useEffectEvent((value: string) => {
    setMinRaw(value);
  });

  const setMaxRawEffect = useEffectEvent((value: string) => {
    setMaxRaw(value);
  });

  useEffect(() => {
    setMinRawEffect(String(minFilterPrice));
    setMaxRawEffect(String(maxFilterPrice));
  }, [minFilterPrice, maxFilterPrice]);

  useDebounce({
    value: priceRangeState,
    delay: 100,
    onDebounce: (value) => {
      patchSearch({ priceRange: value });
    },
  });

  const handleSetPriceRange = (min: number, max: number) => {
    const nextMin = clamp(Math.floor(min), baseMin, baseMax);
    const nextMax = clamp(Math.floor(max), baseMin, baseMax);
    setPriceRange(
      `${Math.min(nextMin, nextMax)}-${Math.max(nextMin, nextMax)}`,
    );
  };

  const commitMin = (raw: string) => {
    const parsed = Number(raw);
    const next = Number.isFinite(parsed) && raw !== "" ? parsed : baseMin;
    const clamped = clamp(Math.floor(next), baseMin, baseMax);
    handleSetPriceRange(clamped, maxFilterPrice);
    setMinRaw(String(clamped));
  };

  const commitMax = (raw: string) => {
    const parsed = Number(raw);
    const next = Number.isFinite(parsed) && raw !== "" ? parsed : baseMax;
    const clamped = clamp(Math.floor(next), baseMin, baseMax);
    handleSetPriceRange(minFilterPrice, clamped);
    setMaxRaw(String(clamped));
  };

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
          min={baseMin}
          max={baseMax}
          value={minRaw}
          onChange={(e) => setMinRaw(e.target.value)}
          onBlur={() => commitMin(minRaw)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitMin(minRaw);
          }}
        />
        <Input
          placeholder={t("filters.maxPrice")}
          type="number"
          min={baseMin}
          max={baseMax}
          value={maxRaw}
          onChange={(e) => setMaxRaw(e.target.value)}
          onBlur={() => commitMax(maxRaw)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitMax(maxRaw);
          }}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
