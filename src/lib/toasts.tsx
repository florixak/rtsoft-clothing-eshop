import { Info } from "lucide-react";
import toast from "react-hot-toast";

export const showInfoToast = (message: string) => {
  toast(message, {
    icon: <Info size={24} className="text-primary" />,
  });
};
