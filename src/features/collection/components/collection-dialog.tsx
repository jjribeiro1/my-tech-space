"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  CollectionInput,
  collectionSchema,
} from "../schemas/create-collection-schema";
import { createCollectionAction } from "../actions/create-collection-action";
import { Collection } from "../types";
import { updateCollectionAction } from "../actions/update-collection-action";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";

interface Props {
  collectionToEdit?: Collection;
  trigger?: React.JSX.Element;
}

export function CollectionDialog({ collectionToEdit, trigger }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CollectionInput>({
    defaultValues: collectionToEdit
      ? {
          name: collectionToEdit.name,
          description: collectionToEdit.description as string,
          isPrivate: collectionToEdit.isPrivate,
        }
      : {
          name: "",
          description: "",
          isPrivate: false,
        },
    resolver: zodResolver(collectionSchema),
  });

  function onSubmit(data: CollectionInput) {
    startTransition(async () => {
      const action = collectionToEdit
        ? await updateCollectionAction({
            id: collectionToEdit?.id,
            ...data,
          })
        : await createCollectionAction(data);

      if (action.success) {
        toast.success(action.message);
        setOpenDialog(false);
        if (collectionToEdit && data.name !== collectionToEdit.name) {
          router.push(`/collection/${slugify(data.name)}`);
        }
      } else {
        toast.error(action.message);
      }
    });
  }

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open);
        form.reset();
      }}
    >
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <FolderPlus className="mr-2 h-4 w-4" />
            Create collection
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {collectionToEdit ? "Update collection" : "Create new collection"}
          </DialogTitle>
          <DialogDescription>
            Organize your resources into custom collections.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of collection</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: NodeJS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Description (optional)"}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the purpose of this collection"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel
                    htmlFor="private"
                    className="flex items-center gap-2"
                  >
                    {field.value ? (
                      <Lock className="text-muted-foreground h-4 w-4" />
                    ) : (
                      <Unlock className="text-muted-foreground h-4 w-4" />
                    )}
                    Private collection
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="cursor-pointer"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant={"outline"}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                <FolderPlus />
                {collectionToEdit ? "Save changes" : "Create collection"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
