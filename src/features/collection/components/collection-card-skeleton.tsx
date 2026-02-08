import { Skeleton } from "@/components/ui/skeleton";

export function CollectionCardSkeleton() {
  return (
    <div className="h-full rounded-md border p-4 transition-all hover:shadow-md">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-3.5 w-3.5 shrink-0" />
        </div>

        <Skeleton className="h-3 w-full" />

        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
