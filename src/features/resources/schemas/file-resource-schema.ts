import { z } from "zod";
import { baseResourceSchema } from "./base-resource-schema";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const MAX_FILE_SIZE = 8 * 1024 * 1024;

export const fileResourceSchema = baseResourceSchema.extend({
  file: z.object({
    url: z.url(),
    key: z.string(),
    filename: z.string(),
    mimeType: z.enum(ALLOWED_MIME_TYPES as [string, ...string[]]),
    sizeBytes: z.number().max(MAX_FILE_SIZE),
  }),
});

export type FileResourceInput = z.infer<typeof fileResourceSchema>;
