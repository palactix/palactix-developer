"use client";

import { motion } from "framer-motion";
import { Search, Menu } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import { ThemeToggle } from "./ThemeToggle";

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex-1 min-w-0 flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 outline-none"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:block text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Developer Portal
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-lg w-full px-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search logs, users, apps..."
              className="block w-full py-1.5 pl-10 pr-4 text-sm bg-zinc-100 dark:bg-zinc-900 border border-transparent rounded-full text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-white dark:focus:bg-zinc-950 focus:border-zinc-300 dark:focus:border-zinc-700 focus:ring-4 focus:ring-zinc-100 dark:focus:ring-zinc-800/50 transition-all"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none hidden sm:flex">
              <span className="text-[10px] font-medium text-zinc-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded shadow-sm">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3">
          <ThemeToggle />
          <NotificationDropdown />
          {/* Simple User Avatar */}
          <button className="flex items-center outline-none">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-zinc-200 dark:border-zinc-800 shadow-sm" />
          </button>
        </div>
      </div>
    </header>
  );
};