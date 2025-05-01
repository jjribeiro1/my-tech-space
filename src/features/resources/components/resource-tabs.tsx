import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceItem } from "./resource-item";
import { ResourceTabEmpty } from "./empty-tab-resource";
import { Collection } from "@/features/collection/types";
import { Resource, ResourceType } from "../types";

interface Props {
  collections: Array<Collection>;
  resources: Array<Resource>;
  resourceTypes: Array<ResourceType>;
}

export function ResourceTabs({ collections, resources, resourceTypes }: Props) {
  return (
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
        {resources.length > 0 ? (
          resources.map((resource) => (
            <ResourceItem
              key={resource.id}
              resource={resource}
              resourceTypes={resourceTypes}
              collections={collections}
            />
          ))
        ) : (
          <ResourceTabEmpty />
        )}
      </TabsContent>
      {resourceTypes.map((rt) => (
        <TabsContent key={rt.id} value={rt.id}>
          {resources.filter((r) => r.resourceTypeId === rt.id).length > 0 ? (
            resources
              .filter((r) => r.resourceTypeId === rt.id)
              .map((resource) => (
                <ResourceItem
                  key={resource.id}
                  resource={resource}
                  resourceTypes={resourceTypes}
                  collections={collections}
                />
              ))
          ) : (
            <ResourceTabEmpty resourceType={rt} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
