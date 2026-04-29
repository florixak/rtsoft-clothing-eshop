import { Skeleton } from "@/components/ui/skeleton";

export const OrderDetailSkeleton = () => {
  return (
    <section className="flex flex-col gap-4 max-w-4xl mx-auto py-8">
      <div className="space-y-3">
        <Skeleton className="h-8 w-48 rounded" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-32 rounded" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.75fr)_minmax(20rem,1fr)]">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32 rounded" />
          <div className="border border-muted rounded-lg p-4 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-4 pb-4 border-b border-muted last:border-b-0 last:pb-0"
              >
                <Skeleton className="h-20 w-20 rounded shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
                <Skeleton className="h-6 w-24 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="border border-muted rounded-lg p-6 space-y-4 h-fit">
          <Skeleton className="h-6 w-32 rounded" />

          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
          ))}

          <div className="border-t border-muted pt-4">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-24 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Order Information */}
      <div className="border border-muted rounded-lg p-6 space-y-4">
        <Skeleton className="h-6 w-48 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
