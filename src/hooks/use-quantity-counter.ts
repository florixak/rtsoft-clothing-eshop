import { useState } from "react";

type UseQuantityCounterReturn = {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  setQuantity: (value: number) => void;
  reset: () => void;
};

export const useQuantityCounter = (
  initialQuantity: number = 1,
): UseQuantityCounterReturn => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleSetQuantity = (value: number) => {
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const reset = () => {
    setQuantity(initialQuantity);
  };

  return {
    quantity,
    increment,
    decrement,
    setQuantity: handleSetQuantity,
    reset,
  };
};
