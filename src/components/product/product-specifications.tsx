import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Product } from "@/types";
import { useTranslation } from "react-i18next";
import useLocale from "@/hooks/use-locale";

type ProductSpecificationsProps = {
  product: Product;
};

const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.product);
  const locale = useLocale();
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
            <th
              scope="row"
              className="text-muted-foreground py-2 text-left font-normal"
            >
              {t("specifications.material")}
            </th>
            <td>{specifications.material[locale]}</td>
          </tr>
          <tr>
            <th
              scope="row"
              className="text-muted-foreground py-2 text-left font-normal"
            >
              {t("specifications.care")}
            </th>
            <td>{specifications.care[locale]}</td>
          </tr>
          <tr>
            <th
              scope="row"
              className="text-muted-foreground py-2 text-left font-normal"
            >
              {t("specifications.origin")}
            </th>
            <td>{specifications.origin[locale]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecifications;
