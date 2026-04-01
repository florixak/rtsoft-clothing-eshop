import { formOptions } from "@tanstack/react-form";
import { type FormValues } from "./validators";

const defaultValues: FormValues = {
  shipping: {
    shippingMethod: "packeta",
    firstName: "",
    lastName: "",
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
});
