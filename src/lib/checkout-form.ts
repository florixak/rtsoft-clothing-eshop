import { formOptions } from "@tanstack/react-form";
import { getUserProfileSync } from "@/lib/user-profile-storage";
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
    useDifferentShippingAddress: false,
    packetaPickupPointId: "",
    differentShippingAddress: {
      streetAddress: "",
      city: "",
      postalCode: "",
      country: "",
    },
  },
  payment: {
    paymentMethod: "payment-card",
  },
};

export const getCheckoutDefaultValues = (
  user?: Pick<User, "id" | "firstName" | "lastName" | "email"> | null,
): FormValues => {
  const profile = user?.id ? getUserProfileSync(user.id) : null;

  return {
    ...baseDefaultValues,
    shipping: {
      ...baseDefaultValues.shipping,
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: profile?.phone ?? "",
      streetAddress: profile?.streetAddress ?? "",
      city: profile?.city ?? "",
      postalCode: profile?.postalCode ?? "",
      country: profile?.country ?? "",
    },
  };
};

export const checkoutFormOpts = formOptions({
  defaultValues: getCheckoutDefaultValues(),
  validators: {
    onChange: formSchema,
    onBlur: formSchema,
    onSubmit: formSchema,
  },
});
