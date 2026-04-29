import { Skeleton } from "@/components/ui/skeleton";

export const AccountLayoutSkeleton = () => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row gap-8 py-8">
      <div className="w-full md:w-48 space-y-3 shrink-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded" />
        ))}
      </div>

      <div className="flex-1 space-y-6">
        <Skeleton className="h-8 w-48 rounded" />

        <div className="border border-muted rounded-lg p-6 space-y-4">
          <Skeleton className="h-6 w-32 rounded" />

          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded" />
          ))}
        </div>
      </div>
    </section>
  );
};
