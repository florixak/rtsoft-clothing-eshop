import { createProductQueryOptions } from "@/hooks/query-options";
import { Route } from "@/routes/{-$locale}/product/$productSlug";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const Product = () => {
  const { productSlug } = Route.useParams();
  const { data } = useSuspenseQuery(createProductQueryOptions(productSlug));
  const { t, i18n } = useTranslation("product");

  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  return <section></section>;
};

export default Product;
