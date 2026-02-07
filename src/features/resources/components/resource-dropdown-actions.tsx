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
import { EditResourceDialog } from "./dialogs/edit-resource-dialog";
import { Collection } from "@/features/collection/types";
import { ResourceWithType } from "../data";
import { DeleteResourceAlertDialog } from "./delete-resource-alert";

interface Props {
  collections: Array<Collection>;
  resource: ResourceWithType;
}

export default function ResourceActionsDropdown({
  collections,
  resource,
}: Props) {
  const [openResourceFormDialog, setOpenResourceFormDialog] = useState(false);
  const [openDeleteResourceAlert, setOpenDeleteResourceAlert] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="cursor-pointer">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
              setOpenResourceFormDialog(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
              setOpenDeleteResourceAlert(true);
            }}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditResourceDialog
        resource={resource}
        collections={collections}
        open={openResourceFormDialog}
        onOpenChange={setOpenResourceFormDialog}
      />
      <DeleteResourceAlertDialog
        openDialog={openDeleteResourceAlert}
        setOpenDialog={setOpenDeleteResourceAlert}
        resource={resource}
      />
    </>
  );
}
