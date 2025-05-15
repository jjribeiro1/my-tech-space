"use client";
import { useState, use } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceFormDialog } from "./resource-dialog";
import { ResourceTabs } from "./resource-tabs";
import { FavoriteFilterButton } from "./favorite-filter-button";
import { Collection } from "@/features/collection/types";
import { Resource, ResourceType } from "../types";

interface Props {
  resources: Array<Resource>;
  resourceTypes: Array<ResourceType>;
  collections: Array<Collection>;
  favoriteResourcesCountPromise: Promise<number>;
}

export function LatestResources({
  resources,
  resourceTypes,
  collections,
  favoriteResourcesCountPromise,
}: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const favoritesCount = use(favoriteResourcesCountPromise)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold tracking-tight">Latest Resources</p>

        <div className="flex items-end gap-2">
          <FavoriteFilterButton
            favoritesCount={favoritesCount}
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
    </section>
  );
}
