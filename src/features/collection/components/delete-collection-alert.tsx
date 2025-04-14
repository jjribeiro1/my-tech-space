"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteCollectionAction } from "../actions/delete-collection-action";

interface Props {
  collectionId: string;
}

export function DeleteCollectionAlert({ collectionId }: Props) {
  const [isPending, startTransation] = useTransition();
  const router = useRouter();

  function onSubmit() {
    startTransation(async () => {
      const action = await deleteCollectionAction(collectionId);
      if (action.success) {
        toast.success(action.message);
        router.replace("/dashboard");
      } else {
        toast.error(action.message);
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          <Trash />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            collection and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onSubmit}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
