import { useTranslation } from "react-i18next";
import ProductCard from "./product-card";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Product } from "@/types";

type CatalogProductsProps = {
  products: Product[];
};

const CatalogProducts = ({ products }: CatalogProductsProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.length === 0 && (
        <div className="text-center text-muted-foreground col-span-full min-h-80 py-16 ">
          <p>{t("catalog.noResults")}</p>
        </div>
      )}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CatalogProducts;
