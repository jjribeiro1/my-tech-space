import { getCollectionsFromUser } from "@/features/collection/data";
import {
  getAllResourceTypes,
  getFavoritesResourceCount,
  getLatestResources,
} from "@/features/resources/data";
import { LatestResources } from "@/features/resources/components/latest-resources";
import { CollectionList } from "@/features/collection/components/collection-list";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ isFavorite: string | undefined }>;
}) {
  const filters = await searchParams;
  const collections = await getCollectionsFromUser();
  const latestResources = await getLatestResources(filters);
  const resourceTypes = await getAllResourceTypes();

  const favoritesResourceCountPromise = getFavoritesResourceCount()

  return (
    <article className="container mx-auto flex flex-col gap-y-12 py-6">
      <CollectionList collections={collections} />
      <LatestResources
        resources={latestResources}
        resourceTypes={resourceTypes}
        collections={collections}
        favoriteResourcesCountPromise={favoritesResourceCountPromise}
      />
    </article>
  );
}
