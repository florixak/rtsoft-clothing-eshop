import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TextFieldProps = {
  label: string;
  id: string;
};

const TextField = ({ label, id }: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="email" className="border p-2 rounded w-full" />
    </div>
  );
};

export default TextField;
