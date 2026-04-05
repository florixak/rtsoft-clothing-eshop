import type { TopProduct } from "@/types";

type BestSellerCardProps = {
  product: TopProduct;
};

const BestSeller = ({ product }: BestSellerCardProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <img
        src={product.images[0]}
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
