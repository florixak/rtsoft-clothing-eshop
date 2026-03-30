import { paymentMethods, shippingMethods } from "@/data";
import * as z from "zod";

export const shippingSchema = z.object({
  shipping: z.object({
    shippingMethod: z.enum(shippingMethods.map((method) => method.id)),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
});

export const paymentSchema = z.object({
  payment: z
    .object({
      paymentMethod: z.enum(paymentMethods.map((method) => method.id)),
      cardNumber: z.string().optional(),
      expiryDate: z.string().optional(),
      cvv: z.string().optional(),
      cardholderName: z.string().optional(),
    })
    .superRefine((data /*ctx*/) => {
      if (data.paymentMethod !== "payment-card") return;

      /*if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card number must be 16 digits",
          path: ["cardNumber"],
        });
      }

      if (!data.expiryDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Expiry date is required",
          path: ["expiryDate"],
        });
      }

      if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CVV must be 3 or 4 digits",
          path: ["cvv"],
        });
      }

      if (!data.cardholderName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cardholder name is required",
          path: ["cardholderName"],
        });
      }*/
    }),
});

export const formSchema = z.object({
  ...shippingSchema.shape,
  ...paymentSchema.shape,
});

export type FormValues = z.infer<typeof formSchema>;
