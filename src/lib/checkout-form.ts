import { formOptions } from "@tanstack/react-form";
import {
  formSchema,
  paymentStepSchema,
  shippingStepSchema,
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

const validateBySection = ({
  value,
  formApi,
}: {
  value: FormValues;
  formApi: {
    parseValuesWithSchema: (schema: typeof formSchema) => unknown;
  };
}) => {
  if (value.section === "shipping") {
    return formApi.parseValuesWithSchema(
      shippingStepSchema as typeof formSchema,
    );
  }
  if (value.section === "payment") {
    return formApi.parseValuesWithSchema(
      paymentStepSchema as typeof formSchema,
    );
  }
  if (value.section === "review") {
    return formApi.parseValuesWithSchema(formSchema);
  }
};

export const checkoutFormOpts = formOptions({
  defaultValues,
  validators: {
    onMount: validateBySection,
    onChange: validateBySection,
    onSubmit: validateBySection,
  },
});
