import { categories } from "@/data";
import { products, SORT_BY_OPTIONS, type SortOptions } from "@/data/products";
import useDebounce from "@/hooks/use-debounce";
import { getProducts } from "@/lib/product-utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";

const CatalogFilter = () => {
  const search = useSearch({ from: "/{-$locale}/" });
  const { t, i18n } = useTranslation("catalog");
  const { category, sort, priceRange, size, color } = search;
  const { rating, availability } = search;
  const navigate = useNavigate({ from: "/{-$locale}/" });
  const {
    data: { information } = {
      information: { total: 0, minFilterPrice: 0, maxFilterPrice: 0 },
    },
  } = useQuery({
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

  const language = i18n.resolvedLanguage === "en" ? "en" : "cs";

  const sizeOptions = Array.from(
    new Set(
      products.flatMap((product) =>
        product.skus.filter((sku) => sku.stock > 0).map((sku) => sku.size),
      ),
    ),
  );
  const colorOptions = Array.from(
    new Set(
      products.flatMap((product) =>
        product.skus
          .filter((sku) => sku.stock > 0 && sku.color)
          .map((sku) => sku.color),
      ),
    ),
  );
  const patchSearch = (
    updates: Partial<{
      category: string | undefined;
      sort: SortOptions | undefined;
      priceRange: string | undefined;
      size: string | undefined;
      color: string | undefined;
      rating: number | undefined;
      availability: "inStock" | "outOfStock" | undefined;
    }>,
  ) => {
    navigate({
      search: (prev) => ({ ...prev, ...updates, page: 1 }),
      replace: true,
    });
  };

  const handleSetCategory = (category: string) => {
    patchSearch({ category: category || undefined });
  };

  const handleSetSort = (sort: string) => {
    patchSearch({ sort: (sort as SortOptions) || undefined });
  };

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
    <aside className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-2">
        <h3 className="uppercase text-base text-muted-foreground">
          {t("filters.categories")}
        </h3>
        <ul className="flex flex-wrap items-center gap-2">
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
              {entry.name[language]}
            </Button>
          ))}
        </ul>
      </div>
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
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="rating"
          className="uppercase text-base text-muted-foreground"
        >
          {t("filters.rating")}
        </Label>
        <RadioGroup
          id="rating"
          value={rating ? String(rating) : undefined}
          onValueChange={(value) => {
            const next = Number(value);
            patchSearch({ rating: Number.isFinite(next) ? next : undefined });
          }}
          className="flex flex-row items-center justify-start"
        >
          <RadioGroupItem
            value="5"
            id="rating-5"
            className="peer sr-only absolute"
          />
          <Button
            variant="outline"
            className="w-fit"
            render={
              <Label
                htmlFor="rating-5"
                className="flex items-center gap-2 cursor-pointer"
              >
                5<Star size={16} className="text-yellow-500" />
              </Label>
            }
          />
          <RadioGroupItem
            value="4"
            id="rating-4"
            className="peer sr-only absolute"
          />
          <Button
            variant="outline"
            className="w-fit"
            render={
              <Label
                htmlFor="rating-4"
                className="flex items-center gap-2 cursor-pointer"
              >
                4+
                <Star size={16} className="text-yellow-500" />
              </Label>
            }
          />
          <RadioGroupItem
            value="3"
            id="rating-3"
            className="peer sr-only absolute"
          />
          <Button
            variant="outline"
            className="w-fit"
            render={
              <Label
                htmlFor="rating-3"
                className="flex items-center gap-2 cursor-pointer"
              >
                3+
                <Star size={16} className="text-yellow-500" />
              </Label>
            }
          />
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="size"
          className="uppercase text-base text-muted-foreground"
        >
          {t("filters.size")}
        </Label>
        <Select
          id="size"
          value={size ?? undefined}
          onValueChange={(value) => patchSearch({ size: value || undefined })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("filters.selectAnOption")} />
          </SelectTrigger>
          <SelectContent>
            {sizeOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="color"
          className="uppercase text-base text-muted-foreground"
        >
          {t("filters.color")}
        </Label>
        <Select
          id="color"
          value={color ?? undefined}
          onValueChange={(value) => patchSearch({ color: value || undefined })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("filters.selectAnOption")} />
          </SelectTrigger>
          <SelectContent>
            {colorOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="uppercase text-base text-muted-foreground">
          {t("filters.availability.title")}
        </Label>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Input
              type="checkbox"
              id="in-stock"
              className="size-4 accent-accent-foreground"
              checked={availability === "inStock"}
              onChange={(event) =>
                patchSearch({
                  availability: event.target.checked ? "inStock" : undefined,
                })
              }
            />
            <Label
              htmlFor="in-stock"
              className="flex items-center gap-2 cursor-pointer"
            >
              <span>{t("filters.availability.inStock")}</span>
            </Label>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="checkbox"
              id="pre-order"
              className="size-4 accent-accent-foreground"
              checked={availability === "outOfStock"}
              onChange={(event) =>
                patchSearch({
                  availability: event.target.checked ? "outOfStock" : undefined,
                })
              }
            />
            <Label
              htmlFor="pre-order"
              className="flex items-center gap-2 cursor-pointer"
            >
              <span>{t("filters.availability.outOfStock")}</span>
            </Label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CatalogFilter;
