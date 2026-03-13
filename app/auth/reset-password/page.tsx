"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { AuthCard } from "@/components/ui/auth/AuthCard";
import { ResetPasswordForm } from "@/features/auth/reset-password";
import { loginRoute } from "@/features/auth/login";

function ResetPasswordContent() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  if (!token || !email) {
    return (
      <AuthCard
        title="Invalid reset link"
        subtitle="The password reset link is invalid or has expired"
      >
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Please request a new password reset link.
          </p>
          <Link
            href="/auth/forgot-password"
            className="text-primary font-semibold hover:underline"
          >
            Back to Forgot Password
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Create a new password for your account."
    >
      <ResetPasswordForm token={token} email={email} />

      <p className="text-center mt-6 text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href={loginRoute} className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}