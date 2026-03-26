import SubscribeButton from "@/components/form/subscribe-button.tsx";
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context.ts";
import TextField from "@/components/form/text-field.tsx";

export const {
  useAppForm: useCheckoutForm,
  withForm,
  withFieldGroup,
} = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
