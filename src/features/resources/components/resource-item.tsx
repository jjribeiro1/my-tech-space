import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "@/lib/dayjs";
import ResourceActionsDropdown from "./resource-dropdown-actions";
import { Resource, ResourceType } from "../types";
import { Collection } from "@/features/collection/types";

interface Props {
  resource: Resource;
  resourceTypes: Array<ResourceType>;
  collections: Array<Collection>;
}

export function ResourceItem({ resource, resourceTypes, collections }: Props) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div>
            <CardTitle>{resource.title}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
          </div>

          <div className="flex items-center gap-4">
            <Link href={resource.url!} target="_blank">
              <ExternalLink />
            </Link>
            <ResourceActionsDropdown
              collections={collections}
              resourceTypes={resourceTypes}
              resource={resource}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>{`Created ${dayjs(resource.created_at).fromNow(false)}`}</CardContent>
    </Card>
  );
}
