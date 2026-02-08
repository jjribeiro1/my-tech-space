"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { highlight, languages } from "prismjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-graphql";

import "prismjs/themes/prism-tomorrow.css";

interface CodeDisplayProps {
  code: string;
  language: string;
  className?: string;
  maxHeight?: number;
}

const getPrismLanguage = (lang: string): string => {
  const langMap: Record<string, string> = {
    javascript: "javascript",
    typescript: "typescript",
    jsx: "jsx",
    tsx: "tsx",
    css: "css",
    python: "python",
    go: "go",
    rust: "rust",
    sql: "sql",
    json: "json",
    bash: "bash",
    shell: "bash",
    markdown: "markdown",
    md: "markdown",
    yaml: "yaml",
    yml: "yaml",
    dockerfile: "docker",
    graphql: "graphql",
  };

  const normalizedLang = lang.toLowerCase().trim();
  return langMap[normalizedLang] || "javascript";
};

export function CodeDisplay({
  code,
  language,
  className,
  maxHeight = 300,
}: CodeDisplayProps) {
  const [copied, setCopied] = React.useState(false);

  const highlightCode = (codeText: string) => {
    const prismLang =
      languages[getPrismLanguage(language)] || languages.javascript;
    return highlight(codeText, prismLang, language);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div
      className={cn(
        "bg-muted/50 relative overflow-auto rounded-md border font-mono text-sm",
        className,
      )}
      style={{ maxHeight }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 h-8 w-8 bg-zinc-700/50 hover:bg-zinc-600/50"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-zinc-400" />
        )}
      </Button>
      <pre
        className="p-4"
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          fontSize: 14,
          backgroundColor: "#2d2d2d",
          margin: 0,
        }}
        dangerouslySetInnerHTML={{
          __html: highlightCode(code),
        }}
      />
    </div>
  );
}
