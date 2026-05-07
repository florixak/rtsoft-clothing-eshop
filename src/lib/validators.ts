import { paymentMethods, shippingMethods } from "@/data";
import * as z from "zod";

const PHONE_REGEX = /^[+0-9()\s-]{6,20}$/;
const POSTAL_CODE_REGEX = /^[0-9A-Za-z\s-]{3,10}$/;

export const shippingSchema = z.object({
  shipping: z
    .object({
      shippingMethod: z.enum(shippingMethods.map((method) => method.id)),
      firstName: z.string().trim().min(1, "validation.firstNameRequired"),
      lastName: z.string().trim().min(1, "validation.lastNameRequired"),
      email: z
        .string()
        .trim()
        .min(1, "validation.emailRequired")
        .email("validation.emailInvalid"),
      phone: z
        .string()
        .trim()
        .optional()
        .refine((value) => !value || PHONE_REGEX.test(value), {
          message: "validation.invalidPhone",
        }),
      streetAddress: z
        .string()
        .trim()
        .min(1, "validation.streetAddressRequired"),
      city: z.string().trim().min(1, "validation.cityRequired"),
      postalCode: z
        .string()
        .trim()
        .min(1, "validation.postalCodeRequired")
        .refine(
          (value) => value.length === 0 || POSTAL_CODE_REGEX.test(value),
          {
            message: "validation.invalidPostalCode",
          },
        ),
      country: z.string().trim().min(1, "validation.countryRequired"),
      useDifferentShippingAddress: z.boolean(),
      differentShippingAddress: z.object({
        streetAddress: z.string(),
        city: z.string(),
        postalCode: z.string(),
        country: z.string(),
      }),
      packetaPickupPointId: z.string().optional(),
    })
    .superRefine((shipping, ctx) => {
      if (shipping.shippingMethod === "packeta") {
        if (!shipping.packetaPickupPointId?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "validation.packetaPickupPointRequired",
            path: ["packetaPickupPointId"],
          });
        }
      }

      if (shipping.useDifferentShippingAddress) {
        if (!shipping.differentShippingAddress.streetAddress.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "validation.streetAddressRequired",
            path: ["differentShippingAddress", "streetAddress"],
          });
        }

        if (!shipping.differentShippingAddress.city.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "validation.cityRequired",
            path: ["differentShippingAddress", "city"],
          });
        }

        if (!shipping.differentShippingAddress.postalCode.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "validation.postalCodeRequired",
            path: ["differentShippingAddress", "postalCode"],
          });
        } else if (
          !POSTAL_CODE_REGEX.test(
            shipping.differentShippingAddress.postalCode.trim(),
          )
        ) {
          ctx.addIssue({
            code: "custom",
            message: "validation.invalidPostalCode",
            path: ["differentShippingAddress", "postalCode"],
          });
        }

        if (!shipping.differentShippingAddress.country.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "validation.countryRequired",
            path: ["differentShippingAddress", "country"],
          });
        }
      }
    }),
});

export const paymentSchema = z.object({
  payment: z.object({
    paymentMethod: z.enum(paymentMethods.map((method) => method.id)),
  }),
});

export const formSchema = z.object({
  ...shippingSchema.shape,
  ...paymentSchema.shape,
});

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "validation.invalidValue";
};

export type FormValues = z.infer<typeof formSchema>;
