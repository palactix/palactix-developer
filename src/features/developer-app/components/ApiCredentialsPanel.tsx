"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, KeyRound, Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/shared/CopyButton";
import { useGenerateAppCredentials } from "../developer-app.hooks";
import { AppStatus, GenerateCredentialsResponse } from "../developer-app.types";

type ApiCredentialsPanelProps = {
  appId: string;
  appStatus: AppStatus;
  clientId: string | null;
};

export const ApiCredentialsPanel = ({ appId, appStatus, clientId }: ApiCredentialsPanelProps) => {
  const { mutateAsync: generateCredentials, isPending: isGenerating } = useGenerateAppCredentials();
  const [generatedCredentials, setGeneratedCredentials] = useState<GenerateCredentialsResponse | null>(null);

  const displayedClientId = useMemo(() => {
    return generatedCredentials?.client_id ?? clientId ?? "";
  }, [generatedCredentials, clientId]);

  const handleGenerateCredentials = async () => {
    const response = await generateCredentials({ appId });
    setGeneratedCredentials(response);
  };

  const handleRegenerateCredentials = async () => {
    const confirmed = window.confirm(
      "Regenerating credentials will revoke your old auth tokens automatically. Continue?",
    );

    if (!confirmed) {
      return;
    }

    await handleGenerateCredentials();
  };

  if (appStatus === AppStatus.DRAFT) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">Activate your app to view API credentials.</p>
      </div>
    );
  }

  if (appStatus === AppStatus.SUSPENDED) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-700 dark:text-red-300">
            Your app is suspended. Existing credentials are disabled and cannot be used until the app is active again.
          </p>
        </div>
      </div>
    );
  }

  const hasClientId = Boolean(displayedClientId);
  const hasFreshSecret = Boolean(generatedCredentials?.client_secret);

  return (
    <div className="space-y-4">
      {!hasClientId && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-linear-to-br from-zinc-50 via-white to-zinc-100 p-5 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
          <div className="flex items-start gap-3">
            <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-zinc-700 dark:text-zinc-300" />
            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Generate API credentials to start making requests.</p>
              <Button type="button" onClick={handleGenerateCredentials} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate Credentials
              </Button>
            </div>
          </div>
        </div>
      )}

      {hasClientId && (
        <>
          {hasFreshSecret && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  This is the last time your client secret will be visible. Copy it now and store it in a secure place.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-500 font-medium">Client ID</Label>
            <div className="flex bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800 items-center justify-between font-mono text-sm gap-2">
              <span className="text-zinc-900 dark:text-zinc-100 truncate">{displayedClientId}</span>
              <CopyButton
                text={displayedClientId}
                ariaLabel="Copy client ID"
                successMessage="Client ID copied"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              />
            </div>
          </div>

          {hasFreshSecret && (
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-500 font-medium">Client Secret</Label>
              <div className="flex bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800 items-center justify-between font-mono text-sm gap-2">
                <span className="text-zinc-900 dark:text-zinc-100 truncate">{generatedCredentials?.client_secret}</span>
                <CopyButton
                  text={generatedCredentials?.client_secret ?? ""}
                  ariaLabel="Copy client secret"
                  successMessage="Client secret copied"
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="destructive" size="sm" onClick={handleRegenerateCredentials} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
              Regenerate Credentials
            </Button>
          </div>
        </>
      )}
    </div>
  );
};