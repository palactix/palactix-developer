import { BlogPost } from "@/features/blog"
import { MetadataRoute } from "next"

const baseUrl = "https://palactix.com"

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/sitemap`, {
    cache: "no-store",
  })
  const json = await res.json()
  return json as BlogPost[]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  return posts.map((post: BlogPost) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }))
}