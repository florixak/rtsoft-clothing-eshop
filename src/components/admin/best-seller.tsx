import type { TopProduct } from "@/types";

type BestSellerCardProps = {
  product: TopProduct;
};

const BestSeller = ({ product }: BestSellerCardProps) => {
  const imageUrl = product.images[0] || "/images/product-placeholder.png";
  return (
    <div className="flex flex-row items-center gap-2">
      <img
        src={imageUrl}
        alt={product.name}
        className="h-12 w-12 rounded object-cover"
      />
      <div>
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground">{product.sold} sold</p>
      </div>
    </div>
  );
};

export default BestSeller;
