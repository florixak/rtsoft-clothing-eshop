import { paymentMethods, shippingMethods } from "@/data";
import * as z from "zod";

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
      phone: z.string().optional(),
      streetAddress: z
        .string()
        .trim()
        .min(1, "validation.streetAddressRequired"),
      city: z.string().trim().min(1, "validation.cityRequired"),
      postalCode: z.string().trim().min(1, "validation.postalCodeRequired"),
      country: z.string().trim().min(1, "validation.countryRequired"),
      useDifferentShippingAddress: z.boolean(),
      differentShippingAddress: z.object({
        streetAddress: z.string(),
        city: z.string(),
        postalCode: z.string(),
        country: z.string(),
      }),
    })
    .superRefine((shipping, ctx) => {
      if (!shipping.useDifferentShippingAddress) {
        return;
      }

      if (!shipping.differentShippingAddress.streetAddress.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "validation.streetAddressRequired",
          path: ["differentShippingAddress", "streetAddress"],
        });
      }

      if (!shipping.differentShippingAddress.city.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "validation.cityRequired",
          path: ["differentShippingAddress", "city"],
        });
      }

      if (!shipping.differentShippingAddress.postalCode.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "validation.postalCodeRequired",
          path: ["differentShippingAddress", "postalCode"],
        });
      }

      if (!shipping.differentShippingAddress.country.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "validation.countryRequired",
          path: ["differentShippingAddress", "country"],
        });
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

export type FormValues = z.infer<typeof formSchema>;
