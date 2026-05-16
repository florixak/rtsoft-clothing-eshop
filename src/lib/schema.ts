import { dashboardPeriods } from "@/data/stats";
import { orderStatuses } from "@/data/orders";
import * as z from "zod";
import { MIN_PASSWORD_LENGTH } from "@/constants";

export const ordersSchema = z.object({
  period: z.enum(dashboardPeriods).default("all").catch("all"),
  orderQ: z.string().optional(),
  sort: z.enum(["createdAt", "amount"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  status: z.enum(orderStatuses).optional(),
  page: z.coerce.number().int().positive().default(1).catch(1),
  perPage: z.coerce.number().int().positive().default(10).catch(10),
});

export const productsSchema = z.object({
  productQ: z.string().optional(),
  sort: z.enum(["createdAt", "amount"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().positive().default(1).catch(1),
  perPage: z.coerce.number().int().positive().default(10).catch(10),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "validation.required")
    .max(254, "validation.emailTooLong")
    .email("validation.invalidEmail"),
  password: z
    .string()
    .trim()
    .min(1, "validation.required")
    .refine(
      (value) => value.length === 0 || value.length >= MIN_PASSWORD_LENGTH,
      {
        message: "validation.passwordTooShort",
      },
    ),
  rememberMe: z.boolean().default(false),
});

export type OrdersSearch = z.infer<typeof ordersSchema>;
export type ProductsSearch = z.infer<typeof productsSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
