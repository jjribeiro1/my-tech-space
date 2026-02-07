import Link from "next/link";
import { ExternalLink, Code } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "@/lib/dayjs";
import ResourceActionsDropdown from "./resource-dropdown-actions";
import { ResourceWithType } from "../data";
import { Collection } from "@/features/collection/types";
import { ToggleFavoriteResourceButton } from "./toggle-favorite-resource";

interface Props {
  resource: ResourceWithType;
  collections: Array<Collection>;
}

export function ResourceItem({ resource, collections }: Props) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {resource.type === "link" ? (
                <ExternalLink className="h-4 w-4" />
              ) : (
                <Code className="h-4 w-4" />
              )}
              {resource.title}
            </CardTitle>
            <CardDescription>{resource.description}</CardDescription>
          </div>

          <div className="flex items-center gap-4">
            <ToggleFavoriteResourceButton resource={resource} />
            {resource.type === "link" && (
              <Link href={resource.link.url} target="_blank">
                <ExternalLink className="h-5 w-5" />
              </Link>
            )}
            <ResourceActionsDropdown
              collections={collections}
              resource={resource}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>{`Created ${dayjs(resource.created_at).fromNow(false)}`}</CardContent>
    </Card>
  );
}
