import { Suspense } from "react";
import { StorageIndicator } from "./storage-indicator";
import { Skeleton } from "@/components/ui/skeleton";

export function StorageIndicatorWrapper() {
  return (
    <Suspense fallback={<Skeleton className="h-2 w-30" />}>
      <StorageIndicator />
    </Suspense>
  );
}
