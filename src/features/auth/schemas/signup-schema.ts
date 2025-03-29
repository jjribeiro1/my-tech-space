import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be 50 characters or less"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be 100 characters or less"),
    confirmPassword: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters")
      .max(100, "Password confirmation must be 100 characters or less"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupSchema>;
