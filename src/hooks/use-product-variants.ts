import {
  getAllColors,
  getAllSizes,
  getImageBySelectedColor,
} from "@/lib/product-utils";
import { useCartStore } from "@/stores/cart-store";
import type { Product, SizeCode, TypeCode } from "@/types";
import { useState } from "react";

const useProductVariants = (product: Product) => {
  const { addItem } = useCartStore();

  const matchesSelection = (
    sku: Product["skus"][number],
    color: TypeCode | undefined,
    size: SizeCode | undefined,
  ) => (!color || sku.color === color) && (!size || sku.size === size);

  const findInStockSku = (
    color: TypeCode | undefined,
    size: SizeCode | undefined,
  ) =>
    product.skus.find(
      (sku) => matchesSelection(sku, color, size) && sku.stock > 0,
    );

  const hasInStockSku = (
    color: TypeCode | undefined,
    size: SizeCode | undefined,
  ) =>
    product.skus.some(
      (sku) => matchesSelection(sku, color, size) && sku.stock > 0,
    );

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

  const selectedInStockSku = findInStockSku(selectedColor, selectedSize);
  const selectedSku =
    selectedInStockSku ??
    product.skus.find((sku) =>
      matchesSelection(sku, selectedColor, selectedSize),
    );

  const currentSKU = selectedSku;
  const priceWithColor = currentSKU?.price ?? product.basePrice;
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

  const handleColorChange = (colorCode: TypeCode | undefined) => {
    setSelectedColor(colorCode);

    setSelectedSize((prevSize) => {
      if (hasInStockSku(colorCode, prevSize)) {
        return prevSize;
      }

      const newSizeWithStock = findInStockSku(colorCode, undefined)?.size;

      return newSizeWithStock ?? prevSize;
    });
  };

  const handleSizeChange = (sizeCode: SizeCode | undefined) => {
    setSelectedSize(sizeCode);

    setSelectedColor((prevColor) => {
      if (hasInStockSku(prevColor, sizeCode)) {
        return prevColor;
      }

      const newColorWithStock = findInStockSku(undefined, sizeCode)?.color;

      return newColorWithStock ?? prevColor;
    });
  };

  return {
    selectedColor,
    selectedSize,
    selectedInStockSku,
    selectedSku,
    currentSKU,
    priceWithColor,
    isOutOfStock,
    images,
    allColors,
    allSizes,
    inStockColorCodes,
    inStockSizeCodes,
    handleAddToCart,
    handleColorChange,
    handleSizeChange,
  };
};

export default useProductVariants;
