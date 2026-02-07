"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Link2, Code } from "lucide-react";
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
import { ResourceWithType } from "../data";
import { updateResourceAction } from "../actions/update-resource-action";
import { AVAILABLE_RESOURCE_TYPES } from "../constants/resource-types";

interface Props {
  collections: Array<{ id: string; name: string }>;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  trigger?: React.JSX.Element;
  resourceToEdit?: ResourceWithType;
}

export function ResourceFormDialog({
  collections,
  openDialog,
  setOpenDialog,
  trigger,
  resourceToEdit,
}: Props) {
  const [isPending, startTransation] = useTransition();

  const form = useForm<ResourceInput>({
    defaultValues: resourceToEdit
      ? resourceToEdit.type === "link"
        ? {
            type: "link",
            title: resourceToEdit.title,
            description: resourceToEdit.description ?? "",
            collectionId: resourceToEdit.collectionId ?? "",
            url: resourceToEdit.link.url,
            faviconUrl: resourceToEdit.link.faviconUrl ?? "",
          }
        : {
            type: "code_snippet",
            title: resourceToEdit.title,
            description: resourceToEdit.description ?? "",
            collectionId: resourceToEdit.collectionId ?? "",
            code: resourceToEdit.codeSnippet.code,
            language: resourceToEdit.codeSnippet.language,
            filename: resourceToEdit.codeSnippet.filename ?? "",
          }
      : {
          type: "link",
          title: "",
          description: "",
          collectionId: "",
          url: "",
          faviconUrl: "",
        },
    resolver: zodResolver(resourceSchema),
  });

  const selectedType = form.watch("type");

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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {resourceToEdit ? "Edit resource" : "Add new resource"}
          </DialogTitle>
          <DialogDescription>
            Save articles, videos, documentation, or code snippets.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!!resourceToEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {AVAILABLE_RESOURCE_TYPES.map((rt) => (
                          <SelectItem key={rt.value} value={rt.value}>
                            <div className="flex items-center gap-2">
                              {rt.value === "link" ? (
                                <Link2 className="h-4 w-4" />
                              ) : (
                                <Code className="h-4 w-4" />
                              )}
                              {rt.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collectionId"
                render={({ field }) => (
                  <FormItem className="w-2/3">
                    <FormLabel>Collection</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a collection" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {collections.map((collection) => (
                          <SelectItem key={collection.id} value={collection.id}>
                            {collection.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedType === "link" && (
              <>
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
                  name="faviconUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favicon URL (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/favicon.ico"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {selectedType === "code_snippet" && (
              <>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <Input placeholder="typescript" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="filename"
                    render={({ field }) => (
                      <FormItem className="w-2/3">
                        <FormLabel>Filename (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="example.ts" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your code here..."
                          className="min-h-[200px] resize-none font-mono"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Resource title" {...field} />
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
