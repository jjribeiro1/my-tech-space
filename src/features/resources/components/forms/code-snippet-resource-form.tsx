"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  codeSnippetResourceSchema,
  CodeSnippetResourceInput,
} from "../../schemas/code-snippet-resource-schema";
import { createCodeSnippetResourceAction } from "../../actions/create-code-snippet-resource-action";
import { updateCodeSnippetResourceAction } from "../../actions/update-code-snippet-resource-action";
import { BaseResourceFields } from "./base-resource-fields";
import { ResourceCodeSnippetData } from "../../data";

interface CodeSnippetResourceFormProps {
  collections: Array<{ id: string; name: string }>;
  onSuccess?: () => void;
  resourceToEdit?: {
    id: string;
    title: string;
    description: string | null;
    collectionId: string | null;
  } & ResourceCodeSnippetData;
}

export function CodeSnippetResourceForm({
  collections,
  onSuccess,
  resourceToEdit,
}: CodeSnippetResourceFormProps) {
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<CodeSnippetResourceInput>({
    defaultValues: resourceToEdit
      ? {
          title: resourceToEdit.title,
          description: resourceToEdit.description ?? "",
          collectionId: resourceToEdit.collectionId ?? "",
          code: resourceToEdit.codeSnippet.code,
          language: resourceToEdit.codeSnippet.language,
          filename: resourceToEdit.codeSnippet.filename ?? "",
        }
      : {
          title: "",
          description: "",
          collectionId: "",
          code: "",
          language: "",
          filename: "",
        },
    resolver: zodResolver(codeSnippetResourceSchema),
  });

  async function onSubmit(data: CodeSnippetResourceInput) {
    setIsPending(true);
    try {
      const action = resourceToEdit
        ? await updateCodeSnippetResourceAction(resourceToEdit.id, data)
        : await createCodeSnippetResourceAction(data);

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

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isPending} className="cursor-pointer">
            <Code />
            {resourceToEdit ? "Save changes" : "Add code snippet"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
