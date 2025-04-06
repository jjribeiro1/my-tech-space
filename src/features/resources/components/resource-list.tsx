import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllResourceTypes } from "../data";
import { CreateResourceDialog } from "./create-resource-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dayjs from "@/lib/dayjs";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface Props {
  collections: Array<{ id: string; name: string }>;
  resources: Array<{
    id: string;
    title: string;
    url: string | null;
    description: string | null;
    resourceTypeId: string | null;
    created_at: Date;
  }>;
}

export async function ResourceList({ collections, resources }: Props) {
  const resourceTypes = await getAllResourceTypes();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold tracking-tight">{`Resources (${resources.length})`}</p>
        <CreateResourceDialog
          collections={collections}
          resourceTypes={resourceTypes}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="gap-2">
          <TabsTrigger value="all" className="cursor-pointer">
            All
          </TabsTrigger>
          {resourceTypes.map((rt) => (
            <TabsTrigger key={rt.id} value={rt.id} className="cursor-pointer">
              {rt.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" className="space-y-3">
          {resources.map((r) => (
            <div key={r.id}>
              <Card className="relative">
                <CardHeader>
                  <div className="flex w-full justify-between">
                    <div>
                      <CardTitle>{r.title}</CardTitle>
                      <CardDescription>{r.description}</CardDescription>
                    </div>

                    <Link href={r.url!} target="_blank">
                      <ExternalLink />
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>{`Created ${dayjs(r.created_at).fromNow(false)}`}</CardContent>
              </Card>
            </div>
          ))}
        </TabsContent>
        {resourceTypes.map((rt) => (
          <TabsContent key={rt.id} value={rt.id}>
            {resources
              .filter((r) => r.resourceTypeId === rt.id)
              .map((r) => (
                <div key={r.id}>
                  <Card className="relative">
                    <CardHeader>
                      <div className="flex w-full justify-between">
                        <div>
                          <CardTitle>{r.title}</CardTitle>
                          <CardDescription>{r.description}</CardDescription>
                        </div>

                        <Link href={r.url!} target="_blank">
                          <ExternalLink />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>{`Created ${dayjs(r.created_at).fromNow(false)}`}</CardContent>
                  </Card>
                </div>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
