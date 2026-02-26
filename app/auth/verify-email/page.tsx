import Link from "next/link";
import { AuthCard } from "@/components/ui/auth/AuthCard";
import { VERIFY_EMAIL_DESCRIPTION, VERIFY_EMAIL_TITLE, VerifyEmailPage } from "@/features/auth/verify-email";


export default function VerifyEmail() {
  return (
    <AuthCard
      title={VERIFY_EMAIL_TITLE}
      subtitle={VERIFY_EMAIL_DESCRIPTION}
    >
      <VerifyEmailPage />
      <p className="text-center mt-6 text-sm text-muted-foreground">
          Back to{" "}
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
