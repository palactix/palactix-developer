"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateWebhook, useUpdateWebhook } from "../webhooks.hooks";
import { WEBHOOK_EVENTS, type Webhook, type WebhookEventType } from "../webhooks.types";

interface Props {
  appId: string;
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (secret: string, webhookId: string) => void;
  editing?: Webhook | null;
}

export function AddWebhookModal({ appId, isOpen, onClose, onCreated, editing }: Props) {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<WebhookEventType[]>([]);
  const [urlError, setUrlError] = useState("");
  const [eventsError, setEventsError] = useState("");

  const { mutateAsync: create, isPending: isCreating } = useCreateWebhook(appId);
  const { mutateAsync: update, isPending: isUpdating } = useUpdateWebhook(appId);
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (isOpen) {
      setUrl(editing?.url ?? "");
      setDescription(editing?.description ?? "");
      setSelectedEvents(editing?.events ?? []);
      setUrlError("");
      setEventsError("");
    }
  }, [isOpen, editing]);

  const toggleEvent = (value: WebhookEventType) => {
    setSelectedEvents((prev) =>
      prev.includes(value) ? prev.filter((e) => e !== value) : [...prev, value],
    );
    setEventsError("");
  };

  const validate = (): boolean => {
    let valid = true;
    try {
      new URL(url.trim());
      setUrlError("");
    } catch {
      setUrlError("Enter a valid HTTPS URL.");
      valid = false;
    }
    if (selectedEvents.length === 0) {
      setEventsError("Select at least one event.");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (editing) {
      await update({
        webhookId: editing.id,
        payload: { url: url.trim(), events: selectedEvents, description: description.trim() || null },
      });
      onClose();
    } else {
      const res = await create({
        url: url.trim(),
        events: selectedEvents,
        description: description.trim() || undefined,
      });
      onCreated?.(res.data.secret, res.data.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {editing ? "Edit Webhook" : "Add Webhook Endpoint"}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* URL */}
        <div className="space-y-1.5">
          <Label className="text-xs text-zinc-500">Endpoint URL</Label>
          <Input
            value={url}
            onChange={(e) => { setUrl(e.target.value); setUrlError(""); }}
            placeholder="https://yourserver.com/webhook"
            className="text-sm"
          />
          {urlError && <p className="text-xs text-red-500">{urlError}</p>}
        </div>

        {/* Events */}
        <div className="space-y-2">
          <Label className="text-xs text-zinc-500">Events to subscribe</Label>
          <div className="space-y-2">
            {WEBHOOK_EVENTS.map((evt) => {
              const checked = selectedEvents.includes(evt.value);
              return (
                <button
                  key={evt.value}
                  type="button"
                  onClick={() => toggleEvent(evt.value)}
                  className="flex w-full items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
                >
                  <span
                    className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                      checked
                        ? "bg-indigo-600 border-indigo-600"
                        : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900"
                    }`}
                  >
                    {checked && (
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-none stroke-white">
                        <path d="M1 6l3.5 3.5L11 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="flex-1 text-left font-mono text-xs text-zinc-700 dark:text-zinc-300">
                    {evt.value}
                  </span>
                  <span className="text-xs text-zinc-500">{evt.label}</span>
                </button>
              );
            })}
          </div>
          {eventsError && <p className="text-xs text-red-500">{eventsError}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label className="text-xs text-zinc-500">Description <span className="text-zinc-400">(optional)</span></Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Production failure alerts"
            className="text-sm"
          />
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isPending}>Cancel</Button>
          <Button size="sm" onClick={handleSubmit} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
            {editing ? "Save Changes" : "Add Endpoint"}
          </Button>
        </div>
      </div>
    </div>
  );
}
