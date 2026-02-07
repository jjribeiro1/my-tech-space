"use client";

import * as React from "react";
import { Link2, Code, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LinkResourceForm } from "../forms/link-resource-form";
import { CodeSnippetResourceForm } from "../forms/code-snippet-resource-form";

type ResourceType = "link" | "code_snippet" | "";

interface CreateResourceDialogProps {
  collections: Array<{ id: string; name: string }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function CreateResourceDialog({
  collections,
  open,
  onOpenChange,
  trigger,
}: CreateResourceDialogProps) {
  const [selectedType, setSelectedType] = React.useState<ResourceType>("");

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setSelectedType("");
    }
  };

  const handleSuccess = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add new resource</DialogTitle>
          <DialogDescription>
            Save articles, videos, documentation, or code snippets.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={selectedType}
              onValueChange={(value: ResourceType) => setSelectedType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="link">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    Link
                  </div>
                </SelectItem>
                <SelectItem value="code_snippet">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Code Snippet
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedType === "link" && (
            <LinkResourceForm
              collections={collections}
              onSuccess={handleSuccess}
            />
          )}

          {selectedType === "code_snippet" && (
            <CodeSnippetResourceForm
              collections={collections}
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
