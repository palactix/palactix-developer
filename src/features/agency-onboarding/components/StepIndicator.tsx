"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Create App" },
  { label: "Connect Platforms" },
  { label: "Choose Username" },
  { label: "Provisioning" },
];

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`h-7 w-7 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                  isCompleted || isActive
                    ? "bg-primary border-primary"
                    : "bg-transparent border-zinc-300 dark:border-zinc-600"
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <span
                    className={`text-xs font-bold ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    {stepNumber}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] font-medium whitespace-nowrap hidden sm:block ${
                  isActive
                    ? "text-zinc-900 dark:text-zinc-50"
                    : isCompleted
                      ? "text-zinc-600 dark:text-zinc-400"
                      : "text-zinc-400 dark:text-zinc-600"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div className="mx-2 mb-5 sm:mb-0 shrink-0 w-10 sm:w-16">
                <div className="h-0.5 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-zinc-950 dark:bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: stepNumber < currentStep ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
