"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWebhookDeliveries } from "../webhooks.hooks";
import type { WebhookDelivery } from "../webhooks.types";
import { formatDateUtc } from "@/lib/utils";

function StatusBadge({ status }: { status: WebhookDelivery["status"] }) {
  const map = {
    delivered: "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
    failed: "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
    pending: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
  } as const;

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${map[status]}`}>
      {status}
    </span>
  );
}

function DeliveryRow({ delivery }: { delivery: WebhookDelivery }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
      >
        {expanded
          ? <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
          : <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-400" />}

        <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 shrink-0">
          {delivery.event_type}
        </span>

        <StatusBadge status={delivery.status} />

        {delivery.http_status && (
          <span className="text-xs text-zinc-500 shrink-0">HTTP {delivery.http_status}</span>
        )}

        <span className="ml-auto text-xs text-zinc-400 shrink-0">
          {delivery.attempt_count > 1 && (
            <span className="mr-2 text-amber-500">{delivery.attempt_count} attempts</span>
          )}
          {formatDateUtc(delivery.created_at)}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 py-3 space-y-3 bg-zinc-50 dark:bg-zinc-900/30">
          <div>
            <p className="text-[11px] font-medium text-zinc-500 mb-1">Payload sent</p>
            <pre className="text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-3 overflow-x-auto">
              {JSON.stringify(delivery.payload, null, 2)}
            </pre>
          </div>

          {delivery.response_body && (
            <div>
              <p className="text-[11px] font-medium text-zinc-500 mb-1">Response body</p>
              <pre className="text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all">
                {delivery.response_body}
              </pre>
            </div>
          )}

          {delivery.last_attempted_at && (
            <p className="text-[11px] text-zinc-400">
              Last attempted: {formatDateUtc(delivery.last_attempted_at)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface Props {
  appId: string;
  webhookId: string;
}

export function DeliveryLog({ appId, webhookId }: Props) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useWebhookDeliveries(appId, webhookId, page);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="text-center py-8 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">No deliveries yet</p>
        <p className="text-xs text-zinc-500 mt-1">
          Deliveries appear here when your subscribed events fire, or when you send a test.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {data.data.map((d) => (
          <DeliveryRow key={d.id} delivery={d} />
        ))}
      </div>

      {data.meta.last_page > 1 && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-zinc-400">
            Page {data.meta.current_page} of {data.meta.last_page} · {data.meta.total} total
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1 || isFetching}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page === data.meta.last_page || isFetching}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
