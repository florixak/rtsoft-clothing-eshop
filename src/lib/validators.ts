import { paymentMethods, shippingMethods } from "@/data";
import * as z from "zod";

export const shippingSchema = z.object({
  shipping: z.object({
    shippingMethod: z.enum(
      shippingMethods.map((method) => method.id) as [string, ...string[]],
    ),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
});

export const paymentSchema = z.object({
  payment: z.object({
    paymentMethod: z.enum(
      paymentMethods.map((method) => method.id) as [string, ...string[]],
    ),
    cardNumber: z.string().min(1, "Card number is required"),
    expiryDate: z.string().min(1, "Expiry date is required"),
    cvv: z.string().min(1, "CVV is required"),
    cardholderName: z.string().min(1, "Cardholder name is required"),
  }),
});

export const formSchema = z.object({
  ...shippingSchema.shape,
  ...paymentSchema.shape,
});

export type FormValues = z.infer<typeof formSchema>;
