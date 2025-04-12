"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ResourceFormDialog } from "./resource-dialog";
import { ResourceItem } from "./resource-item";
import { Resource, ResourceType } from "../types";
import { Collection } from "@/features/collection/types";

interface Props {
  collections: Array<Collection>;
  resources: Array<Resource>;
  resourceTypes: Array<ResourceType>;
}

export function ResourceList({ collections, resources, resourceTypes }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold tracking-tight">{`Resources (${resources.length})`}</p>
        <ResourceFormDialog
          collections={collections}
          resourceTypes={resourceTypes}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          trigger={
            <Button className="cursor-pointer">
              <Plus />
              Add Resource
            </Button>
          }
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
            <ResourceItem
              key={resource.id}
              resource={resource}
              resourceTypes={resourceTypes}
              collections={collections}
            />
          ))}
        </TabsContent>
        {resourceTypes.map((rt) => (
          <TabsContent key={rt.id} value={rt.id}>
            {resources
              .filter((r) => r.resourceTypeId === rt.id)
              .map((resource) => (
                <ResourceItem
                  key={resource.id}
                  resource={resource}
                  resourceTypes={resourceTypes}
                  collections={collections}
                />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
