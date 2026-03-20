import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number, locale: string) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "CZK",
  }).format(price);
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};
