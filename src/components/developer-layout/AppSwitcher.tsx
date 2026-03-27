"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsUpDown, Check, Plus, Box, Loader2 } from "lucide-react";
import { useApps } from "@/features/developer-app/developer-app.hooks";

export const AppSwitcher = ({ isCollapsed }: { isCollapsed?: boolean }) => {
  const router = useRouter();
  const params = useParams();
  const appId = params.appId as string;
  
  const { data: apps, isLoading } = useApps();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentApp = useMemo(() => {
    if (!apps || apps.length === 0) return null;
    return apps.find(a => a.id === appId) || apps[0];
  }, [apps, appId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    setIsOpen(false);
    if (id !== currentApp?.id) {
      router.push(`/developer/apps/${id}`);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading || !apps?.length}
        className={`flex items-center w-full gap-3 p-2 rounded-xl transition-colors ${
          isOpen 
            ? "bg-zinc-100 dark:bg-zinc-800/80" 
            : "hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shrink-0 shadow-sm overflow-hidden">
          {currentApp?.logo_url ? (
            <img src={currentApp.logo_url} alt={currentApp.name} className="w-full h-full object-cover" />
          ) : (
            <Box className="w-4 h-4" />
          )}
        </div>
        
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-between overflow-hidden">
            <div className="flex flex-col items-start truncate">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate w-full text-left">
                {isLoading ? "Loading..." : (currentApp?.name || "No Apps")}
              </span>
              <span className="text-[11px] text-zinc-500 font-medium">Developer App</span>
            </div>
            {isLoading ? <Loader2 className="w-4 h-4 text-zinc-400 shrink-0 ml-2 animate-spin" /> : <ChevronsUpDown className="w-4 h-4 text-zinc-400 shrink-0 ml-2" />}
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-50 left-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden ${
              isCollapsed ? "w-64" : "w-full min-w-[240px]"
            }`}
          >
            <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Your Apps
            </div>
            <div className="p-1 space-y-0.5">
              {apps?.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleSelect(app.id)}
                  className="w-full flex items-center gap-3 p-2 text-left rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 shrink-0 overflow-hidden">
                    {app.logo_url ? (
                        <img src={app.logo_url} alt={app.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xs font-semibold uppercase">{app.name.substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden flex flex-col">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {app.name}
                    </span>
                    <span className="text-xs text-zinc-500 capitalize">{app.status}</span>
                  </div>
                  {currentApp?.id === app.id && (
                    <Check className="w-4 h-4 text-zinc-900 dark:text-white shrink-0 mr-1" />
                  )}
                </button>
              ))}
            </div>
            <div className="p-1 border-t border-zinc-100 dark:border-zinc-800/80">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/developer/apps/new');
                }}
                className="w-full flex items-center gap-3 p-2 text-left rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-transparent shrink-0">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Create New App</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};