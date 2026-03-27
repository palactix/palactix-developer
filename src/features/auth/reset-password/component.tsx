"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/shared/FormMessage";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/lib/errors";

import { useResetPassword } from "./hook";
import { resetPasswordSchema } from "./rules";
import type { ResetPasswordFormValues } from "./types";

export const ResetPasswordForm = ({ token, email }: { token: string; email: string }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const { submit, isPending, error } = useResetPassword(token, email);

  if (!token || !email) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-destructive">Reset link is invalid or expired.</p>
        <Link href="/auth/forgot-password" className="text-primary font-semibold hover:underline">
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submit)} noValidate>
      <div className="space-y-2">
        <Label htmlFor="reset-password">New Password</Label>
        <PasswordInput
          id="reset-password"
          autoComplete="new-password"
          placeholder="Enter your new password"
          {...register("password")}
        />
        <FormMessage>{errors.password?.message}</FormMessage>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reset-confirm">Confirm Password</Label>
        <PasswordInput
          id="reset-confirm"
          autoComplete="new-password"
          placeholder="Confirm your new password"
          {...register("password_confirmation")}
        />
        <FormMessage>{errors.password_confirmation?.message}</FormMessage>
      </div>

      {error ? <p className="text-sm text-destructive">{getErrorMessage(error, "Unable to reset password")}</p> : null}

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" size="lg" disabled={isPending}>
        {isPending ? "Resetting password..." : "Reset password"}
      </Button>
    </form>
  );
};
