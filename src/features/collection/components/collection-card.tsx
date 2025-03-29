import Link from "next/link";
import { Folder, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  collection: {
    id: string;
    name: string;
    description: string;
    resourceCount: number;
    isPrivate: boolean;
  };
}

export function CollectionCard({ collection }: Props) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Folder className="text-primary h-5 w-5" />
            <Link
              href={`/collection/${collection.id}`}
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
      <CardContent>
        <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">
          {collection.description}
        </p>
        <p className="text-muted-foreground text-xs">
          {collection.resourceCount}{" "}
          {collection.resourceCount === 1 ? "resource" : "resources"} • Updated
          1 hour ago
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/collection/${collection.id}`}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          View collection
        </Link>
      </CardFooter>
    </Card>
  );
}
