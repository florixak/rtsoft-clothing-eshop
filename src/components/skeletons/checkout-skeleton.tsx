import { Skeleton } from "@/components/ui/skeleton";

export const CheckoutSkeleton = () => {
  return (
    <section className="container mx-auto flex flex-col gap-8">
      <Skeleton className="h-8 w-48 rounded" />

      <div className="flex justify-center items-center gap-12">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-28 rounded-full" />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full items-start justify-between">
        <div className="flex-1 flex flex-col gap-8 w-full">
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-6 w-40 rounded" />
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full rounded-md" />
              ))}
            </div>

            <div className="space-y-3">
              <Skeleton className="h-6 w-36 rounded" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Skeleton className="h-12 flex-1 rounded-md" />
              <Skeleton className="h-12 flex-1 rounded-md" />
            </div>
          </div>
        </div>

        <div className="md:max-w-sm w-full space-y-4">
          <Skeleton className="h-8 w-44 rounded" />
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
};
