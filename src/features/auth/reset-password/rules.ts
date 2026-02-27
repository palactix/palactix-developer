import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((values) => values.password === values.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });
