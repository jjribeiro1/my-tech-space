"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceItem } from "./resource-item";
import { ResourceFormDialog } from "./resource-dialog";
import { Collection } from "@/features/collection/types";
import { Resource, ResourceType } from "../types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  resources: Array<Resource>;
  resourceTypes: Array<ResourceType>;
  collections: Array<Collection>;
}

export function LatestResources({
  resources,
  resourceTypes,
  collections,
}: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold tracking-tight">Latest Resources</p>
        <ResourceFormDialog
          collections={collections}
          resourceTypes={resourceTypes}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          trigger={
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> Add resource
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
    </section>
  );
}
