// ── Widget record (from backend) ─────────────────────────────────────────────

export interface CoreWidget {
  id: string;
  widget_id: string;
  app_id: string;
  name: string;
  status: WidgetStatus;
  allowed_origins: string[];
  enabled_platforms: string[];
  theme: { primary?: string; radius?: string };
  created_at: string;
  updated_at: string;
  /** Only present immediately after creation or secret rotation */
  widget_secret?: string;
}

export type WidgetStatus = 'active' | 'draft' | 'suspended';

export interface WidgetListResponse {
  data: CoreWidget[];
}

export interface WidgetResponse {
  data: CoreWidget;
}

export interface RotateSecretResponse {
  data: {
    widget_id: string;
    widget_secret: string;
  };
}

export interface CreateWidgetPayload {
  name: string;
  allowed_origins?: string[];
  enabled_platforms?: string[];
  theme?: { primary?: string };
}

export interface UpdateWidgetPayload {
  allowed_origins?: string[];
  enabled_platforms?: string[];
}

// ── Static widget catalog ─────────────────────────────────────────────────────
// Add new entries here when new widget types are introduced.

export interface WidgetCatalogEntry {
  /** Must match the `name` used when creating the CoreWidget record */
  name: string;
  description: string;
  docsUrl?: string;
  icon: 'publisher';
}

export const WIDGET_CATALOG: WidgetCatalogEntry[] = [
  {
    name: 'Publisher Widget',
    description:
      'Embed a fully branded publish-to-social panel into any website or web app. Your users compose and schedule posts without leaving your product.',
    docsUrl: '/docs/publisher-widget',
    icon: 'publisher',
  },
];
