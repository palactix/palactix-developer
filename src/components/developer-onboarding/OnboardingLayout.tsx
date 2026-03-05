"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface OnboardingLayoutProps {
  children: ReactNode;
}

export const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Premium Radial Gradient Background */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.15), transparent 70%)"
        }}
      />
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {children}
      </div>
    </div>
  );
};
