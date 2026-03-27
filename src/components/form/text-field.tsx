import { useFieldContext } from "@/hooks/form-context";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TextFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ label, id, type, ...props }: TextFieldProps) => {
  const field = useFieldContext<string>();
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        className="border p-2 rounded w-full"
        {...props}
      />
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-destructive">
          {field.state.meta.errors[0].message}
        </em>
      ) : (
        <span className="opacity-0 pointer-events-none"></span>
      )}
    </div>
  );
};

export default TextField;
