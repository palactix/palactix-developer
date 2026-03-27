"use client";

import { useMe } from "@/features/auth/auth.hooks";
import { AuthUser } from "@/features/auth/login/types";
import { notify } from "@/shared/notifications/notifier";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data: user, isLoading } = useMe() as { data: AuthUser | undefined, isLoading: boolean };

  if(isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <p className="text-zinc-500 font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  if(user) {
    const { signup_type } = user;
    if(signup_type === "developer") {
      router.replace("/developer/apps");
    } else if (signup_type === "agency") {
      router.replace("/agency/overview");
    } else {
      notify.error("Unknown user type. Please contact support.");
      router.replace("/auth/login");
    }
  } else {
    notify.error("You need to be logged in to access the dashboard.");
    router.replace("/auth/login");
    return null;
  }
  
}