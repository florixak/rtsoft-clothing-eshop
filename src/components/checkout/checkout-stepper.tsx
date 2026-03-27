import { CHECKOUT_STEPS } from "@/constants";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const CheckoutStepper = () => {
  const { section } = useSearch({ from: "/{-$locale}/checkout/" });
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);

  return (
    <div className="flex justify-center items-center flex-row gap-12">
      {CHECKOUT_STEPS.map((step) => (
        <span
          key={step}
          className={`px-4 py-2 ${
            section === step
              ? "border-b-2 border-primary"
              : "text-muted-foreground"
          }`}
        >
          {t(`steps.${step}`)}
        </span>
      ))}
    </div>
  );
};

export default CheckoutStepper;
