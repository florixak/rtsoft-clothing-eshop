import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext } from "./form-context.ts";
import SubscribeButton from "@/components/form/subscribe-button.tsx"; // 👈 eager

const RadioButtonField = lazy(
  () => import("@/components/form/radio-button-field.tsx"),
);
const TextField = lazy(() => import("@/components/form/text-field.tsx"));
const PayButton = lazy(() => import("@/components/form/pay-button.tsx"));

export const {
  useAppForm: useCheckoutForm,
  withForm,
  withFieldGroup,
} = createFormHook({
  fieldComponents: {
    TextField,
    RadioButtonField,
    PayButton,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});

export type CheckoutForm = ReturnType<typeof withForm>;
