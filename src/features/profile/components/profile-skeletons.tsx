import { Skeleton } from "@/components/ui/skeleton";

export function ProfileHeaderSkeleton() {
    return (
        <div className="flex flex-col items-center gap-4 py-8 md:flex-row md:items-start md:gap-8">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex flex-col items-center gap-2 md:items-start">
                <Skeleton className="h-8 w-48" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export function CollectionListSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2 rounded-lg border p-6">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="mt-4 flex gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ResourceListSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                </div>
            ))}
        </div>
    );
}
