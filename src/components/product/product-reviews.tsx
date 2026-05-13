import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { showInfoToast } from "@/lib/toasts";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

const ProductReviews = () => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.product,
    TRANSLATION_NAMESPACES.common,
  ]);

  const handleWriteReview = () => {
    showInfoToast(t("common:toast.comingSoon"));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold uppercase">{t("reviews.title")}</h2>
        <p className="text-muted-foreground">{t("reviews.subtitle")}</p>
      </div>

      <div className="flex items-center justify-center py-12 px-4 border border-dashed rounded-lg bg-muted/30">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground">{t("reviews.comingSoon")}</p>
          <Button onClick={handleWriteReview} disabled>
            {t("reviews.writeReview")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
