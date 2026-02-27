import Link from "next/link";
import { Suspense } from "react";

import { AuthCard } from "@/components/ui/auth/AuthCard";
import { ForgotPasswordForm } from "@/features/auth/forgot-password";
import { loginRoute } from "@/features/auth/login";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Forgot Password - Palactix",
  description:
    "Reset your Palactix account password."
};


export default function ForgotPasswordPage() {
  return (
    <AuthCard 
      title="Forgot password" 
      subtitle="No worries, we'll send you reset instructions.">
      <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
      <p className="text-center mt-6 text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href={loginRoute} className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
