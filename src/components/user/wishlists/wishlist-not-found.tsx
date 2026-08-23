import NotFound from "@/components/layout/not-found";
import { useTranslation } from "react-i18next";

const WishlistNotFound = () => {
  const { t } = useTranslation();

  return (
    <NotFound
      title={t("meta.wishlistNotFound.title")}
      description={t("meta.wishlistNotFound.description")}
    />
  );
};

export default WishlistNotFound;
