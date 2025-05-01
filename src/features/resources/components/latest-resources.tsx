"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { ResourceFormDialog } from "./resource-dialog";
import { Button } from "@/components/ui/button";
import { ResourceTabs } from "./resource-tabs";
import { Collection } from "@/features/collection/types";
import { Resource, ResourceType } from "../types";

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

      <ResourceTabs
        collections={collections}
        resources={resources}
        resourceTypes={resourceTypes}
      />
    </section>
  );
}
