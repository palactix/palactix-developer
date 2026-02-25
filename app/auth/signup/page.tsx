import { SignupForm } from "@/features/auth/signup/component";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Signup Page</h1>
      <SignupForm type="agency" />
    </div>
  );
}