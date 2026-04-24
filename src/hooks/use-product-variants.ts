import {
  findInStockSku,
  getAllColors,
  getAllSizes,
  hasInStockSku,
  matchesSelection,
} from "@/lib/product-utils";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useCartStore } from "@/stores/cart-store";
import type { Product, SizeCode, TypeCode } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useLocale from "./use-locale";

const useProductVariants = (product: Product) => {
  const { addItem, getQuantity } = useCartStore();
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);
  const locale = useLocale();

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
  const inStockSizeCodes = new Set(
    product.skus
      .filter(
        (sku) =>
          sku.stock > 0 && (!selectedColor || sku.color === selectedColor),
      )
      .map((sku) => sku.size),
  );
  const preferredSize =
    allSizes.find((size) => inStockSizeCodes.has(size.code))?.code ??
    allSizes[0]?.code;
  const [selectedSize, setSelectedSize] = useState<SizeCode | undefined>(
    preferredSize,
  );

  const selectedInStockSku = findInStockSku(
    product,
    selectedColor,
    selectedSize,
  );
  const selectedSku =
    selectedInStockSku ??
    product.skus.find((sku) =>
      matchesSelection(sku, selectedColor, selectedSize),
    );

  const currentSKU = selectedSku;
  const priceWithVariants = currentSKU?.price ?? product.basePrice;
  const isOutOfStock = !selectedInStockSku;

  const handleAddToCart = (quantity: number = 1) => {
    if (!selectedInStockSku || !selectedSize || !selectedColor) return;
    addItem({
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    const productName = product.name[locale];
    const variantInfo = `(${selectedSize.toUpperCase()} | ${selectedColor})`;
    toast.success(
      t("toast.addedToCart", {
        name: `${productName} ${variantInfo}`,
      }),
    );
  };

  const handleColorChange = (colorCode: TypeCode | undefined) => {
    setSelectedColor(colorCode);

    setSelectedSize((prevSize) => {
      if (hasInStockSku(product, colorCode, prevSize)) {
        return prevSize;
      }

      const newSizeWithStock = findInStockSku(
        product,
        colorCode,
        undefined,
      )?.size;

      return newSizeWithStock ?? prevSize;
    });
  };

  const handleSizeChange = (sizeCode: SizeCode | undefined) => {
    setSelectedSize(sizeCode);

    setSelectedColor((prevColor) => {
      if (hasInStockSku(product, prevColor, sizeCode)) {
        return prevColor;
      }

      const newColorWithStock = findInStockSku(
        product,
        undefined,
        sizeCode,
      )?.color;

      return newColorWithStock ?? prevColor;
    });
  };

  return {
    selectedColor,
    selectedSize,
    selectedInStockSku,
    selectedSku,
    currentSKU,
    priceWithVariants,
    isOutOfStock,
    allColors,
    allSizes,
    inStockColorCodes,
    inStockSizeCodes,
    handleAddToCart,
    handleColorChange,
    handleSizeChange,
    quantity: getQuantity(selectedInStockSku?.id ?? "") ?? 1,
  };
};

export default useProductVariants;
