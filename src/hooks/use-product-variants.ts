import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import {
  findInStockSku,
  findPreferredSelectionFromFilters,
  getAllColors,
  getAllSizes,
  hasInStockSku,
  matchesSelection,
  type FilterPreferences,
} from "@/lib/product-utils";
import { useCartStore } from "@/stores/cart-store";
import type { Product, SizeCode, TypeCode } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useLocale from "./use-locale";

const getInitialSelection = (
  product: Product,
  filterPreferences?: FilterPreferences,
) => {
  const fromFilters = findPreferredSelectionFromFilters(
    product,
    filterPreferences,
  );

  if (fromFilters) {
    return fromFilters;
  }

  const color = getPreferredColor(product);
  const size = getPreferredSize(product, color);

  return { color, size };
};

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

const useProductVariants = (
  product: Product,
  filterPreferences?: FilterPreferences,
) => {
  const addItem = useCartStore((state) => state.addItem);
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.common,
    TRANSLATION_NAMESPACES.product,
  ]);
  const locale = useLocale();

  const initialSelection = getInitialSelection(product, filterPreferences);
  const allColors = getAllColors(product);
  const inStockColorCodes = new Set(
    product.skus
      .filter((sku) => sku.stock > 0 && sku.color)
      .map((sku) => sku.color as TypeCode),
  );
  const [selectedColor, setSelectedColor] = useState<TypeCode | undefined>(
    initialSelection.color,
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
  const [selectedSize, setSelectedSize] = useState<SizeCode | undefined>(
    initialSelection.size,
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
      )?.quantity ?? 0,
  );
  const isOutOfStock = !selectedInStockSku;

  const handleAddToCart = (quantity: number = 1) => {
    if (!selectedInStockSku || !selectedSize || !selectedColor) return;
    const prevQuantity =
      useCartStore
        .getState()
        .cart.items.find(
          (item) =>
            item.productId === product.id &&
            item.selectionSnapshot.size === selectedSku?.size &&
            item.selectionSnapshot.color === selectedSku?.color &&
            item.priceSnapshot === priceWithVariants,
        )?.quantity ?? 0;

    const added = addItem({
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    const newQuantity =
      useCartStore
        .getState()
        .cart.items.find(
          (item) =>
            item.productId === product.id &&
            item.selectionSnapshot.size === selectedSku?.size &&
            item.selectionSnapshot.color === selectedSku?.color &&
            item.priceSnapshot === priceWithVariants,
        )?.quantity ?? 0;

    if (!added || newQuantity <= prevQuantity) {
      toast.error(t("product:addToCart.outOfStock"));
      return;
    }

    const productName = product.name[locale];
    const variantInfo = `(${selectedSize.toUpperCase()} | ${selectedColor})`;
    const name = `${productName} ${variantInfo}`;
    toast.success(
      prevQuantity > 0
        ? t("toast.addedToCartWithQuantity", {
            name,
            numberInCart: newQuantity.toString(),
          })
        : t("toast.addedToCart", {
            name,
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

  const sortedColors = allColors.sort((a, b) => {
    const aInPrefs = filterPreferences?.color?.includes(a.code);
    const bInPrefs = filterPreferences?.color?.includes(b.code);

    // Sort by filter preferences
    if (aInPrefs && bInPrefs) {
      const aIndex = filterPreferences!.color!.indexOf(a.code);
      const bIndex = filterPreferences!.color!.indexOf(b.code);
      return aIndex - bIndex;
    }
    if (aInPrefs) return -1;
    if (bInPrefs) return 1;

    // Sort by stock availability, when no filter preferences are set
    const aInStock = inStockColorCodes.has(a.code);
    const bInStock = inStockColorCodes.has(b.code);
    if (aInStock && !bInStock) return -1;
    if (!aInStock && bInStock) return 1;
    return 0;
  });

  const sortedSizes = allSizes.sort((a, b) => {
    const aInPrefs = filterPreferences?.size?.includes(a.code);
    const bInPrefs = filterPreferences?.size?.includes(b.code);
    if (aInPrefs && bInPrefs) {
      const aIndex = filterPreferences!.size!.indexOf(a.code);
      const bIndex = filterPreferences!.size!.indexOf(b.code);
      return aIndex - bIndex;
    }
    if (aInPrefs) return -1;
    if (bInPrefs) return 1;

    const aInStock = inStockSizeCodes.has(a.code);
    const bInStock = inStockSizeCodes.has(b.code);
    if (aInStock && !bInStock) return -1;
    if (!aInStock && bInStock) return 1;
    return 0;
  });

  return {
    selectedColor,
    selectedSize,
    selectedInStockSku,
    selectedSku,
    priceWithVariants,
    isOutOfStock,
    allColors: sortedColors,
    allSizes: sortedSizes,
    inStockColorCodes,
    inStockSizeCodes,
    handleAddToCart,
    handleColorChange,
    handleSizeChange,
    quantity,
  };
};

export default useProductVariants;
