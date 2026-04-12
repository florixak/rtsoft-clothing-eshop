import { dashboardPeriods } from "@/data/stats";
import { orderStatuses } from "@/data/orders";
import * as z from "zod";

export const ordersSchema = z.object({
  period: z.enum(dashboardPeriods).default("all").catch("all"),
  orderQ: z.string().optional(),
  sort: z.enum(["createdAt", "amount"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  status: z.enum(orderStatuses).optional(),
  page: z.coerce.number().int().positive().default(1).catch(1),
  perPage: z.coerce.number().int().positive().default(5).catch(5),
});

export const productsSchema = z.object({
  productQ: z.string().optional(),
  sort: z.enum(["createdAt", "amount"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().positive().default(1).catch(1),
  perPage: z.coerce.number().int().positive().default(5).catch(5),
});

export type OrdersSearch = z.infer<typeof ordersSchema>;
export type ProductsSearch = z.infer<typeof productsSchema>;
