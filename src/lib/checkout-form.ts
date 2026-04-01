import { formOptions } from "@tanstack/react-form";
import { type FormValues } from "./validators";
import { formSchema } from "./validators";

const defaultValues: FormValues = {
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

export const checkoutFormOpts = formOptions({
  defaultValues,
  validators: {
    onChange: formSchema,
    onBlur: formSchema,
    onSubmit: formSchema,
  },
});
