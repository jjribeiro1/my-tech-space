"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateResourceDialog } from "./dialogs/create-resource-dialog";
import { ResourceTabs } from "./resource-tabs";
import { Collection } from "@/features/collection/types";
import { Resource } from "../types";

interface Props {
  resources: Array<Resource>;
  collections: Array<Collection>;
}

export function LatestResources({ resources, collections }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold tracking-tight">Latest Resources</p>

        <div className="flex items-end gap-2">
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
    </section>
  );
}
