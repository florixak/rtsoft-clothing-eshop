import type { Languages } from "@/lib/i18n";
import type { Product } from "@/types";
import { useEffect, useEffectEvent, useState } from "react";

type ProductImageProps = {
  images: {
    primary?: string;
    secondary?: string;
  };
  product: Product;
  locale: Languages;
};

const ProductImage = ({ images, product, locale }: ProductImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    images.primary,
  );

  const selectImageEffect = useEffectEvent(() => {
    setSelectedImage(images.primary);
  });

  useEffect(() => {
    selectImageEffect();
  }, [images.primary]);

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {selectedImage ? (
        <img
          src={selectedImage}
          alt={product.name[locale] ?? "Product image"}
          className="w-full md:size-120 object-cover rounded shadow-image"
        />
      ) : (
        <div
          role="img"
          aria-label={product.name[locale] ?? "Product image"}
          className="w-full md:size-120 bg-muted rounded shadow-image"
        />
      )}
      {images.primary || images.secondary ? (
        <div className="flex flex-row gap-4 items-center justify-center w-full">
          {images.primary && (
            <img
              src={images.primary}
              alt={`${product.name[locale] ?? "Product image"} thumbnail`}
              className={`size-25 object-cover rounded shadow-image cursor-pointer ${
                selectedImage === images.primary ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleThumbnailClick(images.primary!)}
            />
          )}
          {images.secondary && (
            <img
              src={images.secondary}
              alt={`${product.name[locale] ?? "Product image"} thumbnail`}
              className={`size-25 object-cover rounded shadow-image cursor-pointer ${
                selectedImage === images.secondary ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleThumbnailClick(images.secondary!)}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ProductImage;
