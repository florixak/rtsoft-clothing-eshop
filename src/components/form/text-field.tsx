import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TextFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ label, id, type, ...props }: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        className="border p-2 rounded w-full"
        {...props}
      />
    </div>
  );
};

export default TextField;
