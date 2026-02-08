import { notFound } from "next/navigation";
import { getPublicProfile, getPublicCollections, getPublicResources } from "@/features/profile/data";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { PublicCollectionList } from "@/features/profile/components/public-collection-list";
import { PublicResourceList } from "@/features/profile/components/public-resource-list";
import { Separator } from "@/components/ui/separator";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getPublicProfile(userId);

  if (!user) {
    notFound();
  }

  // Parallel fetching
  const [collections, resources] = await Promise.all([
    getPublicCollections(userId),
    getPublicResources(userId),
  ]);

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <ProfileHeader user={user} publicCollectionsCount={collections.length} />

      <Separator className="my-8" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Public Collections
        </h2>
        <PublicCollectionList collections={collections} />
      </section>

      <Separator className="my-8" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Recent Public Resources
        </h2>
        <PublicResourceList resources={resources} />
      </section>
    </div>
  );
}
