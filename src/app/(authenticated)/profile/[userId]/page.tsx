import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getPublicProfile,
  getPublicCollections,
  getPublicResources,
} from "@/features/profile/data";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { PublicCollectionList } from "@/features/profile/components/public-collection-list";
import { PublicResourceList } from "@/features/profile/components/public-resource-list";
import { Separator } from "@/components/ui/separator";
import {
  ProfileHeaderSkeleton,
  CollectionListSkeleton,
  ResourceListSkeleton,
} from "@/features/profile/components/profile-skeletons";

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  return (
    <div className="container mx-auto max-w-5xl py-8">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeaderSection params={params} />
      </Suspense>

      <Separator className="my-8" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Public Collections
        </h2>
        <Suspense fallback={<CollectionListSkeleton />}>
          <PublicCollectionListSection params={params} />
        </Suspense>
      </section>

      <Separator className="my-8" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Recent Public Resources
        </h2>
        <Suspense fallback={<ResourceListSkeleton />}>
          <PublicResourceListSection params={params} />
        </Suspense>
      </section>
    </div>
  );
}

async function ProfileHeaderSection({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const [user, collections] = await Promise.all([
    getPublicProfile(userId),
    getPublicCollections(userId),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <ProfileHeader user={user} publicCollectionsCount={collections.length} />
  );
}

async function PublicCollectionListSection({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const collections = await getPublicCollections(userId);

  return <PublicCollectionList collections={collections} />;
}

async function PublicResourceListSection({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const resources = await getPublicResources(userId);

  return <PublicResourceList resources={resources} />;
}
