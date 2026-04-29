import { Skeleton } from "@/components/ui/skeleton";

export const CatalogSkeleton = () => {
  return (
    <section className="container mx-auto flex flex-col items-center gap-8 py-8">
      <div className="w-full space-y-4">
        <Skeleton className="h-8 w-48 rounded" />

        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded" />
          ))}
        </div>

        <Skeleton className="h-10 w-40 rounded" />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="h-64 w-full rounded-lg" />

            <div className="space-y-2">
              <Skeleton className="h-5 w-16 rounded-full" />

              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-3/4 rounded" />

              <Skeleton className="h-5 w-20 rounded" />

              <div className="flex gap-1 pt-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-4 rounded" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col gap-3 items-center pt-4">
        <Skeleton className="h-5 w-48 rounded" />

        <div className="flex gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-10 ${i === 0 || i === 6 ? "w-20" : "w-10"} rounded`}
            />
          ))}
        </div>

        <Skeleton className="h-10 w-32 rounded" />
      </div>
    </section>
  );
};
