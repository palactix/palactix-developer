"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Rocket, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  appName: string;
  username: string;
  onFinish: () => void;
}

const PROVISION_STEPS = [
  { id: "app", label: "Workspace created", delay: 600 },
  { id: "credentials", label: "Generating API credentials", delay: 1400 },
  { id: "platforms", label: "Configuring platform access", delay: 2400 },
  { id: "dns", label: "Setting up workspace DNS", delay: 3500 },
  { id: "done", label: "Finalizing your workspace", delay: 4600 },
];

export const AgencyStep4Provisioning = ({ appName, username, onFinish }: Props) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isFinished, setIsFinished] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    PROVISION_STEPS.forEach((step, index) => {
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => new Set([...prev, step.id]));
        setActiveStepIndex(index + 1);
      }, step.delay);
      timers.push(timer);
    });

    const finishTimer = setTimeout(() => {
      setIsFinished(true);
    }, PROVISION_STEPS[PROVISION_STEPS.length - 1].delay + 800);
    timers.push(finishTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="provisioning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Loader2 className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400 animate-spin" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Step 4 of 4
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Setting up your workspace
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              This only takes a moment. Please don&apos;t close this page.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-md bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <Rocket className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                All done!
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Your workspace is ready
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{appName}</span> is live at{" "}
              <span className="font-mono text-blue-600 dark:text-blue-400">{username}.palactix.com</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Provisioning steps list */}
      <div className="space-y-3">
        {PROVISION_STEPS.map((step, index) => {
          const isDone = completedSteps.has(step.id);
          const isActive = index === activeStepIndex && !isDone;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                isDone
                  ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-800/50 dark:bg-emerald-950/20"
                  : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
              }`}
            >
              {/* Status icon */}
              <div className="h-5 w-5 shrink-0 flex items-center justify-center">
                {isDone ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </motion.div>
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 text-zinc-400 animate-spin" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700" />
                )}
              </div>

              <span
                className={`text-sm font-medium ${
                  isDone
                    ? "text-emerald-700 dark:text-emerald-400"
                    : isActive
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-500 dark:text-zinc-500"
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Success actions */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-3 pt-2"
          >
            <a
              href={`https://${username}.palactix.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-11 w-full rounded-md bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              Open your workspace
              <ExternalLink className="h-4 w-4" />
            </a>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11"
              onClick={onFinish}
            >
              Go to Dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
