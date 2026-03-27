"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
          isOpen
            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
      >
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-zinc-950" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-80 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50 origin-top-right"
          >
            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Notifications</h3>
              <button className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">Mark all as read</button>
            </div>
            <div className="p-0.5">
              <div className="p-4 flex gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors rounded-xl cursor-default">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0" />
                <div>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100"><span className="font-medium">API Rate Limit</span> reached for Palactix Publisher.</p>
                  <p className="text-xs text-zinc-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="p-4 flex gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors rounded-xl cursor-default opacity-60">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-transparent shrink-0" />
                <div>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100"><span className="font-medium">Platform verified</span> successfully for Facebook.</p>
                  <p className="text-xs text-zinc-500 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
            <div className="p-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <button className="w-full p-2 text-xs font-medium text-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};