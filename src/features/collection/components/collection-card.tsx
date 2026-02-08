import Link from "next/link";
import { Folder, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import dayjs from "@/lib/dayjs";
import { Collection } from "../types";

interface Props {
  collection: Collection;
}

export function CollectionCard({ collection }: Props) {
  return (
    <Link href={`/collection/${collection.slug}`} prefetch={true}>
      <Card className="group hover:border-primary/50 h-full cursor-pointer p-4 transition-all hover:shadow-md">
        <CardContent className="flex flex-col gap-3 p-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <Folder className="text-primary h-4 w-4 shrink-0" />
              <span className="truncate font-medium group-hover:underline">
                {collection.name}
              </span>
            </div>

            {collection.isPrivate && (
              <Lock className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
            )}
          </div>

          {collection.description && (
            <p className="text-secondary-foreground line-clamp-1 text-xs">
              {collection.description}
            </p>
          )}

          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <span>
              {collection.resourceCount > 0
                ? `${collection.resourceCount} resource${collection.resourceCount > 1 ? "s" : ""}`
                : "No resources"}
            </span>
            <span>·</span>
            <span>
              {`Updated ${dayjs(collection.updated_at ?? collection.created_at).fromNow(false)}`}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
