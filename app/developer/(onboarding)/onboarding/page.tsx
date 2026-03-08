"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMe } from "@/features/auth/auth.hooks";
import { OnboardingLayout } from "@/components/developer-onboarding/OnboardingLayout";
import { OnboardingHeader } from "@/components/developer-onboarding/OnboardingHeader";
import { OnboardingInfo } from "@/components/developer-onboarding/OnboardingInfo";
import { CreateAppForm } from "@/features/developer-app/components/CreateAppForm";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AuthUser } from "@/features/auth/auth.types";
import { notify } from "@/shared/notifications/notifier";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const isVerfied = params.get("verified");

  const { data: user, isLoading } = useMe() as { data: AuthUser | undefined, isLoading: boolean };

  useEffect(() => {
    // If user is loaded and already has apps, redirect to dashboard
    if (!isLoading && user?.developer?.has_apps) {
      router.replace("/developer/apps");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (isVerfied == "1") {
      setTimeout(() => {
        notify.success("Email verified successfully! Create your first app.");
      }, 500);
    }
  }, [isVerfied]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="h-10 w-10 text-zinc-400 animate-spin mb-4" />
        <p className="text-zinc-500 font-medium">Getting things ready...</p>
      </div>
    );
  }

  // Prevent flash of onboarding if user actually has apps
  if (user?.developer?.has_apps) {
    return null;
  }

  return (
    <OnboardingLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Side: Context */}
        <OnboardingHeader />
        
        {/* Right Side: Action Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
           className="relative"
        >
          {/* Decorative glow behind card */}
          <div className="absolute -inset-4 bg-blue-500/5 blur-[80px] -z-10 rounded-3xl pointer-events-none" />
          
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-10 overflow-hidden relative">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-950 dark:text-white mb-2">
                Create Developer App
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Set up a new app to access the Palactix API and Webhooks.
              </p>
            </div>

            {/* Render the core form */}
            <div className="relative">
               <CreateAppForm hideHeader />
            </div>

           
          </div>

          {/* Additional Info Section pinned below card on Desktop */}
          <OnboardingInfo />
        </motion.div>
      </div>
    </OnboardingLayout>
  );
}
