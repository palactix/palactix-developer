"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Loader2,
  PenLine,
  Plus,
  RefreshCcw,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import {
  useDeleteWebhook,
  useRotateWebhookSecret,
  useSendTestDelivery,
  useUpdateWebhook,
  useWebhooks,
} from "../webhooks.hooks";
import type { Webhook } from "../webhooks.types";
import { AddWebhookModal } from "./AddWebhookModal";
import { DeliveryLog } from "./DeliveryLog";

// ── Secret banner shown once after create / rotate ─────────────────────────

function SecretBanner({ secret, onDismiss }: { secret: string; onDismiss: () => void }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10 p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Copy your webhook secret now — it won&apos;t be shown again.
          </p>
        </div>
        <button onClick={onDismiss} className="text-amber-500 hover:text-amber-700" aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <code className="flex-1 truncate rounded-lg border border-amber-200 dark:border-amber-500/20 bg-white dark:bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-800 dark:text-zinc-200">
          {secret}
        </code>
        <CopyButton text={secret} ariaLabel="Copy secret" />
      </div>
      <p className="text-xs text-amber-700 dark:text-amber-400">
        Use this secret to verify incoming webhook signatures via{" "}
        <code className="font-mono">X-Palactix-Signature</code>.
      </p>
    </div>
  );
}

// ── Status toggle ───────────────────────────────────────────────────────────

function StatusToggle({ appId, webhook }: { appId: string; webhook: Webhook }) {
  const { mutate: update, isPending } = useUpdateWebhook(appId);
  const isActive = webhook.status === "active";

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => update({ webhookId: webhook.id, payload: { status: isActive ? "inactive" : "active" } })}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        isActive ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-700"
      }`}
      aria-label={isActive ? "Deactivate webhook" : "Activate webhook"}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
          isActive ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ── Single webhook card ─────────────────────────────────────────────────────

function WebhookCard({
  appId,
  webhook,
  revealSecret,
  onClearReveal,
}: {
  appId: string;
  webhook: Webhook;
  revealSecret: string | null;
  onClearReveal: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [rotatedSecret, setRotatedSecret] = useState<string | null>(null);

  const { mutate: remove, isPending: isDeleting } = useDeleteWebhook(appId);
  const { mutateAsync: rotate, isPending: isRotating } = useRotateWebhookSecret(appId);
  const { mutate: sendTest, isPending: isTesting } = useSendTestDelivery(appId);

  const visibleSecret = rotatedSecret ?? revealSecret;

  const handleRotate = async () => {
    if (!confirm("Rotating the secret invalidates the current one. Any server using the old secret will fail signature verification. Continue?")) return;
    const res = await rotate(webhook.id);
    setRotatedSecret(res.data.secret);
    onClearReveal();
  };

  const handleDelete = () => {
    if (!confirm("Delete this webhook endpoint? This cannot be undone.")) return;
    remove(webhook.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Header row */}
      <div className="p-5 flex items-center gap-4">
        <StatusToggle appId={appId} webhook={webhook} />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {webhook.url}
          </p>
          {webhook.description && (
            <p className="text-xs text-zinc-500 mt-0.5 truncate">{webhook.description}</p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {webhook.events.map((e) => (
              <span key={e} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                {e}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => sendTest(webhook.id)}
            disabled={isTesting}
            title="Send test delivery"
          >
            {isTesting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          </Button>
          <Button size="icon-sm" variant="ghost" onClick={() => setEditOpen(true)} title="Edit">
            <PenLine className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete"
            className="text-red-500 hover:text-red-600"
          >
            {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
          </Button>
          <Button size="icon-sm" variant="ghost" onClick={() => setExpanded((v) => !v)} title="Expand">
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="border-t border-zinc-100 dark:border-zinc-800 px-5 pb-5 pt-4 space-y-5">
          {visibleSecret && (
            <SecretBanner
              secret={visibleSecret}
              onDismiss={() => { setRotatedSecret(null); onClearReveal(); }}
            />
          )}

          {/* Rotate secret */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Signing Secret</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-400">
                {visibleSecret ? "Shown above ↑" : "whsec_••••••••••••••••••••••••••••••••••••••••"}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRotate}
                disabled={isRotating}
                className="shrink-0"
              >
                {isRotating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCcw className="h-3.5 w-3.5 mr-1.5" />}
                Rotate
              </Button>
            </div>
            <p className="text-[11px] text-zinc-400">
              Verify incoming requests by checking <code className="font-mono">X-Palactix-Signature</code> against this secret.
            </p>
          </div>

          {/* Delivery log */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Recent Deliveries</p>
            <DeliveryLog appId={appId} webhookId={webhook.id} />
          </div>
        </div>
      )}

      <AddWebhookModal
        appId={appId}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        editing={webhook}
      />
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export function WebhooksPage({ appId }: { appId: string }) {
  const { data: webhooks, isLoading } = useWebhooks(appId);
  const [addOpen, setAddOpen] = useState(false);
  const [pendingSecret, setPendingSecret] = useState<string | null>(null);
  const [secretForId, setSecretForId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Webhooks</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Receive real-time HTTP notifications when events happen in your app.
          </p>
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4 mr-1.5" />
          Add Endpoint
        </Button>
      </motion.div>

      {(!webhooks || webhooks.length === 0) ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800"
        >
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">No webhook endpoints</p>
          <p className="text-sm text-zinc-500 mt-1 mb-4">
            Add an endpoint to start receiving publish events.
          </p>
          <Button size="sm" variant="outline" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4 mr-1.5" />
            Add Endpoint
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <WebhookCard
              key={webhook.id}
              appId={appId}
              webhook={webhook}
              revealSecret={secretForId === webhook.id ? pendingSecret : null}
              onClearReveal={() => { setPendingSecret(null); setSecretForId(null); }}
            />
          ))}
        </div>
      )}

      <AddWebhookModal
        appId={appId}
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={(secret, webhookId) => {
          setPendingSecret(secret);
          setSecretForId(webhookId);
        }}
      />
    </div>
  );
}
