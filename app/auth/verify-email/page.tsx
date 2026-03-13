import Link from "next/link";
import { AuthCard } from "@/components/ui/auth/AuthCard";
import { VERIFY_EMAIL_DESCRIPTION, VERIFY_EMAIL_TITLE, VerifyEmailPage } from "@/features/auth/verify-email";
import { loginRoute } from "@/features/auth/login";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Email - Palactix",
  description:
    "Verify your Palactix account email."
};
  
export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const items = await searchParams;

  return (
    <AuthCard
      title={VERIFY_EMAIL_TITLE}
      subtitle={VERIFY_EMAIL_DESCRIPTION}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailPage email={items.email} />
      </Suspense>
      <p className="text-center mt-6 text-sm text-muted-foreground">
          Back to{" "}
          <Link href={loginRoute} className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
