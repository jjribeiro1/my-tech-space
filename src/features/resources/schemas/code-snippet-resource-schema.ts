import { z } from "zod";
import { baseResourceSchema } from "./base-resource-schema";

export const codeSnippetResourceSchema = baseResourceSchema.extend({
  code: z.string().min(1, { message: "Code is required" }),
  language: z.string().min(1, { message: "Language is required" }),
  filename: z.string().optional(),
});

export type CodeSnippetResourceInput = z.infer<
  typeof codeSnippetResourceSchema
>;
