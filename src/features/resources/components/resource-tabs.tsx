import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceItem } from "./resource-item";
import { ResourceTabEmpty } from "./empty-tab-resource";
import { Collection } from "@/features/collection/types";
import { ResourceWithType } from "../data";
import { AVAILABLE_RESOURCE_TYPES } from "../constants/resource-types";

interface Props {
  collections: Array<Collection>;
  resources: Array<ResourceWithType>;
}

export function ResourceTabs({ collections, resources }: Props) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="gap-2">
        <TabsTrigger value="all" className="cursor-pointer">
          All
        </TabsTrigger>
        {AVAILABLE_RESOURCE_TYPES.map((rt) => (
          <TabsTrigger
            key={rt.value}
            value={rt.value}
            className="cursor-pointer"
          >
            {rt.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="all" className="space-y-3">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <ResourceItem
              key={resource.id}
              resource={resource}
              collections={collections}
            />
          ))
        ) : (
          <ResourceTabEmpty />
        )}
      </TabsContent>
      {AVAILABLE_RESOURCE_TYPES.map((rt) => (
        <TabsContent key={rt.value} value={rt.value} className="space-y-3">
          {resources.filter((r) => r.type === rt.value).length > 0 ? (
            resources
              .filter((r) => r.type === rt.value)
              .map((resource) => (
                <ResourceItem
                  key={resource.id}
                  resource={resource}
                  collections={collections}
                />
              ))
          ) : (
            <ResourceTabEmpty typeLabel={rt.label} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
