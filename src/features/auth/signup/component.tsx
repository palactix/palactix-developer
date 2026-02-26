"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useSignup } from "./hook";
import { signupSchema } from "./rules";
import type { SignupFormValues, SignupType } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/shared/FormMessage";

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
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submit)} noValidate>
      <div className="space-y-2">
        <Label htmlFor="signup-name">Name</Label>
        <Input id="signup-name" type="text"  placeholder="Acme Digital Agency" autoComplete="name" {...register("name")} />
        <FormMessage>{errors.name?.message}</FormMessage>
      </div>

     <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
           placeholder="you@agency.com" 
          {...register("email")}
        />
        <FormMessage>{errors.email?.message}</FormMessage>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a strong password"
          {...register("password")}
        />
        <FormMessage>{errors.password?.message}</FormMessage>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};
