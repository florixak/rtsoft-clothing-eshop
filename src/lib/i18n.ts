import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import csCommon from "@/locales/cs/common.json";
import csCatalog from "@/locales/cs/catalog.json";
import enCommon from "@/locales/en/common.json";
import enCatalog from "@/locales/en/catalog.json";
import csProduct from "@/locales/cs/product.json";
import enProduct from "@/locales/en/product.json";
import csCart from "@/locales/cs/cart.json";
import enCart from "@/locales/en/cart.json";
import csCheckout from "@/locales/cs/checkout.json";
import enCheckout from "@/locales/en/checkout.json";
import csOrderConfirmation from "@/locales/cs/orderConfirmation.json";
import enOrderConfirmation from "@/locales/en/orderConfirmation.json";
import csAdmin from "@/locales/cs/admin.json";
import enAdmin from "@/locales/en/admin.json";
import csOrderDetails from "@/locales/cs/orderDetails.json";
import enOrderDetails from "@/locales/en/orderDetails.json";

export const TRANSLATION_NAMESPACES = {
  common: "common",
  catalog: "catalog",
  product: "product",
  cart: "cart",
  checkout: "checkout",
  orderConfirmation: "orderConfirmation",
  admin: "admin",
  orderDetails: "orderDetails",
} as const;

const resources = {
  cs: {
    common: csCommon,
    catalog: csCatalog,
    product: csProduct,
    cart: csCart,
    checkout: csCheckout,
    orderConfirmation: csOrderConfirmation,
    admin: csAdmin,
    orderDetails: csOrderDetails,
  },
  en: {
    common: enCommon,
    catalog: enCatalog,
    product: enProduct,
    cart: enCart,
    checkout: enCheckout,
    orderConfirmation: enOrderConfirmation,
    admin: enAdmin,
    orderDetails: enOrderDetails,
  },
};

export type Languages = keyof typeof resources;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "cs",
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

export default i18n;
