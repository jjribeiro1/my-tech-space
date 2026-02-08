"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, X, FileCheck } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  fileResourceSchema,
  FileResourceInput,
} from "../../schemas/file-resource-schema";
import { createFileResourceAction } from "../../actions/create-file-resource-action";
import { updateFileResourceAction } from "../../actions/update-file-resource-action";
import { BaseResourceFields } from "./base-resource-fields";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/lib/uploadthing";

interface FileResourceFormProps {
  collections: Array<{ id: string; name: string }>;
  onSuccess?: () => void;
  resourceToEdit?: {
    id: string;
    title: string;
    description: string | null;
    collectionId: string | null;
  } & {
    file?: {
      url: string;
      key: string;
      filename: string;
      mimeType: string;
      sizeBytes: number;
    };
  };
}

export function FileResourceForm({
  collections,
  onSuccess,
  resourceToEdit,
}: FileResourceFormProps) {
  const [isPending, setIsPending] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<
    | {
        url: string;
        key: string;
        name: string;
        type: string;
        size: number;
      }
    | undefined
  >(
    resourceToEdit?.file
      ? {
          url: resourceToEdit.file.url,
          key: resourceToEdit.file.key,
          name: resourceToEdit.file.filename,
          type: resourceToEdit.file.mimeType,
          size: resourceToEdit.file.sizeBytes,
        }
      : undefined,
  );

  const form = useForm<FileResourceInput>({
    defaultValues: resourceToEdit
      ? {
          title: resourceToEdit.title,
          description: resourceToEdit.description ?? "",
          collectionId: resourceToEdit.collectionId ?? "",
          file: resourceToEdit.file
            ? {
                url: resourceToEdit.file.url,
                key: resourceToEdit.file.key,
                filename: resourceToEdit.file.filename,
                mimeType: resourceToEdit.file.mimeType,
                sizeBytes: resourceToEdit.file.sizeBytes,
              }
            : undefined,
        }
      : {
          title: "",
          description: "",
          collectionId: "",
          file: undefined,
        },
    resolver: zodResolver(fileResourceSchema),
  });

  const handleUploadComplete = (
    res: {
      name: string;
      size: number;
      type: string;
      url: string;
      key: string;
    }[],
  ) => {
    if (res && res[0]) {
      const file = res[0];
      setUploadedFile({
        url: file.url,
        key: file.key,
        name: file.name,
        type: file.type,
        size: file.size,
      });
      form.setValue("file", {
        url: file.url,
        key: file.key,
        filename: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
      });
      toast.success("File uploaded successfully");
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(undefined);
    form.setValue(
      "file",
      undefined as unknown as {
        url: string;
        key: string;
        filename: string;
        mimeType: string;
        sizeBytes: number;
      },
    );
  };

  async function onSubmit(data: FileResourceInput) {
    if (!data.file && !resourceToEdit?.file) {
      toast.error("Please upload a file");
      return;
    }

    setIsPending(true);
    try {
      const action = resourceToEdit
        ? await updateFileResourceAction({
            id: resourceToEdit.id,
            title: data.title,
            description: data.description,
            collectionId: data.collectionId,
            file: data.file,
          })
        : await createFileResourceAction(data);

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BaseResourceFields form={form} collections={collections} />

        <div className="space-y-2">
          <label className="text-sm font-medium">File</label>

          {!uploadedFile ? (
            <UploadDropzone<OurFileRouter, "fileResource">
              endpoint="fileResource"
              onClientUploadComplete={handleUploadComplete}
              onUploadError={(error: Error) => {
                toast.error(`Upload failed: ${error.message}`);
              }}
              appearance={{
                container:
                  "ut-ready ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                button:
                  "ut-ready:bg-primary ut-ready:text-primary-foreground ut-uploading:bg-primary/50 ut-uploading:text-primary-foreground",
                allowedContent: "text-muted-foreground text-sm",
              }}
            />
          ) : (
            <div className="bg-muted/50 flex items-center gap-3 rounded-lg border p-4">
              <FileCheck className="text-primary h-8 w-8 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{uploadedFile.name}</p>
                <p className="text-muted-foreground text-sm">
                  {formatFileSize(uploadedFile.size)}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                disabled={isPending}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {form.formState.errors.file && (
            <p className="text-destructive text-sm font-medium">
              {form.formState.errors.file.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={isPending || (!uploadedFile && !resourceToEdit?.file)}
            className="cursor-pointer"
          >
            <FileText />
            {resourceToEdit ? "Save changes" : "Add file"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
