import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollectionCard } from "@/features/collection/components/collection-card";
import { getCollectionsFromUser } from "@/features/collection/data";

export default async function DashboardPage() {
  const collections = await getCollectionsFromUser();

  return (
    <article className="container mx-auto py-6">
      <section className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Collections</h2>
          <Button variant="outline" size="sm">
            <FolderPlus className="mr-2 h-4 w-4" />
            Create collection
          </Button>
        </div>

        {collections.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection!} />
            ))}
          </div>
        ) : (
          <div className="bg-muted/20 flex flex-col items-center justify-center rounded-lg border p-8 text-center">
            <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full">
              <FolderPlus className="h-10 w-10" />
            </div>
            <h3 className="mb-1 text-lg font-medium">No collection created</h3>
            <p className="text-muted-foreground mb-4 max-w-sm text-sm">
              Create your first collection to start organizing your resources
            </p>
            <Button>Create collection</Button>
          </div>
        )}
      </section>
    </article>
  );
}
