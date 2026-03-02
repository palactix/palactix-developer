"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

type NavigationGroupProps = {
  title: string;
  items: NavItem[];
  isCollapsed?: boolean;
};

export const NavigationGroup = ({ title, items, isCollapsed }: NavigationGroupProps) => {
  const pathname = usePathname();

  return (
    <div className="py-4">
      {!isCollapsed && (
        <h4 className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          {title}
        </h4>
      )}
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className="relative flex items-center w-full min-h-9 px-3 gap-3 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`w-4 h-4 shrink-0 transition-colors z-10 ${
                    isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                  }`}
                />
                {!isCollapsed && (
                  <span className={`truncate z-10 ${isActive ? "font-medium text-zinc-900 dark:text-zinc-100" : ""}`}>
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};