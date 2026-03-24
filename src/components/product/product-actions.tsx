import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { SizeCode, TypeCode } from "@/types";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

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
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.product);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";
  const [toAddQuantity, setToAddQuantity] = useState<number>(1);

  const selectedColorLabel: string =
    allColors.find((color) => color.code === selectedColor)?.label[locale] ||
    t("color.notSelected");

  const selectedSizeLabel: string =
    allSizes.find((size) => size.code === selectedSize)?.label[locale] ||
    t("size.notSelected");

  const handleIncrement = () => {
    setToAddQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setToAddQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setToAddQuantity(value);
    } else {
      setToAddQuantity(1);
    }
  };

  return (
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
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <ButtonGroup>
          <Button
            variant="outline"
            onClick={handleDecrement}
            className="py-4"
            aria-label={t("quantity.decrease")}
          >
            <Minus size={16} />
          </Button>
          <Input
            type="number"
            className="w-16 py-4"
            min="1"
            value={toAddQuantity}
            onChange={handleInputChange}
            aria-label={t("quantity.label")}
          />
          <Button
            variant="outline"
            onClick={handleIncrement}
            className="py-4"
            aria-label={t("quantity.increase")}
          >
            <Plus size={16} />
          </Button>
        </ButtonGroup>

        <Button
          variant="default"
          size="default"
          className="cursor-pointer text-md px-4 py-4"
          disabled={isOutOfStock}
          onClick={() => handleAddToCart(toAddQuantity)}
        >
          <ShoppingBasket size={16} />
          {isOutOfStock ? t("addToCart.outOfStock") : t("addToCart.addToCart")}
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
