import AdminOrders from "@/components/admin/orders/admin-orders";
import { orderStatuses } from "@/data/orders";
import { dashboardPeriods } from "@/data/stats";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

const ordersSchema = z.object({
  period: z.enum(dashboardPeriods).default("all").catch("all"),
  q: z.string().optional(),
  sort: z.enum(["createdAt", "amount"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  status: z.enum(orderStatuses).optional(),
  page: z.coerce.number().int().positive().default(1).catch(1),
  perPage: z.coerce.number().int().positive().default(5).catch(5),
});

export const Route = createFileRoute("/{-$locale}/admin/orders/")({
  component: RouteComponent,
  validateSearch: ordersSchema,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error loading admin orders</div>,
});

function RouteComponent() {
  return <AdminOrders />;
}
