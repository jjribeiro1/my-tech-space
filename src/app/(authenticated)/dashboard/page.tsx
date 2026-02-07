import { redirect } from "next/navigation";
import { CollectionList } from "@/features/collection/components/collection-list";
import { getCollectionsFromUser } from "@/features/collection/data";
import { LatestResources } from "@/features/resources/components/latest-resources";
import {
  getAllResourceTypes,
  getResourcesFromUser,
} from "@/features/resources/data";
import { getSession } from "@/lib/session";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ isFavorite: string | undefined }>;
}) {
  const { isFavorite } = await searchParams;

  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  const userId = session.user.id;

  const [collections, resourceTypes, latestResources] = await Promise.all([
    getCollectionsFromUser(userId),
    getAllResourceTypes(),
    getResourcesFromUser(userId, {
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
