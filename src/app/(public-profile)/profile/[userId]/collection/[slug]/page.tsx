import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Folder } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  getPublicProfile,
  getPublicCollections,
  getPublicResources,
} from "@/features/profile/data";
import { PublicResourceList } from "@/features/profile/components/public-resource-list";
import { ResourceListSkeleton } from "@/features/profile/components/profile-skeletons";

interface Props {
  params: Promise<{ userId: string; slug: string }>;
}

export default function PublicCollectionPage({ params }: Props) {
  return (
    <div className="container mx-auto max-w-5xl py-8">
      <Suspense fallback={<CollectionHeaderSkeleton />}>
        <CollectionHeader params={params} />
      </Suspense>

      <section>
        <Suspense fallback={<ResourceListSkeleton />}>
          <CollectionResources params={params} />
        </Suspense>
      </section>
    </div>
  );
}

async function CollectionHeader({ params }: { params: Props["params"] }) {
  const { userId, slug } = await params;

  const [user, collections] = await Promise.all([
    getPublicProfile(userId),
    getPublicCollections(userId),
  ]);

  if (!user) {
    notFound();
  }

  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  return (
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
  );
}

async function CollectionResources({ params }: { params: Props["params"] }) {
  const { userId, slug } = await params;

  const collections = await getPublicCollections(userId);
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  const resources = await getPublicResources(userId, collection.id);

  return <PublicResourceList resources={resources} />;
}

function CollectionHeaderSkeleton() {
  return (
    <section className="mb-6 w-full border-b pb-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-muted h-9 w-32 animate-pulse rounded" />
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-muted h-5 w-5 animate-pulse rounded" />
        <div className="bg-muted h-8 w-48 animate-pulse rounded" />
      </div>
      <div className="bg-muted mt-2 h-5 w-96 animate-pulse rounded" />
    </section>
  );
}
