"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/features/developer-app/developer-app.hooks";
import { AddPlatformModal } from "@/features/developer-app/components/AddPlatformModal";
import { IntegrationCard } from "@/features/developer-app/components/IntegrationCard";
import { AppCredStatus, PlatformIntegration } from "@/features/developer-app/developer-app.types";

interface Props {
  appId: string;
  onContinue: () => void;
  onBack: () => void;
}

export const AgencyStep2Platforms = ({ appId, onContinue, onBack }: Props) => {
  const { data: app, isLoading } = useApp(appId);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<PlatformIntegration | null>(null);

  const integrations = app?.integrations ?? [];
  const connectedPlatformIds = integrations.map((i) => i.platform_id);
  const hasIntegrations = integrations.length > 0;
  const hasVerifiedIntegration = integrations.some((i) => i.status === AppCredStatus.VERIFIED);

  const handleAdd = () => {
    setEditingIntegration(null);
    setModalOpen(true);
  };

  const handleEdit = (integration: PlatformIntegration) => {
    setEditingIntegration(integration);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingIntegration(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <Globe className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Step 2 of 4
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Connect a social platform
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Add your OAuth credentials so your clients can connect their accounts. At least one platform is required to continue.
        </p>
      </div>

      {/* Platform list / empty state */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {!hasIntegrations ? (
            /* ── Empty state ── */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col items-center justify-center gap-4 py-10 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/40"
            >
              <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Globe className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">No platforms connected yet</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                  Add your first platform to continue setup
                </p>
              </div>
              <Button
                type="button"
                onClick={handleAdd}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Platform
              </Button>
            </motion.div>
          ) : (
            /* ── Integration cards ── */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {integrations.map((integration, i) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <IntegrationCard
                    appId={appId}
                    integration={integration}
                    onEdit={handleEdit}
                  />
                </motion.div>
              ))}

              {/* Add another */}
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 h-10 border-dashed"
                onClick={handleAdd}
              >
                <Plus className="h-4 w-4" />
                Add Another Platform
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Actions */}
      {hasIntegrations && !hasVerifiedIntegration && (
        <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
          Verify at least one platform to continue
        </p>
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-3">
        <Button type="button" variant="ghost" className="sm:w-auto gap-1" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          type="button"
          className="flex-1 h-11 gap-1"
          disabled={!hasVerifiedIntegration}
          onClick={onContinue}
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* AddPlatformModal */}
      <AddPlatformModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        appId={appId}
        integratedPlatformIds={connectedPlatformIds}
        editingIntegration={editingIntegration}
      />
    </div>
  );
};

