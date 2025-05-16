"use client";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteResourceAction } from "../actions/delete-resource-action";
import { Resource } from "../types";

interface Props {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  resource: Resource;
}

export function DeleteResourceAlertDialog({
  openDialog,
  setOpenDialog,
  resource,
}: Props) {
  const [isPending, startTransation] = useTransition();

  function onSubmit() {
    startTransation(async () => {
      const action = await deleteResourceAction(resource.id);
      if (action.success) {
        toast.success(action.message);
        setOpenDialog(false);
      } else {
        toast.error(action.message);
      }
    });
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            resource.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            disabled={isPending}
            onClick={onSubmit}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
