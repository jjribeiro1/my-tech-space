import Link from "next/link";
import { Folder, Lock, Dot } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import dayjs from "@/lib/dayjs";
import { Collection } from "../types";

interface Props {
  collection: Collection;
}

export function CollectionCard({ collection }: Props) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Folder className="text-primary h-5 w-5" />
            <Link
              href={`/collection/${collection.slug}`}
              className="font-medium hover:underline"
            >
              {collection.name}
            </Link>
          </div>

          {collection.isPrivate && (
            <Lock className="text-muted-foreground h-4 w-4" />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        <p className="text-secondary-foreground line-clamp-2 text-sm font-medium">
          {collection.description}
        </p>

        <div className="flex items-center gap-x-0.5">
          <span className="text-muted-foreground text-xs">
            {collection.resourceCount > 0
              ? `${collection.resourceCount} resource${collection.resourceCount > 1 ? "s" : ""}`
              : "No resource added"}
          </span>
          <Dot />
          <span className="text-muted-foreground text-xs">
            {`Updated ${dayjs(collection.updated_at ?? collection.created_at).fromNow(false)}`}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/collection/${collection.slug}`}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          View collection
        </Link>
      </CardFooter>
    </Card>
  );
}
