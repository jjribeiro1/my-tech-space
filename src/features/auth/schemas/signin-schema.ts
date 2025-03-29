import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be 100 characters or less"),
});

export type SigninInput = z.infer<typeof signinSchema>;
