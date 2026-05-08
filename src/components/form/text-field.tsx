import { useFieldContext } from "@/hooks/form-context";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getErrorMessage } from "@/lib/validators";
import { useFormContext } from "@/hooks/form-context";

type TextFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ label, id, type, ...props }: TextFieldProps) => {
  const field = useFieldContext<string>();
  const form = useFormContext();
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const inputId = id ?? String(field.name).replace(/\./g, "-");
  const errorId = `${inputId}-error`;
  const hasError = field.state.meta.errors.length > 0;
  const shouldShowError =
    hasError &&
    (field.state.meta.isTouched || form.state.submissionAttempts > 0);

  return (
    <div className="flex flex-col w-full gap-1 relative">
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        type={type}
        className="border p-2 rounded w-full"
        {...props}
        aria-invalid={shouldShowError}
        aria-describedby={shouldShowError ? errorId : undefined}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {shouldShowError ? (
        <em id={errorId} className="text-destructive text-sm" role="alert">
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
