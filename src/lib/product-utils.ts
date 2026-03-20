import { products } from "@/data";
import type { SelectionSnapshot } from "@/types";

const findProductById = (productId: string) => {
  return products.find((p) => p.id === productId);
};

const calculateSelectionPrice = (
  productId: string,
  selection: SelectionSnapshot,
) => {
  const product = findProductById(productId);
  if (!product) return undefined;
  const colorOptions = product.options.colors ?? [];
  const materialOptions = product.options.material ?? [];

  const selectedSize = product.options.sizes.find(
    (size) => size.code === selection.size,
  );
  if (!selectedSize) return undefined;

  const selectedColor =
    colorOptions.length > 0
      ? colorOptions.find((color) => color.code === selection.color)
      : undefined;

  if (colorOptions.length > 0 && !selectedColor) return undefined;

  const selectedMaterial =
    materialOptions.length > 0
      ? materialOptions.find((material) => material.code === selection.material)
      : undefined;

  if (materialOptions.length > 0 && !selectedMaterial) return undefined;

  return (
    product.price +
    selectedSize.priceAdjustment +
    (selectedColor?.priceAdjustment ?? 0) +
    (selectedMaterial?.priceAdjustment ?? 0)
  );
};

export { calculateSelectionPrice, findProductById };
