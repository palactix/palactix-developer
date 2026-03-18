import { MetadataRoute } from "next"

const baseUrl = "https://palactix.com"

const docsPages = [
  "/docs/introduction",
  "/docs/getting-started/how-palactix-works",
  "/docs/getting-started/quick-start",
  "/docs/getting-started/create-developer-app",
  "/docs/getting-started/configure-platform-credentials",
  "/docs/getting-started/pricing",

  "/docs/core-concepts/unified-api",

  "/docs/authentication",
  "/docs/authentication/access-tokens",

  "/docs/connections",
  "/docs/connections/connect-account",
  "/docs/connections/connection-flow",
  "/docs/connections/fetch-accounts",

  "/docs/api-reference/base-url",
  "/docs/api-reference/generate-access-token",
  "/docs/api-reference/authentication",
  "/docs/api-reference/oauth-connect",
  "/docs/api-reference/connection-accounts",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return docsPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))
}