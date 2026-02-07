import { z } from "zod";

export const baseResourceSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  collectionId: z
    .string({ message: "Invalid collection" })
    .uuid({ message: "Invalid collection" }),
});

export type BaseResourceInput = z.infer<typeof baseResourceSchema>;
