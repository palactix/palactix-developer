"use client";

import { Suspense, startTransition, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/features/developer-app/developer-app.hooks";
import { AppCredStatus } from "@/features/developer-app/developer-app.types";
import { StepIndicator } from "@/features/agency-onboarding/components/StepIndicator";
import { AgencyStep1CreateApp } from "@/features/agency-onboarding/components/AgencyStep1CreateApp";
import { AgencyStep2Platforms } from "@/features/agency-onboarding/components/AgencyStep2Platforms";
import { AgencyStep3Username } from "@/features/agency-onboarding/components/AgencyStep3Username";
import { AgencyStep4Provisioning } from "@/features/agency-onboarding/components/AgencyStep4Provisioning";

export default function AgencyOnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        </div>
      }
    >
      <AgencyOnboardingContent />
    </Suspense>
  );
}

type Step = 1 | 2 | 3 | 4;

function AgencyOnboardingContent() {
  const params = useParams<{ appId: string }>();
  const appId = params.appId;
  const router = useRouter();

  const { data: app, isLoading } = useApp(appId);

  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [username, setUsername] = useState("");
  const initializedRef = useRef(false);

  // Derive initial step from app state — runs once data is loaded
  useEffect(() => {
    if (initializedRef.current || isLoading || !app) return;
    initializedRef.current = true;

    const integrations = app.integrations ?? [];
    const hasVerified = integrations.some((i) => i.status === AppCredStatus.VERIFIED);

    startTransition(() => {
      if (hasVerified) setStep(3);
      else if (integrations.length > 0) setStep(2);
      // else default 1 is already set
    });
  }, [app, isLoading]);

  const goForward = (to: Step) => {
    setDirection(1);
    setStep(to);
  };

  const goBack = (to: Step) => {
    setDirection(-1);
    setStep(to);
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  if (isLoading || !app) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        <p className="text-sm text-zinc-500">Loading your workspace…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden flex flex-col">
      {/* Ambient background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-blue-500/8 dark:bg-blue-500/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-purple-500/8 dark:bg-purple-500/5 blur-[160px] rounded-full" />
      </div>

      {/* Top bar */}
      <header className="w-full px-4 sm:px-8 py-5 flex items-center justify-between max-w-4xl mx-auto">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Exit setup
        </Link>
        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-600">
          Step {step} of 4
        </span>
      </header>

      {/* Step indicator */}
      <div className="w-full px-4 sm:px-8 pb-6 flex justify-center">
        <StepIndicator currentStep={step} />
      </div>

      {/* Step content */}
      <div className="flex-1 w-full max-w-lg mx-auto px-4 sm:px-0 pb-16">
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="p-6 sm:p-8"
            >
              {step === 1 && (
                <AgencyStep1CreateApp
                  appId={appId}
                  initialName={app?.name ?? ""}
                  onComplete={() => goForward(2)}
                />
              )}

              {step === 2 && (
                <AgencyStep2Platforms
                  appId={appId}
                  onContinue={() => goForward(3)}
                  onBack={() => goBack(1)}
                />
              )}

              {step === 3 && (
                <AgencyStep3Username
                  onComplete={(u) => {
                    setUsername(u);
                    goForward(4);
                  }}
                  onBack={() => goBack(2)}
                />
              )}

              {step === 4 && username && (
                <AgencyStep4Provisioning
                  appName={app?.name ?? "Your workspace"}
                  username={username}
                  onFinish={handleFinish}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}




