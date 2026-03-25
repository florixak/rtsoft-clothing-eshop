import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";

type QuantityCounterProps = {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  disabled?: boolean;
};

const QuantityCounter = ({
  quantity,
  onQuantityChange,
  disabled,
}: QuantityCounterProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.product);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10);
    onQuantityChange(!Number.isNaN(value) && value > 0 ? value : 1);
  };

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="py-4"
        aria-label={t("quantity.decrease")}
        disabled={disabled}
      >
        <Minus size={16} />
      </Button>
      <Input
        type="number"
        className="w-16 py-4"
        min="1"
        value={quantity}
        onChange={handleInputChange}
        aria-label={t("quantity.label")}
        disabled={disabled}
      />
      <Button
        variant="outline"
        onClick={() => onQuantityChange(quantity + 1)}
        className="py-4"
        aria-label={t("quantity.increase")}
        disabled={disabled}
      >
        <Plus size={16} />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityCounter;
