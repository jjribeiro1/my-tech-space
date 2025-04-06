import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Folder,
  Lock,
  Share2,
  Trash,
  Unlock,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ResourceList } from "@/features/resources/components/resource-list";
import { getCollectionsFromUser } from "@/features/collection/data";
import { getResourceByCollection } from "@/features/resources/data";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collections = await getCollectionsFromUser();
  const collectionFromSlug = collections.find((c) => c.slug === slug);
  const resourcesFromCollection = await getResourceByCollection(collectionFromSlug?.id as string)

  return (
    <>
      <section className="w-full border-b py-6">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={"/dashboard"}
              className={buttonVariants({ variant: "ghost" })}
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

          <div className="flex items-center gap-2">
            <Button variant="outline" size={"sm"}>
              <Share2 />
              Share
            </Button>
            <Button variant="outline" size={"sm"}>
              <Edit />
              Edit
            </Button>
            <Button variant="outline" size={"sm"}>
              <Trash />
              Delete
            </Button>
          </div>
        </div>
      </section>

      <h2 className="text-muted-foreground container mx-auto py-6">
        {collectionFromSlug?.description}
      </h2>

      <section className="container mx-auto py-6">
        <ResourceList
          collections={collections}
          resources={resourcesFromCollection}
        />
      </section>
    </>
  );
}
