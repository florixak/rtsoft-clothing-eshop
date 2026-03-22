import { createProductQueryOptions } from "@/hooks/query-options";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Route } from "@/routes/{-$locale}/product/$productSlug";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const Product = () => {
  const { productSlug } = Route.useParams();
  const { data } = useSuspenseQuery(createProductQueryOptions(productSlug));
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.product);

  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  return <section></section>;
};

export default Product;
