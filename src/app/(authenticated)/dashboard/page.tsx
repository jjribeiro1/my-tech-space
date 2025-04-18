import { getCollectionsFromUser } from "@/features/collection/data";
import {
  getAllResourceTypes,
  getLatestResources,
} from "@/features/resources/data";
import { LatestResources } from "@/features/resources/components/latest-resources";
import { CollectionList } from "@/features/collection/components/collection-list";

export default async function DashboardPage() {
  const collections = await getCollectionsFromUser();
  const latestResources = await getLatestResources();
  const resourceTypes = await getAllResourceTypes();

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
