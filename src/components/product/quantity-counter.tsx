import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";

type QuantityCounterProps = {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  disabled?: boolean;
  size?: "default" | "compact";
};

const QuantityCounter = ({
  quantity,
  onQuantityChange,
  disabled,
  size = "default",
}: QuantityCounterProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.product);
  const isCompact = size === "compact";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10);
    onQuantityChange(!Number.isNaN(value) && value > 0 ? value : 1);
  };

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size={isCompact ? "icon-sm" : "icon"}
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        aria-label={t("quantity.decrease")}
        disabled={disabled}
      >
        <Minus size={16} />
      </Button>
      <Input
        type="number"
        className={cn(
          "appearance-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          isCompact ? "h-7 w-12 px-1 text-sm" : "h-8 w-16",
        )}
        min="1"
        value={quantity}
        onChange={handleInputChange}
        aria-label={t("quantity.label")}
        disabled={disabled}
      />
      <Button
        variant="outline"
        size={isCompact ? "icon-sm" : "icon"}
        onClick={() => onQuantityChange(quantity + 1)}
        aria-label={t("quantity.increase")}
        disabled={disabled}
      >
        <Plus size={16} />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityCounter;
