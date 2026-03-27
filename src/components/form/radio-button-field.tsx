import { useFieldContext } from "@/hooks/form-context";
import { Card } from "../ui/card";
import clsx from "clsx";
import { Check } from "lucide-react";

type RadioButtonFieldProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
};

const RadioButtonField = ({
  children,
  value,
  className,
}: RadioButtonFieldProps) => {
  const field = useFieldContext<string>();
  return (
    <Card
      className={clsx(
        `${field.state.value === value ? "border-primary" : "border-muted"} cursor-pointer border-2 relative`,
        className,
      )}
      onClick={() => field.handleChange(value)}
      onBlur={field.handleBlur}
    >
      <span
        className={clsx(
          "absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1",
          field.state.value === value ? "opacity-100" : "opacity-0",
        )}
      >
        <Check size={16} />
      </span>
      {children}
    </Card>
  );
};

export default RadioButtonField;
