import { Collection } from "@/features/collection/types";
import { PublicCollectionCard } from "./public-collection-card";

interface Props {
  collections: Array<
    Pick<
      Collection,
      | "id"
      | "name"
      | "slug"
      | "description"
      | "resourceCount"
      | "created_at"
      | "updated_at"
      | "userId"
    >
  >;
}

export function PublicCollectionList({ collections }: Props) {
  if (collections.length === 0) {
    return (
      <div className="text-muted-foreground py-10 text-center">
        This user has no public collections.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection) => (
        <PublicCollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
