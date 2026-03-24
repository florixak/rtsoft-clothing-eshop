import type { Languages } from "@/lib/i18n";
import type { Product } from "@/types";

type ProductImageProps = {
  images: {
    primary?: string;
    secondary?: string;
  };
  product: Product;
  locale: Languages;
};

const ProductImage = ({ images, product, locale }: ProductImageProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {images.primary ? (
        <img
          src={images.primary}
          alt={product.name[locale]}
          className="w-full md:size-120 object-cover rounded shadow-image"
        />
      ) : (
        <div className="w-full md:size-120 bg-muted rounded shadow-image" />
      )}
      <div className="flex flex-row gap-4 items-center w-full">
        {images.secondary && (
          <img
            src={images.secondary}
            alt={product.name[locale]}
            className="size-25 object-cover rounded shadow-image"
          />
        )}
      </div>
    </div>
  );
};

export default ProductImage;
