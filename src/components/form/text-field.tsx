import { useFieldContext } from "@/hooks/form-context";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getErrorMessage } from "@/lib/validators";

type TextFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ label, id, type, ...props }: TextFieldProps) => {
  const field = useFieldContext<string>();
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  return (
    <div className="flex flex-col w-full gap-1 relative">
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
          {t(getErrorMessage(field.state.meta.errors[0]))}
        </em>
      ) : (
        <span className="opacity-0 pointer-events-none"></span>
      )}
      {props.required && (
        <span className="text-destructive absolute right-2 top-5">*</span>
      )}
    </div>
  );
};

export default TextField;
