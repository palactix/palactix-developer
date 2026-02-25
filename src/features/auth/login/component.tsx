"use client";

import { useForm } from "react-hook-form";

import { getErrorMessage } from "@/lib/errors";

import { useLogin } from "./hook";
import type { LoginInput } from "./types";

const loginRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
  },
} as const;

export const LoginForm = () => {
  const { mutate, isPending, error } = useLogin();

  const onSubmit = (values: LoginInput) => {
    mutate(values);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" autoComplete="email" {...register("email", loginRules.email)} />
        {errors.email?.message ? <p role="alert">{errors.email.message}</p> : null}
      </div>

      <div>
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          {...register("password", loginRules.password)}
        />
        {errors.password?.message ? <p role="alert">{errors.password.message}</p> : null}
      </div>

      {error ? <p role="alert">{getErrorMessage(error, "Unable to login")}</p> : null}

      <button type="submit" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};
