"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResourceInput, resourceSchema } from "../schemas/resource-schema";
import { toast } from "sonner";
import { createResourceAction } from "../actions/create-resource-action";
import { Resource } from "../types";
import { updateResourceAction } from "../actions/update-resource-action";

interface Props {
  resourceTypes: Array<{ id: string; name: string }>;
  collections: Array<{ id: string; name: string }>;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  trigger?: React.JSX.Element;
  resourceToEdit?: Resource;
}

export function ResourceFormDialog({
  collections,
  resourceTypes,
  openDialog,
  setOpenDialog,
  trigger,
  resourceToEdit,
}: Props) {
  const [isPending, startTransation] = useTransition();
  const form = useForm<ResourceInput>({
    defaultValues: resourceToEdit
      ? {
          collectionId: resourceToEdit.collectionId as string,
          description: resourceToEdit.description as string,
          resourceTypeId: resourceToEdit.resourceTypeId as string,
          title: resourceToEdit.title as string,
          url: resourceToEdit.url as string,
        }
      : {
          collectionId: "",
          description: "",
          resourceTypeId: "",
          title: "",
          url: "",
        },
    resolver: zodResolver(resourceSchema),
  });

  function onSubmit(data: ResourceInput) {
    startTransation(async () => {
      const action = resourceToEdit
        ? await updateResourceAction({ id: resourceToEdit.id, ...data })
        : await createResourceAction(data);

      if (action.success) {
        toast.success(action.message);
        setOpenDialog(false);
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
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new resource</DialogTitle>
          <DialogDescription>
            Save articles, videos, documentation, or code snippets.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://app.daily.dev/posts/svuczj4ra"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full items-center gap-2">
              <FormField
                control={form.control}
                name="resourceTypeId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {resourceTypes.map((resource) => (
                          <SelectItem key={resource.id} value={resource.id}>
                            {resource.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collectionId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Collection</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a collection" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {collections.map((collection) => (
                          <SelectItem key={collection.id} value={collection.id}>
                            {collection.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Notes (optional)"}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add your notes about this resource"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                onClick={() => setOpenDialog(false)}
                type="button"
                variant="outline"
                className="cursor-pointer"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
              >
                <BookOpen />
                {resourceToEdit ? "Save changes" : "Add resource"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
