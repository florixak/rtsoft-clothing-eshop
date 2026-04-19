import { formOptions } from "@tanstack/react-form";
import type { User } from "@/types";
import { type FormValues } from "./validators";
import { formSchema } from "./validators";

const baseDefaultValues: FormValues = {
  shipping: {
    shippingMethod: "packeta",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
  },
  payment: {
    paymentMethod: "payment-card",
  },
};

export const getCheckoutDefaultValues = (
  user?: Pick<User, "firstName" | "lastName" | "email"> | null,
): FormValues => ({
  ...baseDefaultValues,
  shipping: {
    ...baseDefaultValues.shipping,
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
  },
});

export const checkoutFormOpts = formOptions({
  defaultValues: getCheckoutDefaultValues(),
  validators: {
    onChange: formSchema,
    onBlur: formSchema,
    onSubmit: formSchema,
  },
});
