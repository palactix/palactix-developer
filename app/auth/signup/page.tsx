import { AuthCard } from "@/components/ui/auth/AuthCard";
import { loginRoute } from "@/features/auth/login";
import { SignupForm } from "@/features/auth/signup/component";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Signup - Palactix",
  description:
    "Create your Palactix agency account."
};

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your agency account"
      subtitle="Start your 14-day evaluation — no credit card required. Evaluation begins once your first client account is connected."
    >
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm type="agency" />
      </Suspense>
       <p className="text-xs text-center text-muted-foreground mt-6">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>
      <p className="text-center mt-6 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={loginRoute} className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
      <p className="text-center mt-6 text-sm text-muted-foreground">
        Developers{" "}
        <Link href={"/developer/signup"} className="text-primary font-semibold hover:underline">
          Create a developer account 
        </Link>
      </p>
    </AuthCard>
  );
}