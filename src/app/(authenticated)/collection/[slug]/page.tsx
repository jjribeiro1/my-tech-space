import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Folder, Lock, Unlock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CollectionActions } from "@/features/collection/components/collection-actions";
import { getCollectionsFromUser } from "@/features/collection/data";
import { ResourceList } from "@/features/resources/components/resource-list";
import {
  getAllResourceTypes,
  getResourcesFromUser,
} from "@/features/resources/data";
import { getSession } from "@/lib/session";

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    isFavorite: string | undefined;
    search: string | undefined;
  }>;
}) {
  const { slug } = await params;
  const { isFavorite, search } = await searchParams;

  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  const userId = session.user.id;

  const collections = await getCollectionsFromUser(userId);
  const collectionFromSlug = collections.find((c) => c.slug === slug);


  const [resourceTypes, resourcesFromCollection] = await Promise.all([
    getAllResourceTypes(),
    getResourcesFromUser(userId, {
      collectionId: collectionFromSlug?.id,
      isFavorite: isFavorite,
      search,
      limit: 100000,
    }),
  ]);

  return (
    <>
      <section className="w-full border-b py-6">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={"/dashboard"}
              className={buttonVariants({ variant: "ghost" })}
              prefetch={true}
            >
              <ArrowLeft />
            </Link>
            <Folder className="h-5 w-5" />
            <h1 className="text-lg font-medium">{collectionFromSlug?.name}</h1>
            {collectionFromSlug?.isPrivate ? (
              <Lock className="text-muted-foreground h-4 w-4" />
            ) : (
              <Unlock className="text-muted-foreground h-4 w-4" />
            )}
          </div>

          <CollectionActions collection={collectionFromSlug!} />
        </div>
      </section>

      <h2 className="text-muted-foreground container mx-auto py-6">
        {collectionFromSlug?.description}
      </h2>

      <section className="container mx-auto py-6">
        <ResourceList
          collections={collections}
          resources={resourcesFromCollection}
          resourceTypes={resourceTypes}
        />
      </section>
    </>
  );
}
