"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const OnboardingInfo = () => {
  const steps = [
    "Your app will generate a Client ID and Secret",
    "These credentials authenticate your requests to Palactix APIs",
    "You will then connect social platforms to your app",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="mt-12 max-w-lg mx-auto p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm"
    >
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-4 px-2 uppercase tracking-wider">
        What happens next?
      </h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4 px-2">
            <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-tight">
              {step}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
