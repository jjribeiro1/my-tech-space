import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateResourceDialog } from "./create-resource-dialog";
import { ResourceItem } from "./resource-item";
import { getAllResourceTypes } from "../data";

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
          {resources.map((resource) => (
            <ResourceItem key={resource.id} resource={resource} />
          ))}
        </TabsContent>
        {resourceTypes.map((rt) => (
          <TabsContent key={rt.id} value={rt.id}>
            {resources
              .filter((r) => r.resourceTypeId === rt.id)
              .map((resource) => (
                <ResourceItem key={resource.id} resource={resource} />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
