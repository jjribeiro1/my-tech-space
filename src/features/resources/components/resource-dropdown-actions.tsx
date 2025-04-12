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
import { DeleteResourceAlertDialog } from "./delete-resource-alert";

interface Props {
  collections: Array<Collection>;
  resourceTypes: Array<ResourceType>;
  resource: Resource;
}
export default function ResourceActionsDropdown({
  collections,
  resourceTypes,
  resource,
}: Props) {
  const [openResourceFormDialog, setOpenResourceFormDialog] = useState(false);
  const [openDeleteResourceAlert, setOpenDeleteResourceAlert] = useState(false);

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
              setOpenResourceFormDialog(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpenDeleteResourceAlert(true);
            }}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openResourceFormDialog && (
        <ResourceFormDialog
          openDialog={openResourceFormDialog}
          setOpenDialog={setOpenResourceFormDialog}
          collections={collections}
          resourceTypes={resourceTypes}
          resourceToEdit={resource}
        />
      )}
      {openDeleteResourceAlert && (
        <DeleteResourceAlertDialog
          openDialog={openDeleteResourceAlert}
          setOpenDialog={setOpenDeleteResourceAlert}
          resource={resource}
        />
      )}
    </>
  );
}
