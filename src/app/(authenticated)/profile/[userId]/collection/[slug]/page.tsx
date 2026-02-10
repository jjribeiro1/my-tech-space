import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Folder } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  getPublicCollections,
  getPublicResources,
  getPublicProfile,
} from "@/features/profile/data";
import { PublicResourceList } from "@/features/profile/components/public-resource-list";

export default async function PublicCollectionPage({
  params,
}: {
  params: Promise<{ userId: string; slug: string }>;
}) {
  const { userId, slug } = await params;

  const user = await getPublicProfile(userId);
  if (!user) return notFound();

  const collections = await getPublicCollections(userId);
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) return notFound();

  const resources = await getPublicResources(userId, {
    collectionId: collection.id,
  });

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <section className="mb-6 w-full border-b pb-6">
        <div className="mb-4 flex items-center gap-2">
          <Link
            href={`/profile/${userId}`}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            prefetch={true}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Folder className="text-primary h-5 w-5" />
          <h1 className="text-2xl font-bold">{collection.name}</h1>
        </div>

        {collection.description && (
          <p className="text-muted-foreground mt-2">{collection.description}</p>
        )}
      </section>

      <section>
        <PublicResourceList resources={resources} />
      </section>
    </div>
  );
}
