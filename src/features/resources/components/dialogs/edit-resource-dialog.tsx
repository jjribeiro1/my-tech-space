"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LinkResourceForm } from "../forms/link-resource-form";
import { CodeSnippetResourceForm } from "../forms/code-snippet-resource-form";
import { ResourceWithType } from "../../data";

interface EditResourceDialogProps {
  resource: ResourceWithType;
  collections: Array<{ id: string; name: string }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function EditResourceDialog({
  resource,
  collections,
  open,
  onOpenChange,
  trigger,
}: EditResourceDialogProps) {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit resource</DialogTitle>
          <DialogDescription>Update your resource details.</DialogDescription>
        </DialogHeader>

        {resource.type === "link" ? (
          <LinkResourceForm
            collections={collections}
            resourceToEdit={resource}
            onSuccess={handleSuccess}
          />
        ) : (
          <CodeSnippetResourceForm
            collections={collections}
            resourceToEdit={resource}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
