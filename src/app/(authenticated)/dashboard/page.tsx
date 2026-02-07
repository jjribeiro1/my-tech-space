import { getCollectionsFromUser } from "@/features/collection/data";
import { getAllResourceTypes, getResources } from "@/features/resources/data";
import { LatestResources } from "@/features/resources/components/latest-resources";
import { CollectionList } from "@/features/collection/components/collection-list";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ isFavorite: string | undefined }>;
}) {
  const { isFavorite } = await searchParams;

  const [collections, resourceTypes, latestResources] = await Promise.all([
    getCollectionsFromUser(),
    getAllResourceTypes(),
    getResources({
      isFavorite,
      limit: 5,
    }),
  ]);

  return (
    <article className="container mx-auto flex flex-col gap-y-12 py-6">
      <CollectionList collections={collections} />
      <LatestResources
        resources={latestResources}
        resourceTypes={resourceTypes}
        collections={collections}
      />
    </article>
  );
}
