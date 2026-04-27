import { useQuantityCounter } from "@/hooks/use-quantity-counter";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { SizeCode, TypeCode } from "@/types";
import { ShoppingBasket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import QuantityCounter from "./quantity-counter";
import useLocale from "@/hooks/use-locale";

type ProductActionsProps = {
  selectedColor: TypeCode | undefined;
  selectedSize: SizeCode | undefined;
  allColors: { code: TypeCode; label: Record<string, string> }[];
  allSizes: { code: SizeCode; label: Record<string, string> }[];
  handleColorChange: (colorCode: TypeCode) => void;
  handleSizeChange: (sizeCode: SizeCode) => void;
  handleAddToCart: (quantity?: number) => void;
  inStockColorCodes: Set<TypeCode>;
  inStockSizeCodes: Set<SizeCode>;
  isOutOfStock: boolean;
};

const ProductActions = ({
  selectedColor,
  selectedSize,
  allColors,
  allSizes,
  handleColorChange,
  handleSizeChange,
  handleAddToCart,
  inStockColorCodes,
  inStockSizeCodes,
  isOutOfStock,
}: ProductActionsProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.product);
  const { quantity, setQuantity } = useQuantityCounter();
  const locale = useLocale();

  const selectedColorLabel: string =
    allColors.find((color) => color.code === selectedColor)?.label[locale] ||
    t("color.notSelected");

  const selectedSizeLabel: string =
    allSizes.find((size) => size.code === selectedSize)?.label[locale] ||
    t("size.notSelected");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground uppercase">
          {t("color.label", { color: selectedColorLabel })}
        </span>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => {
            const isColorOutOfStock = !inStockColorCodes.has(color.code);
            const isColorSelected =
              selectedColor === color.code && !isColorOutOfStock;

            return (
              <Button
                key={color.code}
                variant={isColorSelected ? "default" : "outline"}
                size="sm"
                disabled={isColorOutOfStock}
                aria-pressed={isColorSelected}
                onClick={() => handleColorChange(color.code)}
              >
                {color.label[locale]}
                {isColorOutOfStock ? ` (${t("badge.outOfStock")})` : ""}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground uppercase">
          {t("size.label", { size: selectedSizeLabel })}
        </span>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => {
            const isSizeOutOfStock = !inStockSizeCodes.has(size.code);
            const isSizeSelected = selectedSize === size.code && !isSizeOutOfStock;

            return (
              <Button
                key={size.code}
                variant={isSizeSelected ? "default" : "outline"}
                size="sm"
                disabled={isSizeOutOfStock}
                aria-pressed={isSizeSelected}
                onClick={() => handleSizeChange(size.code)}
              >
                {size.label[locale]}
                {isSizeOutOfStock ? ` (${t("badge.outOfStock")})` : ""}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
        <QuantityCounter
          disabled={isOutOfStock}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />

        <Button
          variant="default"
          size="default"
          className="cursor-pointer text-md px-4 py-4"
          disabled={isOutOfStock}
          onClick={() => handleAddToCart(quantity)}
        >
          <ShoppingBasket size={16} />
          {isOutOfStock ? t("addToCart.outOfStock") : t("addToCart.addToCart")}
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
