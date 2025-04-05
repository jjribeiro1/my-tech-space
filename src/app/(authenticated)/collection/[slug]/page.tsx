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
import { getCollectionBySlug } from "@/features/collection/data";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

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
            <h1 className="text-lg font-medium">{collection.name}</h1>
            {collection.isPrivate ? (
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

      <section className="container mx-auto py-6">
        <h2 className="text-muted-foreground">{collection.description}</h2>
      </section>
    </>
  );
}
