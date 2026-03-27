import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",
          "/auth/",
          "/dashboard/",
          "/admin/",
          "/_next/",
        ],
      },
    ],

    sitemap: "https://palactix.com/sitemap.xml",
  }
}