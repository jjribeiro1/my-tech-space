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

interface Props {
  resource: {
    id: string;
    title: string;
    url: string | null;
    description: string | null;
    resourceTypeId: string | null;
    created_at: Date;
  };
}

export function ResourceItem({ resource }: Props) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div>
            <CardTitle>{resource.title}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
          </div>

          <Link href={resource.url!} target="_blank">
            <ExternalLink />
          </Link>
        </div>
      </CardHeader>
      <CardContent>{`Created ${dayjs(resource.created_at).fromNow(false)}`}</CardContent>
    </Card>
  );
}
