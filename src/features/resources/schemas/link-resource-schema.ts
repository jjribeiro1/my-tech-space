import { z } from "zod";
import { baseResourceSchema } from "./base-resource-schema";

export const linkResourceSchema = baseResourceSchema.extend({
  url: z.string().url({ message: "Invalid url" }),
  faviconUrl: z.string().url().optional().or(z.literal("")),
});

export type LinkResourceInput = z.infer<typeof linkResourceSchema>;
