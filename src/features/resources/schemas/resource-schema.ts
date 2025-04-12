import { z } from "zod";

export const resourceSchema = z.object({
  url: z.string().url({ message: "Invalid url" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  collectionId: z
    .string({ message: "Invalid collection" })
    .uuid({ message: "Invalid collection" }),
  resourceTypeId: z
    .string({ message: "Invalid collection" })
    .uuid({ message: "Invalid type" }),
});

export type ResourceInput = z.infer<typeof resourceSchema>;
