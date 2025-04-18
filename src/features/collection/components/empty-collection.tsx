"use client";
import { FolderPlus } from "lucide-react";
import { CollectionFormDialog } from "./collection-dialog";

export function EmptyCollection() {
  return (
    <div className="bg-muted/20 flex flex-col items-center justify-center rounded-lg border p-8 text-center">
      <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <FolderPlus className="h-10 w-10" />
      </div>
      <h3 className="mb-1 text-lg font-medium">No collection created</h3>
      <p className="text-muted-foreground mb-4 max-w-sm text-sm">
        Create your first collection to start organizing your resources
      </p>
      <CollectionFormDialog />
    </div>
  );
}
