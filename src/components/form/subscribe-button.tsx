import { useFormContext } from "@/hooks/form-context";
import { Button } from "../ui/button";

const SubscribeButton = ({ label }: { label: string }) => {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <Button disabled={isSubmitting}>{label}</Button>}
    </form.Subscribe>
  );
};

export default SubscribeButton;
