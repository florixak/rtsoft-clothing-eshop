import { products } from "@/data";

const findProductById = (productId: string) => {
  return products.find((p) => p.id === productId);
};

const calculateSelectionPrice = (
  productId: string,
  sizeCode: string,
  typeCode: string,
) => {
  const product = findProductById(productId);
  if (!product) return undefined;

  const selectedSize = product.options.sizes.find(
    (size) => size.code === sizeCode,
  );
  const selectedType = product.options.types.find(
    (type) => type.code === typeCode,
  );

  if (!selectedSize || !selectedType) return undefined;

  return (
    product.price + selectedSize.priceAdjustment + selectedType.priceAdjustment
  );
};

export { findProductById, calculateSelectionPrice };
