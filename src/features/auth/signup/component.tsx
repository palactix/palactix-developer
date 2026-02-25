"use client";

import { useForm } from "react-hook-form";

import { useSignup } from "./hook";
import { signupRules } from "./rules";
import type { SignupFormValues, SignupType } from "./types";

type SignupFormProps = {
  type: SignupType;
};

export const SignupForm = ({ type }: SignupFormProps) => {
  const { submit, isPending } = useSignup(type);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <div>
        <label htmlFor="signup-name">Name</label>
        <input id="signup-name" type="text" autoComplete="name" {...register("name", signupRules.name)} />
        {errors.name?.message ? <p role="alert">{errors.name.message}</p> : null}
      </div>

      <div>
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          {...register("email", signupRules.email)}
        />
        {errors.email?.message ? <p role="alert">{errors.email.message}</p> : null}
      </div>

      <div>
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          {...register("password", signupRules.password)}
        />
        {errors.password?.message ? <p role="alert">{errors.password.message}</p> : null}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};
