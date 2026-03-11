"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/errors";
import { useLogin } from "./hook";
import type { LoginInput } from "./types";
import { loginSchema } from "./rules";
import {
  isUnverifiedEmailError,
  useResendCooldown,
  useResendVerificationEmail,
} from "@/features/auth/verify-email";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/shared/FormMessage";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const { mutate, isPending, error, isSuccess } = useLogin();
  const [submittedEmail, setSubmittedEmail] = useState("");
  const router = useRouter();

  const { canResend, secondsLeft, startCooldown } = useResendCooldown();
  const { resend, isPending: isResendPending } = useResendVerificationEmail({
    onSuccess: startCooldown,
  });

  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
  }, [isSuccess, router]);

  const showResendVerification = isUnverifiedEmailError(error) && Boolean(submittedEmail);

  const onSubmit = (values: LoginInput) => {
    setSubmittedEmail(values.email);
    mutate(values);
  };

  const handleResendVerification = async () => {
    if (!showResendVerification || !canResend || isResendPending) {
      return;
    }

    await resend({ email: submittedEmail });
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
        <PasswordInput id="password" placeholder="Enter your password" {...register("password")} />
        <FormMessage>{errors.password?.message}</FormMessage>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" size="lg" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign In"}
      </Button>

      {error && !showResendVerification ? (
        <p className="text-sm text-destructive">{getErrorMessage(error, "Unable to login")}</p>
      ) : null}

      {showResendVerification ? (
        <div className="space-y-2">
          <p className="text-sm text-amber-600">Your email is not verified.</p>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleResendVerification}
            disabled={!canResend || isResendPending}
          >
            {isResendPending
              ? "Sending..."
              : canResend
                ? "Resend verification email"
                : `Resend in ${secondsLeft}s`}
          </Button>
        </div>
      ) : null}
    </form>
  );
};
