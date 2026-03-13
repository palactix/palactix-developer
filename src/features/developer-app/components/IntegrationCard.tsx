"use client";

import { Button } from "@/components/ui/button";
import { PlatformLogo } from "@/features/platform/platform.logo";
import { formatDateUtc } from "@/lib/utils";
import { AppCredStatus, PlatformIntegration } from "../developer-app.types";

const statusBadgeStyles: Record<AppCredStatus, string> = {
  [AppCredStatus.PENDING]: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  [AppCredStatus.VERIFIED]: "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
  [AppCredStatus.FAILED]: "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
};

type IntegrationCardProps = {
  integration: PlatformIntegration;
  onEdit: (integration: PlatformIntegration) => void;
};

export const IntegrationCard = ({ integration, onEdit }: IntegrationCardProps) => {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 p-4 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
            <PlatformLogo platform={integration.platform} />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{integration.platform?.name || "Unknown Platform"}</p>
            <p className="text-xs text-zinc-500">Created {formatDateUtc(integration.created_at)}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${statusBadgeStyles[integration.status]}`}>
          {integration.status}
        </span>
      </div>

      <div className="pt-3">
        <div className="flex items-center gap-2">
          {integration.status !== AppCredStatus.VERIFIED && (
            <Button type="button" variant="outline" size="sm">
              Verify
            </Button>
          )}
          <Button type="button" variant="outline" size="sm" onClick={() => onEdit(integration)}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};