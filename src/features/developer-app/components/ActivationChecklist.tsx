"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { APP_CHECKLIST_STEPS } from "../constants";

type Props = {
  currentStepIndex: number;
};

export const ActivationChecklist = ({ currentStepIndex }: Props) => {
  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Activation Checklist</h3>
      <div className="space-y-4">
        {APP_CHECKLIST_STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.id} className="flex items-center gap-4">
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isCurrent
                    ? "border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-400"
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  isCompleted || isCurrent
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 dark:text-zinc-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};