import { ExternalLink, Code, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "@/lib/dayjs";
import { ResourceWithType } from "@/features/resources/data";
import { ResourceLinkContent } from "@/features/resources/components/resource-link-content";
import { ResourceCodeSnippetContent } from "@/features/resources/components/resource-code-snippet-content";
import { FilePreview } from "@/features/resources/components/file-preview";

interface Props {
  resource: ResourceWithType;
}

function getResourceIcon(type: ResourceWithType["type"]) {
  if (type === "link") {
    return <ExternalLink className="h-4 w-4" />;
  }
  if (type === "file") {
    return <FileText className="h-4 w-4" />;
  }
  return <Code className="h-4 w-4" />;
}

function ResourceContent({ resource }: { resource: ResourceWithType }) {
  if (resource.type === "link") {
    return <ResourceLinkContent link={resource.link} />;
  }

  if (resource.type === "code_snippet") {
    return <ResourceCodeSnippetContent codeSnippet={resource.codeSnippet} />;
  }

  if (resource.type === "file") {
    return (
      <FilePreview
        filename={resource.file.filename}
        mimeType={resource.file.mimeType}
        sizeBytes={resource.file.sizeBytes}
        url={resource.file.url}
      />
    );
  }

  return null;
}

export function PublicResourceItem({ resource }: Props) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex items-center gap-2">
              {getResourceIcon(resource.type)}
              {resource.title}
            </CardTitle>
            {resource.description && (
              <CardDescription>{resource.description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResourceContent resource={resource} />
        <div className="text-muted-foreground text-sm">
          Created {dayjs(resource.created_at).fromNow(false)}
        </div>
      </CardContent>
    </Card>
  );
}
