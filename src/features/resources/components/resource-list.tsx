"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateResourceDialog } from "./dialogs/create-resource-dialog";
import { ResourceTabs } from "./resource-tabs";
import { FavoriteFilterButton } from "./favorite-filter-button";
import { SearchResourceInput } from "./search-resource-input";
import { Collection } from "@/features/collection/types";
import { ResourceWithType } from "../data";

interface Props {
  collections: Array<Collection>;
  resources: Array<ResourceWithType>;
}

export function ResourceList({ collections, resources }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold tracking-tight">{`Resources (${resources.length})`}</p>

        <div className="flex items-center gap-2">
          <SearchResourceInput />

          <FavoriteFilterButton
            favoritesCount={resources.filter((r) => r.isFavorite).length}
          />

          <CreateResourceDialog
            collections={collections}
            open={openDialog}
            onOpenChange={setOpenDialog}
            trigger={
              <Button variant="outline" size="sm" className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> Add resource
              </Button>
            }
          />
        </div>
      </div>

      <ResourceTabs collections={collections} resources={resources} />
    </div>
  );
}
