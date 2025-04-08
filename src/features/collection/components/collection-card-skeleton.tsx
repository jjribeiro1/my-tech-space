import { Skeleton } from "@/components/ui/skeleton";

export function CollectionCardSkeleton() {
  return (
    <div className="rounded-md border p-4 transition-all hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="mb-4">
        <Skeleton className="mb-2 h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
