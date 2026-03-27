import { useFormContext } from "@/hooks/form-context";
import { Button } from "../ui/button";

type SubscribeButtonProps = {
  label: string;
  onBack?: () => void;
};

const SubscribeButton = ({ label, onBack }: SubscribeButtonProps) => {
  const form = useFormContext();
  const isFirstStep = form.state.values.section === "shipping";
  const { isSubmitting, isValid } = form.state;

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
      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? "Submitting..." : label}
      </Button>
    </div>
  );
};

export default SubscribeButton;
