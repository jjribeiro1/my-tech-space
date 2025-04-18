import { Collection } from "../types";
import { CollectionCard } from "./collection-card";
import { CollectionFormDialog } from "./collection-dialog";
import { EmptyCollection } from "./empty-collection";

interface Props {
  collections: Array<Collection>;
}

export function CollectionList({ collections }: Props) {
  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold tracking-tight">Collections</p>
        <CollectionFormDialog />
      </div>

      {collections.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection!} />
          ))}
        </div>
      ) : (
        <EmptyCollection />
      )}
    </section>
  );
}
