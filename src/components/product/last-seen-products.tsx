import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Product } from "@/types";
import { useTranslation } from "react-i18next";

type LastSeenProductsProps = {
  product: Product;
};

const LastSeenProducts = ({ product }: LastSeenProductsProps) => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.product);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold uppercase">{t("lastSeen.title")}</h2>
        <p className="text-muted-foreground">
          {t("lastSeen.subtitle", { count: product?.reviewsCount })}
        </p>
      </div>

      <div></div>
    </div>
  );
};

export default LastSeenProducts;
