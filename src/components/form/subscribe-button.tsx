import { useFormContext } from "@/hooks/form-context";
import { Button } from "../ui/button";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

type SubscribeButtonProps = {
  label: string;
  backLabel?: string;
  onBack?: () => void;
  isFirstStep: boolean;
  isCurrentStepValid: boolean;
};

const SubscribeButton = ({
  label,
  backLabel,
  onBack,
  isFirstStep,
  isCurrentStepValid,
}: SubscribeButtonProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.state;
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);

  return (
    <div className="flex items-center justify-end gap-4">
      {isFirstStep && (
        <Button variant="outline" disabled={isSubmitting} type="button">
          <Link to="/{-$locale}">{t("actions.continueShopping")}</Link>
        </Button>
      )}
      {onBack && !isFirstStep && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
        >
          {backLabel}
        </Button>
      )}
      <Button type="submit" disabled={isSubmitting || !isCurrentStepValid}>
        {isSubmitting ? t("actions.submitting") : label}
      </Button>
    </div>
  );
};

export default SubscribeButton;
