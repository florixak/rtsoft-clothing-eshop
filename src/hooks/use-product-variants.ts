import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import {
  findInStockSku,
  getAllColors,
  getAllSizes,
  hasInStockSku,
  matchesSelection,
} from "@/lib/product-utils";
import { useCartStore } from "@/stores/cart-store";
import type { Product, SizeCode, TypeCode } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useLocale from "./use-locale";

const getPreferredColor = (product: Product) => {
  const allColors = getAllColors(product);
  const inStockColorCodes = new Set(
    product.skus
      .filter((sku) => sku.stock > 0 && sku.color)
      .map((sku) => sku.color as TypeCode),
  );

  return (
    allColors.find((color) => inStockColorCodes.has(color.code))?.code ??
    allColors[0]?.code
  );
};

const getPreferredSize = (
  product: Product,
  selectedColor: TypeCode | undefined,
) => {
  const allSizes = getAllSizes(product);
  const inStockSizeCodes = new Set(
    product.skus
      .filter(
        (sku) =>
          sku.stock > 0 && (!selectedColor || sku.color === selectedColor),
      )
      .map((sku) => sku.size),
  );

  return (
    allSizes.find((size) => inStockSizeCodes.has(size.code))?.code ??
    allSizes[0]?.code
  );
};

const useProductVariants = (product: Product) => {
  const addItem = useCartStore((state) => state.addItem);
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);
  const locale = useLocale();

  const allColors = getAllColors(product);
  const inStockColorCodes = new Set(
    product.skus
      .filter((sku) => sku.stock > 0 && sku.color)
      .map((sku) => sku.color as TypeCode),
  );
  const preferredColor = getPreferredColor(product);
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
  const preferredSize = getPreferredSize(product, selectedColor);
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

  const priceWithVariants = selectedSku?.price ?? product.basePrice;

  const quantity = useCartStore(
    (state) =>
      state.cart.items.find(
        (item) =>
          item.productId === product.id &&
          item.selectionSnapshot.size === selectedSku?.size &&
          item.selectionSnapshot.color === selectedSku?.color &&
          item.priceSnapshot === priceWithVariants,
      )?.quantity ?? 1,
  );
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
    priceWithVariants,
    isOutOfStock,
    allColors,
    allSizes,
    inStockColorCodes,
    inStockSizeCodes,
    handleAddToCart,
    handleColorChange,
    handleSizeChange,
    quantity,
  };
};

export default useProductVariants;
