import AdminOverview from "@/components/admin/admin-overview";
import { dashboardPeriods } from "@/data/stats";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";

const overviewSchema = z.object({
  period: z.enum(dashboardPeriods).default("all").catch("all"),
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
