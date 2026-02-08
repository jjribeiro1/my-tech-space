export const SUPPORTED_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "css", label: "CSS" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "sql", label: "SQL" },
  { value: "json", label: "JSON" },
  { value: "bash", label: "Bash/Shell" },
  { value: "markdown", label: "Markdown" },
  { value: "yaml", label: "YAML" },
  { value: "dockerfile", label: "Dockerfile" },
  { value: "graphql", label: "GraphQL" },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["value"];
