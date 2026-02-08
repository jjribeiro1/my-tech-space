import { FileCode } from "lucide-react";
import { ResourceCodeSnippetData } from "../data";
import { CodeDisplay } from "./code-display";

interface ResourceCodeSnippetContentProps {
  codeSnippet: ResourceCodeSnippetData["codeSnippet"];
}

export function ResourceCodeSnippetContent({
  codeSnippet,
}: ResourceCodeSnippetContentProps) {
  return (
    <div className="space-y-3">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <span className="bg-muted inline-flex items-center gap-1 rounded px-2 py-1 font-mono text-xs">
          <FileCode className="h-3 w-3" />
          {codeSnippet.language}
        </span>
        {codeSnippet.filename && (
          <span className="font-mono text-xs">{codeSnippet.filename}</span>
        )}
      </div>
      <CodeDisplay
        code={codeSnippet.code}
        language={codeSnippet.language}
        maxHeight={300}
      />
    </div>
  );
}
