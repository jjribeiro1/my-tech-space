import { z } from "zod";

const baseResourceSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  collectionId: z
    .string({ message: "Invalid collection" })
    .uuid({ message: "Invalid collection" }),
  type: z.enum(["link", "code_snippet"]),
});

export const linkResourceSchema = baseResourceSchema.extend({
  type: z.literal("link"),
  url: z.string().url({ message: "Invalid url" }),
  faviconUrl: z.string().url().optional().or(z.literal("")),
});

export const codeSnippetResourceSchema = baseResourceSchema.extend({
  type: z.literal("code_snippet"),
  code: z.string().min(1, { message: "Code is required" }),
  language: z.string().min(1, { message: "Language is required" }),
  filename: z.string().optional(),
});

export const resourceSchema = z.discriminatedUnion("type", [
  linkResourceSchema,
  codeSnippetResourceSchema,
]);

export type LinkResourceInput = z.infer<typeof linkResourceSchema>;
export type CodeSnippetResourceInput = z.infer<
  typeof codeSnippetResourceSchema
>;
export type ResourceInput = z.infer<typeof resourceSchema>;
