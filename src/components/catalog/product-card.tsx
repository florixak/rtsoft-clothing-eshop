import {
  findSKU,
  getAllColors,
  getAvailableColors,
  getAvailableSizes,
  getImageBySelectedColor,
  getTotalStock,
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

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();
  const { t, i18n } = useTranslation("catalog");

  const allColors = getAllColors(product);
  const inStockColorCodes = new Set(
    getAvailableColors(product).map((color) => color.code),
  );
  const preferredColor =
    allColors.find((color) => inStockColorCodes.has(color.code))?.code ??
    allColors[0]?.code;
  const [selectedColor, setSelectedColor] = useState<TypeCode | undefined>(
    preferredColor,
  );
  const availableSizes = getAvailableSizes(product);

  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  const currentSKU = findSKU(
    product.skus,
    availableSizes[0]?.code || product.options.sizes[0].code,
    selectedColor,
    product.options.material?.[0]?.code,
  );
  const priceWithColor = currentSKU?.price || product.basePrice;
  const stockOfSelectedVariant = currentSKU?.stock ?? 0;
  const availableStock = getTotalStock(product);
  const isOutOfStock = availableStock === 0 || stockOfSelectedVariant === 0;
  const images = getImageBySelectedColor(product, selectedColor);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      size: availableSizes[0]?.code || product.options.sizes[0].code,
      color: selectedColor,
      material: product.options.material?.[0]?.code,
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
              {allColors.slice(0, 3).map((color) => {
                const isSelected = selectedColor === color.code;
                const isOutOfStock = !inStockColorCodes.has(color.code);

                return (
                  <button
                    key={color.id}
                    type="button"
                    className={`text-xs border rounded px-2 py-0.5 transition-colors cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : isOutOfStock
                          ? "border-border text-muted-foreground opacity-50 cursor-not-allowed"
                          : "border-border hover:border-primary/70"
                    }`}
                    disabled={isOutOfStock}
                    onClick={() => {
                      if (isOutOfStock) return;
                      setSelectedColor(color.code);
                    }}
                  >
                    {color.label[locale]}
                  </button>
                );
              })}
              {allColors.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{allColors.length - 3}
                </span>
              )}
            </div>
          )}

          {availableSizes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 bg-background px-2 py-1 rounded">
              <span className="text-xs text-muted-foreground">
                {t("productCard.sizes")}:
              </span>
              {availableSizes.slice(0, 3).map((size) => (
                <span
                  key={size?.id}
                  className="text-xs border border-border rounded px-2 py-0.5 text-muted-foreground"
                >
                  {size?.label[locale]}
                </span>
              ))}

              {availableSizes.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{availableSizes.length - 3}
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

export default ProductCard;
