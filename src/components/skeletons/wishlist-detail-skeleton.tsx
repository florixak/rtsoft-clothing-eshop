import { Skeleton } from "@/components/ui/skeleton";

export const WishlistDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-5 w-28 rounded" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-80 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};
