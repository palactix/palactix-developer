"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Copy, Plus, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ActivationChecklist } from "./ActivationChecklist";
import { AddPlatformModal } from "./AddPlatformModal";
import { useApp } from "../developer-app.hooks";
import { toast } from "sonner";

export const AppDashboard = ({ appId }: { appId: string }) => {
  const { data: app, isLoading } = useApp(appId);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Mock data for demo until integration APIs are built
  const integrations: { status: string }[] = [];

  const getChecklistStep = () => {
    if (!app) return 1;
    if (app.status === 'active') return 4;
    if (integrations.some(i => i.status === 'verified')) return 3;
    if (integrations.length > 0) return 2;
    return 1;
  };

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskedClientId = app?.client_id
    ? `${app.client_id.slice(0, 4)}••••••${app.client_id.slice(-4)}`
    : "app_xxxxxxxxxxxxxxxx";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="text-center py-20 text-zinc-500">
        App not found.
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {app.name}
            </h1>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                app.status === "active"
                  ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                  : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
              }`}
            >
              {app.status === "active" ? "Active" : "Draft"}
            </span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400">
            Manage your app integration settings and credentials.
          </p>
          <p className="text-xs text-zinc-400 mt-2">
            Created {new Date(app.created_at).toLocaleDateString()}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Platform Integrations Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Platform Integrations
              </h3>
              <Button onClick={() => setIsModalOpen(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Platform
              </Button>
            </div>
            
            <div className="p-6">
              {integrations.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-6 h-6 text-zinc-400" />
                  </div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">No platforms added</p>
                  <p className="text-sm text-zinc-500 mt-1">Connect your first platform to start using the API.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Map integrations here later */}
                </div>
              )}
            </div>
          </motion.div>

          {/* API Credentials Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/50">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                API Credentials
              </h3>
            </div>
            
            <div className="p-6">
              {app.status === 'draft' ? (
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                    Activate your app to view API credentials.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                   <div className="space-y-1.5">
                    <Label className="text-xs text-zinc-500 font-medium">Client ID</Label>
                    <div className="flex bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800 items-center justify-between font-mono text-sm group">
                      <span className="text-zinc-900 dark:text-zinc-100 truncate">
                        {maskedClientId}
                      </span>
                      <button 
                        onClick={() => copyToClipboard(app.client_id || '', 'clientId')}
                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                      >
                         {copiedKey === 'clientId' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-zinc-500 font-medium">Client Secret</Label>
                    <div className="flex bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800 items-center justify-between font-mono text-sm">
                      <span className="text-zinc-900 dark:text-zinc-100 truncate flex-1">
                        {showSecret ? ('sk_live_xxxxxxxxxxxxxxxxxxxxxxxx') : '••••••••••••••••••••••••••••••••'}
                      </span>
                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        <button 
                          onClick={() => setShowSecret(!showSecret)}
                          className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                          {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => copyToClipboard('sk_live_dummy', 'clientSecret')}
                          className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                          {copiedKey === 'clientSecret' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ActivationChecklist currentStepIndex={getChecklistStep()} />
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm opacity-60"
          >
             <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center justify-between">
                <span>API Usage</span>
                <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">Coming Soon</span>
             </h3>
             <div className="space-y-3">
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden"></div>
                <div className="h-2 w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden"></div>
             </div>
          </motion.div>
        </div>
      </div>

      <AddPlatformModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};