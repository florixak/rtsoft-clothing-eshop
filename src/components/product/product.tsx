import { createProductQueryOptions } from "@/hooks/query-options";
import useProductVariants from "@/hooks/use-product-variants";
import { findCategoryById } from "@/lib/category-utils";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { Route } from "@/routes/{-$locale}/product/$productSlug";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShoppingBasket, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import type { SizeCode, TypeCode } from "@/types";
import { Separator } from "../ui/separator";

const Product = () => {
  const { productSlug } = Route.useParams();
  const { data: product } = useSuspenseQuery(
    createProductQueryOptions(productSlug),
  );
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.product);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";
  const category =
    findCategoryById(product?.categoryId ?? "")?.name[locale] ?? "";

  const {
    selectedSize,
    allSizes,
    selectedColor,
    allColors,
    handleAddToCart,
    handleColorChange,
    handleSizeChange,
    inStockColorCodes,
    inStockSizeCodes,
    isOutOfStock,
    images,
  } = useProductVariants(product);

  const selectedColorLabel =
    allColors.find((color) => color.code === selectedColor)?.label[locale] ||
    t("color.notSelected");
  const selectedSizeLabel =
    allSizes.find((size) => size.code === selectedSize)?.label[locale] ||
    t("size.notSelected");

  return (
    <section className="max-w-5xl mx-auto flex flex-col gap-6 py-8">
      <Breadcrumb className="uppercase text-muted-foreground">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-xs" href="/">
              {t("breadcrumbs.home")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-xs"
              href={`/?category=${product?.categoryId}`}
            >
              {category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xs">
              {product?.name[locale]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-col gap-4 w-full">
          {images.primary ? (
            <img
              src={images.primary}
              alt={product.name[locale]}
              className="size-100 object-cover rounded shadow-image"
            />
          ) : (
            <div className="size-100 bg-muted rounded shadow-image" />
          )}
          <div className="flex flex-row gap-4 items-center justify-center w-full">
            {images.secondary && (
              <img
                src={images.secondary}
                alt={product.name[locale]}
                className="size-25 object-cover rounded shadow-image"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <Badge className="text-xs uppercase">{category}</Badge>
              <div
                key={product?.id}
                className="flex flex-row items-center gap-1 text-sm"
              >
                <Star size={16} className="inline-block text-yellow-500" />
                {product?.rating}
                <span className="text-xs text-muted-foreground">
                  {t("rating.reviews", {
                    count: product?.reviewsCount,
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-bold">{product?.name[locale]}</h2>
                <h3 className="text-xl">
                  {formatPrice(product?.basePrice ?? 0, locale)}
                </h3>
              </div>

              <p className="text-base text-muted-foreground">
                {product?.description[locale]}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground uppercase">
                {t("color.label", { color: selectedColorLabel })}
              </span>
              <Select
                onValueChange={(value) => handleColorChange(value as TypeCode)}
                defaultValue={selectedColor}
                value={selectedColor}
                disabled={allColors.length === 0}
              >
                <SelectTrigger className="px-4 py-2 hover:bg-primary/90 transition">
                  {selectedColorLabel}
                </SelectTrigger>
                <SelectContent>
                  {allColors.map((color) => {
                    const isOutOfStock = !inStockColorCodes.has(color.code);
                    return (
                      <SelectItem
                        key={color.code}
                        value={color.code}
                        disabled={isOutOfStock}
                        className="flex items-center gap-2"
                      >
                        {color.label[locale]}
                        {isOutOfStock && (
                          <span className="ml-1 rounded bg-muted px-1 py-0 text-[10px]">
                            {t("badge.outOfStock")}
                          </span>
                        )}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground uppercase">
                {t("size.label", { size: selectedSizeLabel })}
              </span>
              <Select
                onValueChange={(value) => handleSizeChange(value as SizeCode)}
                defaultValue={selectedSize}
                value={selectedSize}
                disabled={allSizes.length === 0}
              >
                <SelectTrigger
                  className="px-4 py-2 hover:bg-primary/90 transition"
                  disabled={allSizes.length === 0}
                >
                  {selectedSizeLabel}
                </SelectTrigger>
                <SelectContent>
                  {allSizes.map((size) => {
                    const isOutOfStock = !inStockSizeCodes.has(size.code);
                    return (
                      <SelectItem
                        key={size.code}
                        value={size.code}
                        disabled={isOutOfStock}
                        className="flex items-center gap-2"
                      >
                        {size.label[locale]}
                        {isOutOfStock && (
                          <span className="ml-1 rounded bg-muted px-1 py-0 text-[10px]">
                            {t("badge.outOfStock")}
                          </span>
                        )}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button
                variant="default"
                size="default"
                className="cursor-pointer text-xl px-8 py-6"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                <ShoppingBasket size={16} />
                {isOutOfStock
                  ? t("addToCart.outOfStock")
                  : t("addToCart.addToCart")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-8" />
      <div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold uppercase">
            {t("specifications.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("specifications.subtitle", { name: product?.name[locale] })}
          </p>
        </div>
      </div>
      <Separator className="my-8" />
      <div>
        <h2 className="text-xl font-bold uppercase">{t("reviews.title")}</h2>
        <p className="text-muted-foreground">
          {t("reviews.subtitle", { count: product?.reviewsCount })}
        </p>
      </div>
    </section>
  );
};

export default Product;
