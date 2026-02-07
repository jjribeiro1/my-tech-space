import { z } from "zod";

export const collectionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  isPrivate: z.boolean(),
});

export type CollectionInput = z.infer<typeof collectionSchema>;
