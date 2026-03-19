import { useState, useEffect, useRef } from "react";

type UseDebounceParams<T> = {
  value: T;
  delay: number;
  onDebounce?: (value: T) => void;
};

const useDebounce = <T>({ value, delay, onDebounce }: UseDebounceParams<T>) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const onDebounceRef = useRef(onDebounce);

  useEffect(() => {
    onDebounceRef.current = onDebounce;
  }, [onDebounce]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      onDebounceRef.current?.(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue };
};

export default useDebounce;
