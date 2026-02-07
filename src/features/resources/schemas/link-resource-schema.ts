import { z } from "zod";
import { baseResourceSchema } from "./base-resource-schema";

export const linkResourceSchema = baseResourceSchema.extend({
  url: z.string().url({ message: "Invalid url" }),
});

export type LinkResourceInput = z.infer<typeof linkResourceSchema>;
