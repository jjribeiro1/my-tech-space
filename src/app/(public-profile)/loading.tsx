import {
  ProfileHeaderSkeleton,
  CollectionListSkeleton,
  ResourceListSkeleton,
} from "@/features/profile/components/profile-skeletons";
import { Separator } from "@/components/ui/separator";

export default function PublicProfileLoading() {
  return (
    <div className="container mx-auto max-w-5xl py-8">
      <ProfileHeaderSkeleton />

      <Separator className="my-8" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Public Collections
        </h2>
        <CollectionListSkeleton />
      </section>

      <Separator className="my-8" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Recent Public Resources
        </h2>
        <ResourceListSkeleton />
      </section>
    </div>
  );
}
