import { createProductSlugQueryOptions } from "@/hooks/query-options";
import { Route } from "@/routes/{-$locale}/product/$productSlug";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Separator } from "../ui/separator";

import LastSeenProducts from "./last-seen-products";
import ProductHeader from "./product-header";
import ProductSpecifications from "./product-specifications";
import { useEffect } from "react";
import { setLastSeenProduct } from "@/lib/product-utils";

const Product = () => {
  const { productSlug } = Route.useParams();
  const { data: product } = useSuspenseQuery(
    createProductSlugQueryOptions(productSlug),
  );

  useEffect(() => {
    if (product) {
      setLastSeenProduct(product.id);
    }
  }, [product]);

  return (
    <section className="max-w-5xl w-full mx-auto flex flex-col gap-6 py-8">
      <ProductHeader product={product} />
      <Separator className="my-8" />
      <ProductSpecifications product={product} />
      <Separator className="my-8" />
      <LastSeenProducts product={product} />
    </section>
  );
};

export default Product;
