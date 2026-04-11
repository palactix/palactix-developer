"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2,
  PenLine,
  Plus,
  RefreshCcw,
  Rss,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/shared/CopyButton";
import {
  useEnableWidget,
  useRotateWidgetSecret,
  useUpdateWidgetOrigins,
  useUpdateWidgetPlatforms,
  useWidgets,
} from "../widget.hooks";
import { useApp } from "../developer-app.hooks";
import { AppCredStatus, type PlatformIntegration } from "../developer-app.types";
import { usePlatformLogo } from "@/features/platform/usePlatformLogo";
import type { Platform } from "@/features/platform/platform.types";
import { WIDGET_CATALOG, type CoreWidget } from "../widget.types";

// ── Credential row ─────────────────────────────────────────────────────────

function CredentialRow({
  label,
  value,
  masked,
}: {
  label: string;
  value: string;
  masked?: boolean;
}) {
  const [visible, setVisible] = useState(!masked);
  const display = masked && !visible ? "•".repeat(Math.min(value.length, 40)) : value;

  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-zinc-500">{label}</Label>
      <div className="flex items-center gap-2">
        <code className="flex-1 truncate rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-800 dark:text-zinc-200">
          {display}
        </code>
        {masked && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide" : "Reveal"}
          >
            {visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </Button>
        )}
        <CopyButton text={value} ariaLabel={`Copy ${label}`} />
      </div>
    </div>
  );
}

// ── One-time secret banner (shown right after enable or rotate) ────────────

function SecretBanner({ secret, onDismiss }: { secret: string; onDismiss: () => void }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10 p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Copy your widget secret now — it won&apos;t be shown again.
          </p>
        </div>
        <button onClick={onDismiss} className="text-amber-500 hover:text-amber-700" aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      </div>
      <CredentialRow label="Widget Secret" value={secret} masked />
    </div>
  );
}

// ── Allowed Origins manager ────────────────────────────────────────────────

