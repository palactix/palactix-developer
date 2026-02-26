import { AuthCard } from "@/components/ui/auth/AuthCard";
import { SignupForm } from "@/features/auth/signup/component";
import Link from "next/link";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <AuthCard
      title="Create an account"
      subtitle="Sign up to get started"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm type="agency" />
      </Suspense>
      <p className="text-center mt-6 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}