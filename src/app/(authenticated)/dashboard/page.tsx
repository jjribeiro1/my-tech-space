import { FolderPlus } from "lucide-react";
import { CollectionCard } from "@/features/collection/components/collection-card";
import { CollectionFormDialog } from "@/features/collection/components/collection-dialog";
import { getCollectionsFromUser } from "@/features/collection/data";
import {
  getAllResourceTypes,
  getLatestResources,
} from "@/features/resources/data";
import { LatestResources } from "@/features/resources/components/latest-resources";

export default async function DashboardPage() {
  const collections = await getCollectionsFromUser();
  const latestResources = await getLatestResources();
  const resourceTypes = await getAllResourceTypes();

  return (
    <article className="container mx-auto flex flex-col gap-y-12 py-6">
      <section className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Collections</h2>
          <CollectionFormDialog />
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
            <CollectionFormDialog />
          </div>
        )}
      </section>

      <section>
        <LatestResources
          resources={latestResources}
          resourceTypes={resourceTypes}
          collections={collections}
        />
      </section>
    </article>
  );
}
