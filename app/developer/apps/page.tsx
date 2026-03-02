"use client";

import { useApps } from "@/features/developer-app/developer-app.hooks";
import { DeveloperApp } from "@/features/developer-app/developer-app.types";
import { motion } from "framer-motion";
import { Loader2, Plus, Box } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AppsPage() {
  const { data: apps, isLoading } = useApps();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white mb-2">
            Developer Apps
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Manage your apps, settings, and webhook configurations.
          </p>
        </div>
        <Link href="/developer/apps/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create App
          </Button>
        </Link>
      </motion.div>

      {(!apps || apps.length === 0) ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center py-20 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm"
        >
          <div className="mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-4">
            <Box className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">No apps built yet</h3>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
            Get started by creating your first developer application to access our APIs.
          </p>
          <Link href="/developer/apps/new">
            <Button variant="outline">Create your first app</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app: DeveloperApp, index: number) => (
            <Link key={app.id} href={`/developer/apps/${app.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                    {app.logo_url ? (
                      <img src={app.logo_url} alt={app.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-semibold uppercase">{app.name.substring(0, 2)}</span>
                    )}
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                      app.status === "active"
                        ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                        : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                  {app.name}
                </h3>
                <p className="text-sm text-zinc-500 mt-1 font-mono truncate">
                  {app.client_id ? `${app.client_id.slice(0, 4)}••••••${app.client_id.slice(-4)}` : "app_pending_..."}
                </p>
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-between items-center text-xs text-zinc-500">
                  <span>Created {new Date(app.created_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}