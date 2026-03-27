import { formOptions } from "@tanstack/react-form";
import { type FormValues } from "./validators";

const defaultValues: FormValues = {
  shipping: {
    shippingMethod: "standard",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
  },
  payment: {
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  },
};

export const checkoutFormOpts = formOptions({
  defaultValues,
});
