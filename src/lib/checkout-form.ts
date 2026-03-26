import { formOptions } from "@tanstack/react-form";
import {
  formSchema,
  paymentSchema,
  shippingSchema,
  type FormValues,
} from "./validators";

const defaultValues: FormValues = {
  section: "shipping",
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

export const treeHouseFormOpts = formOptions({
  defaultValues,
  validators: {
    onSubmit: ({ value, formApi }) => {
      if (value.section === "shipping") {
        return formApi.parseValuesWithSchema(
          shippingSchema as typeof formSchema,
        );
      }
      if (value.section === "payment") {
        return formApi.parseValuesWithSchema(
          paymentSchema as typeof formSchema,
        );
      }
    },
  },
});
