import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [inputValue, setInputValue] = useState(String(quantity));

  useEffect(() => {
    setInputValue(String(quantity));
  }, [quantity]);

  const commitInput = () => {
    const trimmed = inputValue.trim();

    if (trimmed === "") {
      setInputValue(String(quantity));
      return;
    }

    const value = Number.parseInt(trimmed, 10);
    if (Number.isNaN(value) || value < 0) {
      setInputValue(String(quantity));
      return;
    }

    if (value !== quantity) {
      onQuantityChange(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (next === "" || /^\d+$/.test(next)) {
      setInputValue(next);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size={isCompact ? "icon-sm" : "icon"}
        onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
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
        min={0}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={commitInput}
        onKeyDown={handleInputKeyDown}
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
