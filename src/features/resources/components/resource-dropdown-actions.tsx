"use client";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ResourceFormDialog } from "./resource-dialog";
import { Collection } from "@/features/collection/types";
import { Resource, ResourceType } from "../types";

interface Props {
  collections: Array<Collection>;
  resourceTypes: Array<ResourceType>;
  resource: Resource;
}
export default function ResourceActionsDropdown({
  collections,
  resourceTypes,
  resource
}: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"} className="cursor-pointer">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpenDialog(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Remmover</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openDialog && (
        <ResourceFormDialog
          collections={collections}
          resourceTypes={resourceTypes}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          resourceToEdit={resource}
        />
      )}
    </>
  );
}
