import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { getLastSeenProducts } from "@/lib/product-utils";
import type { Product } from "@/types";
import { useTranslation } from "react-i18next";
import ProductCard from "../catalog/product-card";

type LastSeenProductsProps = {
  product: Product;
};

const LastSeenProducts = ({ product }: LastSeenProductsProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.product);
  const lastSeenProducts = getLastSeenProducts(3, product.id);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold uppercase">{t("lastSeen.title")}</h2>
        <p className="text-muted-foreground">{t("lastSeen.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lastSeenProducts.length > 0 ? (
          lastSeenProducts.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="text-muted-foreground">{t("lastSeen.empty")}</p>
        )}
      </div>
    </div>
  );
};

export default LastSeenProducts;
