import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCollectionPage() {
  return (
    <>
      <section className="w-full border-b py-6">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-5" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </section>

      <div className="container mx-auto py-6">
        <Skeleton className="h-5 w-1/2" />
      </div>

      <section className="container mx-auto py-6">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-40" />
        </div>

        <div className="mb-4 flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-md border p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-5 w-5" />
              </div>
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
