import { Skeleton } from "@/components/ui/skeleton";

export const ProductDetailSkeleton = () => {
  return (
    <section className="max-w-5xl w-full mx-auto flex flex-col gap-6 py-8">
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Skeleton className="h-4 w-16 rounded" />
            {i < 2 && <Skeleton className="h-4 w-1 rounded" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-12 md:gap-8 md:flex-row w-full">
        <Skeleton className="h-96 w-full md:w-96 rounded-lg shrink-0" />

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center gap-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded" />
              ))}
            </div>
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>

          <div className="space-y-3 pt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded" />
            ))}

            <Skeleton className="h-12 w-full rounded" />
          </div>
        </div>
      </div>

      <Skeleton className="h-px w-full rounded my-4" />

      <div className="space-y-4">
        <Skeleton className="h-6 w-32 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-full rounded" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton className="h-px w-full rounded my-4" />

      <div className="space-y-4">
        <Skeleton className="h-6 w-40 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
