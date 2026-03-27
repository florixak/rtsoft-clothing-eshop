import { useFieldContext } from "@/hooks/form-context";
import { Card } from "../ui/card";
import clsx from "clsx";

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
        `${field.state.value === value ? "border-primary" : "border-muted"} cursor-pointer border-2`,
        className,
      )}
      onClick={() => field.handleChange(value)}
      onBlur={field.handleBlur}
    >
      {children}
    </Card>
  );
};

export default RadioButtonField;
