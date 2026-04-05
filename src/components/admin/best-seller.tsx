import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { TopProduct } from "@/types";
import { useTranslation } from "react-i18next";

type BestSellerCardProps = {
  product: TopProduct;
};

const BestSeller = ({ product }: BestSellerCardProps) => {
  const imageUrl = product.images[0] || "/images/product-placeholder.png";
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.admin);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";
  return (
    <div className="flex flex-row items-center gap-2">
      <img
        src={imageUrl}
        alt={product.name[locale]}
        className="h-12 w-12 rounded object-cover"
      />
      <div>
        <p className="font-medium">{product.name[locale]}</p>
        <p className="text-sm text-muted-foreground">
          {t("overview.bestSellers.sales", { count: product.sold })}
        </p>
      </div>
    </div>
  );
};

export default BestSeller;
