import { useFormContext } from "@/hooks/form-context";
import { Button } from "../ui/button";

type SubscribeButtonProps = {
  label: string;
  onBack?: () => void;
  isFirstStep: boolean;
  isCurrentStepValid: boolean;
};

const SubscribeButton = ({
  label,
  onBack,
  isFirstStep,
  isCurrentStepValid,
}: SubscribeButtonProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.state;

  return (
    <div className="flex items-center justify-end gap-4">
      {onBack && !isFirstStep && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
      )}
      <Button type="submit" disabled={isSubmitting || !isCurrentStepValid}>
        {isSubmitting ? "Submitting..." : label}
      </Button>
    </div>
  );
};

export default SubscribeButton;
