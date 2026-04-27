import NotFound from "@/components/layout/not-found";
import { useTranslation } from "react-i18next";

const ProductNotFound = () => {
  const { t } = useTranslation();

  return (
    <NotFound
      title={t("meta.productNotFound.title")}
      description={t("meta.productNotFound.description")}
    />
  );
};

export default ProductNotFound;
