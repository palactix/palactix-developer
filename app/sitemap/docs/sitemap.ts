import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

const baseUrl = "https://palactix.com"

const docsDirectory = path.join(
  process.cwd(),
  "content"
)

function getAllDocsRoutes(dir: string): string[] {

  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  })

  let routes: string[] = []

  for (const entry of entries) {

    const fullPath = path.join(dir, entry.name)

    // Skip hidden/meta files
    if (
      entry.name.startsWith("_") ||
      entry.name.startsWith(".")
    ) {
      continue
    }

    if (entry.isDirectory()) {

      routes = routes.concat(
        getAllDocsRoutes(fullPath)
      )

    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".mdx")
    ) {

      const relativePath = path
        .relative(docsDirectory, fullPath)
        .replace(".mdx", "")

      let route = relativePath
        .split(path.sep)
        .join("/")

      // ✅ Fix index.mdx issue
      if (route.endsWith("/index")) {
        route = route.replace("/index", "")
      }

      // Root index case
      if (route === "index") {
        route = ""
      }

      routes.push(`/docs/${route}`)
    }
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {

  const routes = getAllDocsRoutes(docsDirectory)

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/docs" ? 1 : 0.9,
  }))
}