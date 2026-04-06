import AdminOverview from "@/components/admin/admin-overview";
import { orderStatuses } from "@/data/orders";
import { dashboardPeriods } from "@/data/stats";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

const overviewSchema = z.object({
  period: z.enum(dashboardPeriods).default("all").catch("all"),
  q: z.string().optional(),
  sort: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  status: z.enum(orderStatuses).optional(),
  page: z.coerce.number().int().positive().default(1).catch(1),
  perPage: z.coerce.number().int().positive().default(5).catch(5),
});

export const Route = createFileRoute("/{-$locale}/admin/")({
  component: RouteComponent,
  validateSearch: overviewSchema,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error loading admin overview</div>,
});

function RouteComponent() {
  return <AdminOverview />;
}
