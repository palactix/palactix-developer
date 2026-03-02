"use client";

import { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Activity,
  ShieldAlert,
  Users,
  Settings,
  Grid,
  BookOpen,
  LifeBuoy,
  CreditCard,
  LogOut,
  ChevronLeft
} from "lucide-react";
import { AppSwitcher } from "./AppSwitcher";
import { NavigationGroup } from "./NavigationGroup";
import Link from "next/link";

const GLOBAL_NAV = [
  { name: "All Apps", href: "/developer/apps", icon: Grid },
  { name: "Documentation", href: "/docs", icon: BookOpen },
  { name: "Support", href: "/developer/support", icon: LifeBuoy },
];

export const Sidebar = ({
  isMobileOpen,
  setMobileOpen,
}: {
  isMobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) => {
  const params = useParams<{ appId?: string }>();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const appId = params?.appId;

  const appNav = [
    { name: "Dashboard", href: appId ? `/developer/apps/${appId}` : "/developer/apps", icon: LayoutDashboard },
    { name: "Logs", href: appId ? `/developer/apps/${appId}/logs` : "/developer/apps", icon: Activity },
    { name: "Rate Limits", href: appId ? `/developer/apps/${appId}/rate-limits` : "/developer/apps", icon: ShieldAlert },
    { name: "Users", href: appId ? `/developer/apps/${appId}/users` : "/developer/apps", icon: Users },
    { name: "Settings", href: appId ? `/developer/apps/${appId}/settings` : "/developer/apps", icon: Settings },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("sidebar_collapsed");
    let state = false;
    if (saved) {
      state = JSON.parse(saved);
    }
    const timer = setTimeout(() => {
      setIsCollapsed(state);
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Wait until hydration
    setTimeout(() => {
      setMobileOpen(false);
    }, 0);
  }, [pathname, setMobileOpen]);

  const toggleCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    localStorage.setItem("sidebar_collapsed", JSON.stringify(nextState));
  };

  if (!isMounted) return <div className="hidden md:flex w-64 h-screen border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50" />;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-950/30 text-zinc-900 dark:text-zinc-100 border-r border-zinc-200 dark:border-zinc-800 backdrop-blur-xl">
      {/* Top */}
      <div className="p-4 space-y-4">
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <Link href="/developer/apps" className="flex items-center gap-2 outline-none rounded-md focus-visible:ring-2 focus-visible:ring-zinc-500">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white dark:text-zinc-900 font-bold text-lg leading-none">P</span>
            </div>
            {!isCollapsed && <span className="font-bold text-lg tracking-tight">Palactix</span>}
          </Link>
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
          >
            <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronLeft className="w-4 h-4" />
            </motion.div>
          </button>
        </div>

        <AppSwitcher isCollapsed={isCollapsed} />
      </div>

      {/* Middle */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        <NavigationGroup title="App" items={appNav} isCollapsed={isCollapsed} />
        <div className="my-2 border-t border-zinc-200/50 dark:border-zinc-800/50 mx-3" />
        <NavigationGroup title="Global" items={GLOBAL_NAV} isCollapsed={isCollapsed} />
      </div>

      {/* Bottom */}
      <div className="p-3 border-t border-zinc-200/50 dark:border-zinc-800/50 space-y-1">
        <div className="px-1 py-2">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shrink-0" />
               <div className="flex-1 overflow-hidden">
                 <p className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">Jitendra</p>
                 <p className="text-xs text-zinc-500 truncate">jitu@example.com</p>
               </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mx-auto" />
          )}
        </div>
        
        <button
          disabled
          className="flex items-center w-full px-2 py-2 gap-3 text-sm text-zinc-400 rounded-lg group cursor-not-allowed"
          title="Billing (Coming soon)"
        >
          <CreditCard className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="truncate">Billing</span>}
        </button>

        <button
          className="flex items-center w-full px-2 py-2 gap-3 text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
        >
          <LogOut className="w-4 h-4 shrink-0 transition-colors" />
          {!isCollapsed && <span className="truncate font-medium">Log out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block h-screen sticky top-0 z-50 shrink-0 overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 w-72 z-50 md:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};