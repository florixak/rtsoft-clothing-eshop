import NotFound from "@/components/layout/not-found";
import { useTranslation } from "react-i18next";

const OrderNotFound = () => {
  const { t } = useTranslation();

  return (
    <NotFound
      title={t("meta.orderNotFound.title")}
      description={t("meta.orderNotFound.description")}
    />
  );
};

export default OrderNotFound;
