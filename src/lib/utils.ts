import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Languages } from "./i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number, locale: Languages) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "CZK",
  }).format(price);
};

export const formatDate = (date: string, locale: Languages) => {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const isDefined = <T>(value: T | undefined): value is T =>
  value !== undefined;
