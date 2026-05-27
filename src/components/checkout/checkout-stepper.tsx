import { CHECKOUT_STEPS, type CheckoutStep } from "@/constants";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

type CheckoutStepperProps = {
  completedSteps: CheckoutStep[];
};

const CheckoutStepper = ({ completedSteps }: CheckoutStepperProps) => {
  const { section } = useSearch({ from: "/{-$locale}/checkout/" });
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const navigate = useNavigate({ from: "/{-$locale}/checkout/" });

  const handleStepClick = (step: CheckoutStep) => {
    navigate({
      to: "/{-$locale}/checkout",
      search: { section: step },
      replace: true,
    });
  };

  return (
    <div className="flex justify-center items-center flex-row gap-12">
      {CHECKOUT_STEPS.map((step) => (
        <span
          key={step}
          className={`px-4 py-2 flex items-center gap-2 cursor-pointer ${
            section === step
              ? "border-b-2 border-primary"
              : completedSteps.includes(step)
                ? "text-primary"
                : "text-muted-foreground"
          }`}
          onClick={() => handleStepClick(step)}
        >
          {t(`steps.${step}`)}
          {completedSteps.includes(step) && (
            <CheckCircle className="w-4 h-4 text-primary" />
          )}
        </span>
      ))}
    </div>
  );
};

export default CheckoutStepper;
