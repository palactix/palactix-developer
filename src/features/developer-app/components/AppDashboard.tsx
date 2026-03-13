"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "../developer-app.hooks";
import { AppCredStatus, AppStatus, PlatformIntegration } from "../developer-app.types";
import { ActivationChecklist } from "./ActivationChecklist";
import { AddPlatformModal } from "./AddPlatformModal";
import { ApiCredentialsPanel } from "./ApiCredentialsPanel";
import { IntegrationCard } from "./IntegrationCard";

import { formatDateUtc } from "@/lib/utils";
import Image from "next/image";


const getInitials = (value?: string | null) => {
  if (!value || !value.trim()) return "AP";
  return value.trim().slice(0, 2).toUpperCase();
};

export const AppDashboard = ({ appId }: { appId: string }) => {
  const { data: app, isLoading } = useApp(appId);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<PlatformIntegration | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!app) {
    return <div className="text-center py-20 text-zinc-500">App not found.</div>;
  }

  const integratedPlatformIds = (app.integrations ?? []).map((integration: PlatformIntegration) => integration.platform_id);
  const checklistStep = (() => {
    if (app.status === AppStatus.ACTIVE) return 4;
    if ((app.integrations ?? []).some((i) => i.status === AppCredStatus.VERIFIED)) return 3;
    if ((app.integrations ?? []).length > 0) return 2;
    return 1;
  })();

  return (
    <div className="space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
            {app.logo_url ? (
              <Image src={app.logo_url} alt={app.name ?? "App logo"} className="w-full h-full object-cover" width={48} height={48} />
            ) : (
              <span className="text-sm font-semibold uppercase text-zinc-500">{getInitials(app.name)}</span>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white truncate">{app.name || "Unnamed App"}</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Created {formatDateUtc(app.created_at)}</p>
          </div>
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
            app.status === AppStatus.ACTIVE
              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
              : app.status === AppStatus.SUSPENDED
                ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
          }`}
        >
          {app.status}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Platform Integrations</h3>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingIntegration(null);
                  setIsAddModalOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Credentials
              </Button>
            </div>

            <div className="p-6 space-y-5">
              {(app.integrations?.length ?? 0) === 0 ? (
                <div className="text-center py-8 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">No platform integrations yet</p>
                  <p className="text-sm text-zinc-500 mt-1">Add credentials to connect your first platform.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {app.integrations.map((integration: PlatformIntegration) => (
                    <IntegrationCard
                      key={integration.id}
                      integration={integration}
                      onEdit={(item) => {
                        setEditingIntegration(item);
                        setIsAddModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/50">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">API Credentials</h3>
            </div>

            <div className="p-6">
              <ApiCredentialsPanel
                appId={app.id}
                appStatus={app.status}
                clientId={app.client_id}
              />
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }}>
            <ActivationChecklist currentStepIndex={checklistStep} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm opacity-60"
          >
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center justify-between">
              <span>API Usage</span>
              <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">Coming Soon</span>
            </h3>
            <div className="space-y-3">
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full" />
              <div className="h-2 w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      <AddPlatformModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingIntegration(null);
        }}
        appId={app.id}
        integratedPlatformIds={integratedPlatformIds}
        editingIntegration={editingIntegration}
      />
    </div>
  );
};
