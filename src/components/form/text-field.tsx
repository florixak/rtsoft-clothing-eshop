import { useFieldContext } from "@/hooks/form-context";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TextFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "Invalid value";
};

const TextField = ({ label, id, type, ...props }: TextFieldProps) => {
  const field = useFieldContext<string>();
  return (
    <div className="flex flex-col w-full gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        className="border p-2 rounded w-full"
        {...props}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {field.state.meta.isDirty && field.state.meta.errors.length ? (
        <em className="text-destructive text-sm">
          {getErrorMessage(field.state.meta.errors[0])}
        </em>
      ) : (
        <span className="opacity-0 pointer-events-none"></span>
      )}
    </div>
  );
};

export default TextField;
