import { Skeleton } from "@/components/ui/skeleton";

export const CartSkeleton = () => {
  return (
    <section className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-40 rounded" />
        <Skeleton className="h-5 w-56 rounded" />
      </div>

      <div className="flex flex-col md:flex-row w-full gap-8">
        <div className="flex flex-col gap-4 sm:gap-6 w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-start w-full gap-3 sm:gap-4">
              <Skeleton className="size-20 sm:size-24 md:size-36 rounded shrink-0" />

              <div className="flex flex-col justify-between flex-1 gap-3 w-full min-w-0">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <Skeleton className="h-5 w-24 rounded" />
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Skeleton className="h-10 w-28 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:max-w-sm w-full">
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <Skeleton className="h-7 w-40 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
};
