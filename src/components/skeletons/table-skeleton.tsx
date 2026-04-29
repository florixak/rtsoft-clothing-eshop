import { Skeleton } from "@/components/ui/skeleton";

type TableSkeletonProps = {
  rows?: number;
  columns?: number;
  className?: string;
};

export const TableSkeleton = ({
  rows = 5,
  columns = 4,
  className,
}: TableSkeletonProps) => {
  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      <div className="flex gap-4 pb-4 border-b border-muted">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-5 flex-1 rounded" />
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              className="h-6 flex-1 rounded"
            />
          ))}
        </div>
      ))}
    </div>
  );
};
