"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code, FileCode, Edit3 } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  codeSnippetResourceSchema,
  CodeSnippetResourceInput,
} from "../../schemas/code-snippet-resource-schema";
import { createCodeSnippetResourceAction } from "../../actions/create-code-snippet-resource-action";
import { updateCodeSnippetResourceAction } from "../../actions/update-code-snippet-resource-action";
import { BaseResourceFields } from "./base-resource-fields";
import { ResourceCodeSnippetData } from "../../data";
import { SUPPORTED_LANGUAGES } from "../../constants/languages";
import { CodeEditor } from "@/components/ui/code-editor";

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
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const [tempCode, setTempCode] = React.useState("");

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

  const selectedLanguage = form.watch("language");
  const codeValue = form.watch("code");
  const lineCount = codeValue ? codeValue.split("\n").length : 0;

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

  function openCodeEditor() {
    setTempCode(codeValue);
    setIsEditorOpen(true);
  }

  function saveCodeEditor() {
    form.setValue("code", tempCode, { shouldValidate: true });
    setIsEditorOpen(false);
  }

  function getLanguageLabel(value: string) {
    return (
      SUPPORTED_LANGUAGES.find((lang) => lang.value === value)?.label ?? value
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BaseResourceFields form={form} collections={collections} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <SelectItem
                            key={lang.value}
                            value={lang.value}
                            className="cursor-pointer"
                          >
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="filename"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
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
                  <button
                    type="button"
                    onClick={openCodeEditor}
                    className="group border-input bg-muted/50 hover:border-primary hover:bg-muted relative w-full rounded-md border border-dashed px-4 py-6 text-left transition-colors"
                  >
                    {field.value ? (
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                          <FileCode className="text-primary h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {selectedLanguage
                              ? getLanguageLabel(selectedLanguage)
                              : "Code snippet"}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {lineCount} {lineCount === 1 ? "line" : "lines"} of
                            code
                          </p>
                        </div>
                        <Edit3 className="text-muted-foreground h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    ) : (
                      <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
                        <Code className="h-8 w-8" />
                        <span className="text-sm">
                          Click to add code snippet
                        </span>
                      </div>
                    )}
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer"
            >
              <Code />
              {resourceToEdit ? "Save changes" : "Add code snippet"}
            </Button>
          </div>
        </form>
      </Form>

      <Sheet open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col sm:max-w-2xl"
        >
          <SheetHeader>
            <SheetTitle>Edit Code</SheetTitle>
            <SheetDescription>
              {selectedLanguage
                ? `Editing ${getLanguageLabel(selectedLanguage)} code`
                : "Edit your code snippet"}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-hidden py-4">
            <CodeEditor
              value={tempCode}
              onChange={setTempCode}
              language={selectedLanguage || "javascript"}
              placeholder="Paste or type your code here..."
              minHeight={400}
              className="h-full min-h-100"
            />
          </div>

          <SheetFooter className="flex-row justify-end gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditorOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={saveCodeEditor}>
              Save Code
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
