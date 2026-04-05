import { createBestSellersQueryOptions } from "@/hooks/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import BestSeller from "./best-seller";

const BestSellerItems = () => {
  const { period } = useSearch({ from: "/{-$locale}/admin/" });
  const { data: bestSellingProducts } = useSuspenseQuery(
    createBestSellersQueryOptions(period),
  );
  return (
    <ul className="space-y-2">
      {bestSellingProducts.map((product) => (
        <li key={product.productId} className="flex items-center gap-4">
          <BestSeller product={product} />
        </li>
      ))}
    </ul>
  );
};

export default BestSellerItems;
