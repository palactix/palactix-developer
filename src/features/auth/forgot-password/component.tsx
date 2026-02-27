"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/shared/FormMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/lib/errors";

import { useForgotPassword } from "./hook";
import { forgotPasswordSchema } from "./rules";
import type { ForgotPasswordFormValues } from "./types";

export const ForgotPasswordForm = () => {
  const { submit, isPending, isSuccess, error } = useForgotPassword();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground">
            We&apos;ve sent a password reset link to:
          </p>
          <p className="font-semibold text-foreground">{getValues("email")}</p>
          <p className="text-sm text-muted-foreground">
            Check your inbox and click the link to reset your password.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submit)} noValidate>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground text-center mb-4">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
        <Label htmlFor="forgot-email">Email</Label>
        <Input id="forgot-email" type="email" placeholder="you@agency.com" autoComplete="email" {...register("email")} />
        <FormMessage>{errors.email?.message}</FormMessage>
      </div>

      {error ? <p className="text-sm text-destructive">{getErrorMessage(error, "Unable to send reset link")}</p> : null}

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" size="lg" disabled={isPending}>
        {isPending ? "Sending link..." : "Send reset link"}
      </Button>
    </form>
  );
};
