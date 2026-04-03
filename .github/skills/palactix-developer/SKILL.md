---
name: palactix-developer
description: 'Domain knowledge for the Palactix Developer Portal. Use when working on any feature, API, or UI in this codebase — auth flows, developer apps, agency onboarding, API docs, or the BFF proxy layer.'
argument-hint: 'What are you building or investigating in this portal?'
---

# Palactix Developer Portal — Codebase Knowledge

## What This Product Is

The Palactix Developer Portal is a **Next.js 14+ App Router** application. It is the **developer-facing front end** of the Palactix platform — a unified social media publishing API. Developers register here, create apps, and configure their own OAuth credentials for each social platform they want to publish to.

This portal is **not** the end-user social scheduling product. It is the API infrastructure layer used by agencies, automation platforms, and developer tools.

---

## Current Modules

### 1. Auth (signup / login)
- Routes: `app/auth/`, `app/developer/(onboarding)/signup`, `app/developer/(onboarding)/login`
- Server-side API routes: `app/api/auth/` (signup, login, logout, verify-email, exchange-token-redirect)
- Feature slice: `src/features/auth/`
- Two signup types: `"developer"` and `"agency"` (controlled by `SignupType` in `src/features/auth/signup/types.ts`)
- Tokens are JWT, stored in HttpOnly cookies, read by `src/lib/auth-session.ts`
- After signup, developer users with no apps are redirected to `/developer/onboarding`

### 2. Developer Apps
- Routes: `app/developer/(portal)/apps/`, `app/developer/(portal)/apps/[appId]/`, `app/developer/(portal)/apps/new/`
- Feature slice: `src/features/developer-app/`
- An app has: name, logo, status (`draft | active | suspended`), `client_id`, and `integrations[]`
- Each integration (`PlatformIntegration`) stores the developer's own OAuth credentials for a social platform (client_id, client_secret, redirect_url)
- Platforms: Facebook, Twitter/X, LinkedIn, Instagram (via `src/features/platform/`)
- App credential status per integration: `pending | verified | failed`
- Key API calls proxied through BFF:
  - `POST /developer/apps` — create app
  - `GET /developer/apps` — list apps
  - `GET /developer/apps/:id` — show app
  - `POST /developer/apps/:id` — update app (multipart, supports logo upload)
  - `POST /developer/apps/:id/integrations` — add platform credentials
  - `POST /developer/apps/:id/integrations/:integrationId` — update platform credentials
  - `POST /developer/apps/:id/generate-credentials` — generate API client credentials
  - `GET /developer/apps/:id/integrations/:integrationId/verify` — get OAuth verification URL

### 3. Agency Onboarding (onboarding only; full agency product is a separate application)
- Routes: `app/agency/(onboarding)/onboarding/[appId]/`
- Feature slice: `src/features/agency-onboarding/`
- State: Zustand store at `src/stores/agency-onboarding.ts`
- 4-step onboarding flow:
  1. Create/name the app (`AgencyStep1CreateApp`)
  2. Add platform credentials / integrations (`AgencyStep2Platforms`) — reuses developer-app components
  3. Set workspace username (`AgencyStep3Username`)
  4. Provisioning completion (`AgencyStep4Provisioning`)
- Agency BFF API calls:
  - `POST /agency/workspace/check-username` — check username availability
  - `POST /agency/workspace/username` — store workspace username
- All further agency features (scheduling, white-label, client management) will be built in a **separate product**, not this portal.

### 4. API Documentation
- Powered by **Nextra** (MDX-based docs)
- Routes: `app/docs/`
- Content: `content/` folder (MDX files + `_meta.ts` files for nav)
- Sections: getting-started, authentication, connections, api-reference, core-concepts, coming-soon
- `coming-soon/` contains planned features: scheduling-api, webhooks, bulk-operations, SDKs, AI publishing hooks, analytics, etc.

---

## Planned (Not Yet Built)

These will be surfaced in the Developer Portal dashboard once the back end supports them:

- **API usage metrics** — call counts, quota consumed
- **Error logs / request logs**
- **Rate limit status**
- **Pricing / billing dashboard**
- **App status indicators** (live / suspended / rate-limited)

When building any of these, they belong in the developer portal dashboard area (`app/dashboard/` or `app/developer/(portal)/`).

---

## Architecture & Patterns

### BFF Proxy Pattern
The Next.js app is a **Backend for Frontend**. Client-side code never calls the Laravel API directly. All requests go through Next.js API routes.

- `src/lib/api-client.ts` — used on the client; routes calls through `/api/...`
- `src/lib/server-api.ts` (`callLaravelApi`) — used only in Next.js route handlers; calls Laravel directly using `API_BASE_URL` env var
- `src/lib/proxy-handler.ts` (`forwardToLaravel`) — generic proxy used by `app/api/[...path]/` catch-all and `app/api/proxy/`; reads the access token from the cookie and attaches `Authorization: Bearer <token>` before forwarding to Laravel
- `app/api/mock/` — mock routes for development/testing

### Feature Slice Organization
```
src/features/<domain>/
  <domain>.api.ts       — API call functions (uses apiClient)
  <domain>.hooks.ts     — TanStack Query hooks (useQuery / useMutation)
  <domain>.types.ts     — TypeScript types & interfaces
  components/           — UI components for this feature
```

### State Management
- **TanStack Query** — all server state (apps, integrations, platforms, auth session)
- **Zustand** (with `persist`) — client-only UI state (agency onboarding wizard progress)
- Query keys follow `["apps"]`, `["app", id]`, `["platforms"]` patterns

### Forms
- `react-hook-form` + `zod` for all forms
- Zod schemas defined inline in the component file (not shared unless reused)

### UI
- **shadcn/ui** components (`src/components/ui/`)
- **Tailwind CSS** for styling
- **Framer Motion** for page/step transitions
- Notifications: `src/shared/notifications/notifier.ts` (`notify()`)

### Auth Session
- JWT stored in HttpOnly cookie
- `src/lib/auth-session.ts` — `readAccessToken(request)`, `clearAuthSession()`
- After developer login with no apps: redirected to `/developer/onboarding`

### Route Groups
- `(onboarding)` — pre-auth or first-time setup flows; lighter layout
- `(portal)` — authenticated developer dashboard
- `(public)` — marketing pages (blog, contact, pricing)
- `(policies)` — legal pages

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `API_BASE_URL` | Laravel backend base URL (server-side only) |
| `NEXT_PUBLIC_API_BASE_URL` | Fallback (avoid using in new code) |
| `APP_URL` | This Next.js app's URL (used for absolute URLs in SSR fetch) |

---

## Key Constraints & Conventions

- **Do not call Laravel directly from client components** — always go through `/api/` BFF routes
- **Agency full product** is out of scope for this repo; only onboarding belongs here
- Content-Type for app create/update is `multipart/form-data` (logo upload); other calls use `application/json`
- Hop-by-hop headers (`host`, `connection`, `content-length`, `cookie`, `authorization`) are stripped before forwarding in the proxy
- New feature modules follow the `src/features/<domain>/` slice pattern
- API docs content lives in `content/` as MDX; navigation is controlled by `_meta.ts` files in each section folder
