import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Product } from "@/types";
import { useTranslation } from "react-i18next";

type ProductSpecificationsProps = {
  product: Product;
};

const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.product);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";
  const { specifications } = product;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold uppercase">
          {t("specifications.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("specifications.subtitle", { name: product?.name[locale] })}
        </p>
      </div>
      <table className="w-full text-base">
        <tbody>
          <tr>
            <td className="text-muted-foreground py-2">
              {t("specifications.material")}
            </td>
            <td>{specifications.material[locale]}</td>
          </tr>
          <tr>
            <td className="text-muted-foreground py-2">
              {t("specifications.care")}
            </td>
            <td>{specifications.care[locale]}</td>
          </tr>
          <tr>
            <td className="text-muted-foreground py-2">
              {t("specifications.origin")}
            </td>
            <td>{specifications.origin[locale]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecifications;
