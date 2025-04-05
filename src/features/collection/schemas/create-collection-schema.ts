import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  isPrivate: z.boolean().default(false)
});

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>
