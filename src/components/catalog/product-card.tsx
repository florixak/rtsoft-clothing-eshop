import {
  MAX_COLORS_TO_SHOW_PER_CARD,
  MAX_SIZES_TO_SHOW_PER_CARD,
} from "@/constants";
import {
  getAllColors,
  getAllSizes,
  getImageBySelectedColor,
} from "@/lib/product-utils";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import type { Product, TypeCode } from "@/types";
import { Link } from "@tanstack/react-router";
import { ShoppingBasket, Star } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.catalog);

  const allColors = getAllColors(product);
  const inStockColorCodes = new Set(
    product.skus
      .filter((sku) => sku.stock > 0 && sku.color)
      .map((sku) => sku.color as TypeCode),
  );
  const preferredColor =
    allColors.find((color) => inStockColorCodes.has(color.code))?.code ??
    allColors[0]?.code;
  const [selectedColor, setSelectedColor] = useState<TypeCode | undefined>(
    preferredColor,
  );
  const allSizes = getAllSizes(product);
  const preferredSize =
    allSizes.find((size) =>
      product.skus.some(
        (sku) =>
          sku.stock > 0 &&
          sku.size === size.code &&
          (!preferredColor || sku.color === preferredColor),
      ),
    )?.code ?? allSizes[0]?.code;
  const [selectedSize, setSelectedSize] = useState(preferredSize);

  const selectedInStockSku = product.skus.find(
    (sku) =>
      (!selectedColor || sku.color === selectedColor) &&
      (!selectedSize || sku.size === selectedSize) &&
      sku.stock > 0,
  );
  const selectedSku =
    selectedInStockSku ??
    product.skus.find(
      (sku) =>
        (!selectedColor || sku.color === selectedColor) &&
        (!selectedSize || sku.size === selectedSize),
    );

  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  const currentSKU = selectedSku;
  const priceWithColor = currentSKU?.price || product.basePrice;
  const isOutOfStock = !selectedInStockSku;
  const images = getImageBySelectedColor(product, selectedColor);

  const handleAddToCart = () => {
    if (!selectedInStockSku || !selectedSize) return;

    addItem({
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <Card
      className="p-0 shadow-sm gap-2 overflow-hidden group max-w-sm w-full max-h-fit"
      key={product.id}
    >
      <CardHeader className="p-0 relative">
        <img
          src={images.primary}
          alt={product.name[locale]}
          className="max-h-100 md:max-h-80 lg:max-h-68 w-full object-cover group-hover:hidden"
          loading="lazy"
        />
        <img
          src={images.secondary}
          alt={product.name[locale]}
          className="max-h-100 md:max-h-80 lg:max-h-68 w-full object-cover hidden group-hover:block"
          loading="lazy"
        />
        <div className="absolute bottom-2 left-2 flex flex-col text-xs items-start gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity w-[calc(100%-1rem)]">
          {allColors.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 bg-background px-2 py-1 rounded">
              <span className="text-xs text-muted-foreground">
                {t("productCard.colors")}:
              </span>
              {allColors.slice(0, MAX_COLORS_TO_SHOW_PER_CARD).map((color) => {
                const isSelected = selectedColor === color.code;
                const isInStock = inStockColorCodes.has(color.code);

                return (
                  <ColorBadge
                    key={color.code}
                    color={color}
                    isSelected={isSelected}
                    isOutOfStock={!isInStock}
                    onClick={() => setSelectedColor(color.code)}
                  />
                );
              })}
              {allColors.length > MAX_COLORS_TO_SHOW_PER_CARD && (
                <span className="text-xs text-muted-foreground">
                  +{allColors.length - MAX_COLORS_TO_SHOW_PER_CARD}
                </span>
              )}
            </div>
          )}

          {allSizes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 bg-background px-2 py-1 rounded">
              <span className="text-xs text-muted-foreground">
                {t("productCard.sizes")}:
              </span>
              {allSizes.slice(0, MAX_SIZES_TO_SHOW_PER_CARD).map((size) => {
                const isSelected = selectedSize === size.code;
                const isInStock = product.skus.some(
                  (sku) =>
                    sku.stock > 0 &&
                    sku.size === size.code &&
                    (!selectedColor || sku.color === selectedColor),
                );
                return (
                  <SizeBadge
                    key={size.code}
                    size={size}
                    isSelected={isSelected}
                    isOutOfStock={!isInStock}
                    onClick={() => setSelectedSize(size.code)}
                  />
                );
              })}

              {allSizes.length > MAX_SIZES_TO_SHOW_PER_CARD && (
                <span className="text-xs text-muted-foreground">
                  +{allSizes.length - MAX_SIZES_TO_SHOW_PER_CARD}
                </span>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4 flex flex-col gap-4 justify-between h-full">
        <div className="flex flex-col gap-1">
          <div key={product.id} className="flex flex-row items-center gap-1">
            <Star size={16} className="inline-block text-yellow-500" />
            {product.rating}
            <span className="text-xs text-muted-foreground">
              {t("productCard.reviews", {
                count: product.reviewsCount,
              })}
            </span>
          </div>
          <h3 className="text-lg font-bold hover:underline cursor-pointer">
            <Link
              to="/{-$locale}/product/$productSlug"
              params={{ locale, productSlug: product.slug[locale] }}
            >
              {product.name[locale]}
            </Link>
          </h3>
          <p className="text-muted-foreground">{product.description[locale]}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">
            {formatPrice(priceWithColor, locale)}
          </p>
          <Button
            variant="default"
            size="default"
            className="cursor-pointer"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            <ShoppingBasket size={16} />
            {isOutOfStock
              ? t("productCard.outOfStock")
              : t("productCard.addToCart")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ColorBadge = ({
  color,
  isSelected,
  isOutOfStock,
  onClick,
}: {
  color: { code: TypeCode; label: Record<string, string> };
  isSelected: boolean;
  isOutOfStock: boolean;
  onClick: () => void;
}) => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.catalog);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  return (
    <button
      type="button"
      className={`relative text-xs border rounded px-2 py-0.5 transition-colors cursor-pointer 
        ${isSelected ? "border-primary bg-primary/10" : "border-border"} 
        ${isOutOfStock ? "opacity-60 border-dashed text-muted-foreground" : "hover:border-primary/70"}`}
      onClick={onClick}
      aria-label={`${color.label[locale]} - ${isOutOfStock ? t("productCard.outOfStock") : t("filters.availability.inStock")}`}
    >
      {color.label[locale]}
      {isOutOfStock && (
        <span className="ml-1 rounded bg-muted px-1 py-0 text-[10px]">
          {t("productCard.outOfStock")}
        </span>
      )}
    </button>
  );
};

const SizeBadge = ({
  size,
  isSelected,
  isOutOfStock,
  onClick,
}: {
  size: { code: string; label: Record<string, string> };
  isSelected: boolean;
  isOutOfStock: boolean;
  onClick: () => void;
}) => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.catalog);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  return (
    <button
      type="button"
      className={`relative text-xs border rounded px-2 py-0.5 transition-colors cursor-pointer 
        ${isSelected ? "border-primary bg-primary/10" : "border-border"} 
        ${isOutOfStock ? "opacity-60 border-dashed text-muted-foreground" : "hover:border-primary/70"}`}
      onClick={onClick}
      aria-label={`${size.label[locale]} - ${isOutOfStock ? t("productCard.outOfStock") : t("filters.availability.inStock")}`}
    >
      {size.label[locale]}
      {isOutOfStock && (
        <span className="ml-1 rounded bg-muted px-1 py-0 text-[10px]">
          {t("productCard.outOfStock")}
        </span>
      )}
    </button>
  );
};

export default ProductCard;
