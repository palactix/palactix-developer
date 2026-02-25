import type { RegisterOptions } from "react-hook-form";

import { PASSWORD_MIN_LENGTH } from "./constants";
import type { SignupFormValues } from "./types";

export const signupRules: {
  name: RegisterOptions<SignupFormValues, "name">;
  email: RegisterOptions<SignupFormValues, "email">;
  password: RegisterOptions<SignupFormValues, "password">;
} = {
  name: {
    required: "Name is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: PASSWORD_MIN_LENGTH,
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    },
  },
};
