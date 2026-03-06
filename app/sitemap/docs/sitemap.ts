import { MetadataRoute } from "next"

const baseUrl = "https://palactix.com"

const docsPages = [
  "/docs/introduction",
  "/docs/getting-started/how-palactix-works",
  "/docs/getting-started/quick-start",
  "/docs/getting-started/create-developer-app",
  "/docs/getting-started/configure-platform-credentials",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return docsPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))
}