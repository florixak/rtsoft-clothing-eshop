import { Skeleton } from "@/components/ui/skeleton";
import { TableSkeleton } from "./table-skeleton";

export const OrderListSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-8 w-48 rounded" />
        <div className="flex gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded" />
          ))}
        </div>
      </div>

      <Skeleton className="h-10 w-full rounded" />

      <TableSkeleton rows={6} columns={4} />

      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-5 w-32 rounded" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};
