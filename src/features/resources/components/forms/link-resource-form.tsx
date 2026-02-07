"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  linkResourceSchema,
  LinkResourceInput,
} from "../../schemas/link-resource-schema";
import { createLinkResourceAction } from "../../actions/create-link-resource-action";
import { updateLinkResourceAction } from "../../actions/update-link-resource-action";
import { BaseResourceFields } from "./base-resource-fields";
import { ResourceLinkData } from "../../data";

interface LinkResourceFormProps {
  collections: Array<{ id: string; name: string }>;
  onSuccess?: () => void;
  resourceToEdit?: {
    id: string;
    title: string;
    description: string | null;
    collectionId: string | null;
  } & ResourceLinkData;
}

export function LinkResourceForm({
  collections,
  onSuccess,
  resourceToEdit,
}: LinkResourceFormProps) {
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<LinkResourceInput>({
    defaultValues: resourceToEdit
      ? {
          title: resourceToEdit.title,
          description: resourceToEdit.description ?? "",
          collectionId: resourceToEdit.collectionId ?? "",
          url: resourceToEdit.link.url,
          faviconUrl: resourceToEdit.link.faviconUrl ?? "",
        }
      : {
          title: "",
          description: "",
          collectionId: "",
          url: "",
          faviconUrl: "",
        },
    resolver: zodResolver(linkResourceSchema),
  });

  async function onSubmit(data: LinkResourceInput) {
    setIsPending(true);
    try {
      const action = resourceToEdit
        ? await updateLinkResourceAction(resourceToEdit.id, data)
        : await createLinkResourceAction(data);

      if (action.success) {
        toast.success(action.message);
        onSuccess?.();
      } else {
        toast.error(action.message);
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BaseResourceFields form={form} collections={collections} />

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

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isPending} className="cursor-pointer">
            <Link2 />
            {resourceToEdit ? "Save changes" : "Add link"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
