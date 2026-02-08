"use client";

import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
}

export function FilePreview({
  filename,
  mimeType,
  sizeBytes,
  url,
}: FilePreviewProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes("pdf")) {
      return <FileText className="h-10 w-10 text-red-500" />;
    }
    if (mimeType.includes("word") || mimeType.includes("document")) {
      return <FileText className="h-10 w-10 text-blue-500" />;
    }
    return <FileText className="text-muted-foreground h-10 w-10" />;
  };

  return (
    <div className="bg-card hover:bg-accent/50 flex items-center gap-4 rounded-lg border p-4 transition-colors">
      <div className="shrink-0">{getFileIcon(mimeType)}</div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium" title={filename}>
          {filename}
        </p>
        <p className="text-muted-foreground text-sm">
          {formatFileSize(sizeBytes)}
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" size="sm" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1 h-4 w-4" />
            Open
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={url} download={filename}>
            <Download className="mr-1 h-4 w-4" />
            Download
          </a>
        </Button>
      </div>
    </div>
  );
}
