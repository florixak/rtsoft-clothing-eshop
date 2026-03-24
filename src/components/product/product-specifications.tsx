import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Product } from "@/types";
import { useTranslation } from "react-i18next";

type ProductSpecificationsProps = {
  product: Product;
};

const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.product);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold uppercase">
          {t("specifications.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("specifications.subtitle", { name: product?.name[locale] })}
        </p>
      </div>
    </div>
  );
};

export default ProductSpecifications;