function AllowedOriginsManager({
  appId,
  widget,
}: {
  appId: string;
  widget: CoreWidget;
}) {
  const [origins, setOrigins] = useState<string[]>(widget.allowed_origins ?? []);
  const [newOrigin, setNewOrigin] = useState("");
  const [error, setError] = useState("");
  const { mutate: saveOrigins, isPending } = useUpdateWidgetOrigins(appId);

  const isDirty =
    JSON.stringify(origins) !== JSON.stringify(widget.allowed_origins ?? []);

  const add = () => {
    const trimmed = newOrigin.trim().replace(/\/$/, "");
    if (!trimmed) return;
    try {
      new URL(trimmed);
    } catch {
      setError("Enter a valid URL (e.g. https://yoursite.com)");
      return;
    }
    if (origins.includes(trimmed)) {
      setError("Already added");
      return;
    }
    setOrigins((prev) => [...prev, trimmed]);
    setNewOrigin("");
    setError("");
  };

  const remove = (origin: string) => setOrigins((prev) => prev.filter((o) => o !== origin));

  const save = () => saveOrigins({ widgetId: widget.widget_id, payload: { allowed_origins: origins } });

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={newOrigin}
          onChange={(e) => {
            setNewOrigin(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="https://yoursite.com"
          className="text-sm h-9"
        />
        <Button type="button" variant="outline" size="sm" onClick={add}>
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Add
        </Button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}

      {origins.length > 0 ? (
        <ul className="space-y-1.5">
          {origins.map((origin) => (
            <li
              key={origin}
              className="flex items-center justify-between rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-700 dark:text-zinc-300"
            >
              {origin}
              <button
                onClick={() => remove(origin)}
                className="ml-2 text-zinc-400 hover:text-red-500"
                aria-label="Remove origin"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-zinc-400">No origins added. The widget will be blocked by CORS.</p>
      )}

      {isDirty && (
        <Button size="sm" onClick={save} disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
          Save origins
        </Button>
      )}
    </div>
  );
}

// ── Platform badge (logo + name) ───────────────────────────────────────────

function PlatformBadge({ platform }: { platform: Platform }) {
  const logoUrl = usePlatformLogo(platform);
  if (!logoUrl) {
    return <div className="h-5 w-5 rounded bg-zinc-200 dark:bg-zinc-700 shrink-0" />;
  }
  return (
    <img
      src={logoUrl}
      alt={platform.name}
      className="h-5 w-5 object-contain shrink-0"
    />
  );
}

// ── Enabled platforms selector ─────────────────────────────────────────────

function PlatformSelector({
  appId,
  widget,
  verifiedIntegrations,
}: {
  appId: string;
  widget: CoreWidget;
  verifiedIntegrations: PlatformIntegration[];
}) {
  const [selected, setSelected] = useState<string[]>(widget.enabled_platforms ?? []);
  const { mutate: savePlatforms, isPending } = useUpdateWidgetPlatforms(appId);

  const isDirty =
    JSON.stringify([...selected].sort()) !==
    JSON.stringify([...(widget.enabled_platforms ?? [])].sort());

  const toggle = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const save = () => {
    savePlatforms({ widgetId: widget.widget_id, payload: { enabled_platforms: selected } });
  };

  if (verifiedIntegrations.length === 0) {
    return (
      <p className="text-xs text-zinc-400">
        No verified platforms. Add and verify platforms on the Dashboard tab first.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {verifiedIntegrations.map((integration) => {
        const slug = integration.platform.slug;
        const isChecked = selected.includes(slug);
        return (
          <button
            key={integration.id}
            type="button"
            onClick={() => toggle(slug)}
            className="flex w-full items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
          >
            <PlatformBadge platform={integration.platform} />
            <span className="flex-1 text-left text-zinc-800 dark:text-zinc-200">
              {integration.platform.name}
            </span>
            <span
              className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                isChecked
                  ? "bg-indigo-600 border-indigo-600"
                  : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900"
              }`}
            >
              {isChecked && (
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-none stroke-white">
                  <path
                    d="M1 6l3.5 3.5L11 2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </button>
        );
      })}
      {isDirty && (
        <Button size="sm" onClick={save} disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
          Save platforms
        </Button>
      )}
    </div>
  );
}

// ── Enabled widget settings panel ──────────────────────────────────────────

function WidgetSettingsPanel({
  appId,
  widget,
  revealSecret,
  onClearReveal,
  verifiedIntegrations,
}: {
  appId: string;
  widget: CoreWidget;
  revealSecret: string | null;
  onClearReveal: () => void;
  verifiedIntegrations: PlatformIntegration[];
}) {
  const { mutateAsync: rotate, isPending: isRotating, data: rotated } = useRotateWidgetSecret(appId);

  const currentSecret = rotated?.data.widget_secret ?? revealSecret;

  const handleRotate = async () => {
    const confirmed = window.confirm(
      "Rotating the secret will invalidate the existing one. Any running widgets using the old secret will stop working until you update your server. Continue?",
    );
    if (!confirmed) return;
    await rotate(widget.widget_id);
    onClearReveal();
  };

  return (
    <div className="space-y-6">
      {currentSecret && (
        <SecretBanner secret={currentSecret} onDismiss={onClearReveal} />
      )}

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Credentials</h4>
        <CredentialRow label="Widget ID" value={widget.widget_id} />

        <div className="space-y-1.5">
          <Label className="text-xs text-zinc-500">Widget Secret</Label>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-400 dark:text-zinc-600">
              {currentSecret ? "Shown above ↑" : "••••••••••••••••••••••••"}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRotate}
              disabled={isRotating}
              className="shrink-0"
            >
              {isRotating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCcw className="h-3.5 w-3.5 mr-1.5" />
              )}
              Rotate
            </Button>
          </div>
          <p className="text-[11px] text-zinc-400">
            Use this secret server-side to generate init tokens.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Allowed Origins
        </h4>
        <p className="text-xs text-zinc-500">
          Only these origins can embed the widget. Add every domain where you
          plan to use it.
        </p>
        <AllowedOriginsManager appId={appId} widget={widget} />
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Enabled Platforms
        </h4>
        <p className="text-xs text-zinc-500">
          Select which of your app&apos;s verified platforms this widget can post to.
          Only platforms you have verified on the Dashboard tab are shown.
        </p>
        <PlatformSelector
          appId={appId}
          widget={widget}
          verifiedIntegrations={verifiedIntegrations}
        />
      </div>
    </div>
  );
}

// ── Widget catalog card ────────────────────────────────────────────────────

function CatalogCard({
  appId,
  name,
  description,
  docsUrl,
  widget,
  verifiedIntegrations,
}: {
  appId: string;
  name: string;
  description: string;
  docsUrl?: string;
  widget: CoreWidget | undefined;
  verifiedIntegrations: PlatformIntegration[];
}) {
  const [expanded, setExpanded] = useState(!!widget);
  const [revealSecret, setRevealSecret] = useState<string | null>(null);
  const { mutateAsync: enableWidget, isPending: isEnabling } = useEnableWidget(appId);

  const handleEnable = async () => {
    const res = await enableWidget({ name });
    if (res.data.widget_secret) {
      setRevealSecret(res.data.widget_secret);
    }
    setExpanded(true);
  };

  const isEnabled = !!widget;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-500">
          <Rss className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{name}</h3>
            {isEnabled && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20">
                Enabled
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{description}</p>
          {docsUrl && (
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View docs <ChevronRight className="h-3 w-3" />
            </a>
          )}
        </div>

        <div className="shrink-0 flex items-center gap-2">
          {isEnabled ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded((v) => !v)}
            >
              <PenLine className="h-3.5 w-3.5 mr-1.5" />
              {expanded ? "Hide" : "Settings"}
            </Button>
          ) : (
            <Button size="sm" onClick={handleEnable} disabled={isEnabling}>
              {isEnabling ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />
              ) : null}
              Enable
            </Button>
          )}
        </div>
      </div>

      {/* Settings panel */}
      {isEnabled && expanded && widget && (
        <div className="border-t border-zinc-100 dark:border-zinc-800 px-6 pb-6 pt-5">
          <WidgetSettingsPanel
            appId={appId}
            widget={widget}
            revealSecret={revealSecret}
            onClearReveal={() => setRevealSecret(null)}
            verifiedIntegrations={verifiedIntegrations}
          />
        </div>
      )}
    </motion.div>
  );
}

// ── Page component ─────────────────────────────────────────────────────────

export function WidgetsPage({ appId }: { appId: string }) {
  const { data: widgets, isLoading } = useWidgets(appId);
  const { data: app } = useApp(appId);

  const verifiedIntegrations = (app?.integrations ?? []).filter(
    (i) => i.status === AppCredStatus.VERIFIED,
  );

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
      >
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Widgets
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Embeddable UI components powered by your app&apos;s credentials.
        </p>
      </motion.div>

      <div className="space-y-4">
        {WIDGET_CATALOG.map((entry) => {
          const record = widgets?.find((w) => w.name === entry.name);
          return (
            <CatalogCard
              key={entry.name}
              appId={appId}
              name={entry.name}
              description={entry.description}
              docsUrl={entry.docsUrl}
              widget={record}
              verifiedIntegrations={verifiedIntegrations}
            />
          );
        })}
      </div>
    </div>
  );
}
