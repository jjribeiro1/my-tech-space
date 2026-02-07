import { Skeleton } from "@/components/ui/skeleton";
import { CollectionCardSkeleton } from "@/features/collection/components/collection-card-skeleton";

export default function LoadingDashboard() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-25" />
          <Skeleton className="h-10 w-50" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CollectionCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
