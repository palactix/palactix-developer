"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useMe } from "@/features/auth/auth.hooks";

export const DeveloperLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, error, data: user } = useMe();
  const [isMobileOpen, setMobileOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (error || !user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950 overflow-hidden font-sans">
      <Sidebar isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} user={user} />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/50">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};