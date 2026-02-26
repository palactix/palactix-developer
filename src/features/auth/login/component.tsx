"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "@/lib/errors";
import { useLogin } from "./hook";
import type { LoginInput } from "./types";
import { loginSchema } from "./rules";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/shared/FormMessage";
import Link from "next/link";

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
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@agency.com" {...register("email")} />
        <FormMessage>{errors.email?.message}</FormMessage>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
        <FormMessage>{errors.password?.message}</FormMessage>
      </div>

      {error ? <p role="alert">{getErrorMessage(error, "Unable to login")}</p> : null}

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" size="lg" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};
