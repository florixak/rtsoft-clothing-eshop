import { Skeleton } from "@/components/ui/skeleton";

export const AdminDashboardSkeleton = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-8 w-64 rounded" />
        <Skeleton className="h-10 w-32 rounded" />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 md:col-span-2">
          <div className="space-y-3">
            <Skeleton className="h-6 w-32 rounded" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>

        <div className="col-span-1">
          <div className="space-y-3">
            <Skeleton className="h-6 w-32 rounded" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-3">
          <div className="space-y-3">
            <Skeleton className="h-6 w-32 rounded" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 pb-3 border-b border-muted">
                  <Skeleton className="h-6 w-24 rounded" />
                  <Skeleton className="h-6 flex-1 rounded" />
                  <Skeleton className="h-6 w-20 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
