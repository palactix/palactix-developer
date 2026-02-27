import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "./constants";

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`),
  agreeToByok: z.boolean().refine((value) => value, {
    message: "You must acknowledge the BYOK requirement to continue.",
  }),
});
