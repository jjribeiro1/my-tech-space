import { resourceTypeEnum } from "@/db/schema/resource";

export const AVAILABLE_RESOURCE_TYPES = [
  { value: "link" as const, label: "Link" },
  { value: "code_snippet" as const, label: "Code Snippet" },
] as const;

export type ResourceTypeValue = (typeof resourceTypeEnum.enumValues)[number];
