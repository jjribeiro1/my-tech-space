"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceFormDialog } from "./resource-dialog";
import { ResourceTabs } from "./resource-tabs";
import { FavoriteFilterButton } from "./favorite-filter-button";
import { Collection } from "@/features/collection/types";
import { Resource, ResourceType } from "../types";

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

        <div className="flex items-center gap-2">
          <FavoriteFilterButton
            favoritesCount={resources.filter((r) => r.isFavorite).length}
          />

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
      </div>

      <ResourceTabs
        collections={collections}
        resources={resources}
        resourceTypes={resourceTypes}
      />
    </div>
  );
}
