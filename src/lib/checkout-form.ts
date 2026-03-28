import { formOptions } from "@tanstack/react-form";
import { type FormValues } from "./validators";

const defaultValues: FormValues = {
  shipping: {
    shippingMethod: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
  },
  payment: {
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  },
};

export const checkoutFormOpts = formOptions({
  defaultValues,
});
