"use client";

import * as React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import { cn } from "@/lib/utils";

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

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  placeholder?: string;
  className?: string;
  minHeight?: number;
}

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  placeholder = "Paste your code here...",
  className,
  minHeight = 200,
}: CodeEditorProps) {
  const getPrismLanguage = (lang: string) => {
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

  const highlightCode = (code: string) => {
    const prismLang =
      languages[getPrismLanguage(language)] || languages.javascript;
    return highlight(code, prismLang, language);
  };

  return (
    <div
      className={cn(
        "border-input bg-muted/50 relative rounded-md border font-mono text-sm",
        "focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2",
        className,
      )}
    >
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={highlightCode}
        padding={16}
        placeholder={placeholder}
        className="font-mono"
        textareaClassName="focus:outline-none"
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          fontSize: 14,
          minHeight,
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
