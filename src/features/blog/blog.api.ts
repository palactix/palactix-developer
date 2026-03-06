import { unstable_cache } from "next/cache";

import { BLOG_URLS } from "./blog.const";
import { PaginatedResponse } from "@/types/pagination";
import type {
  BlogPost,
  BlogPaginationData,
  BlogCategoryPosts,
  BlogDetailsResponse,
} from "./blog.type";
import { apiClient } from "@/lib/api-client";

const ONE_DAY_SECONDS = 60 * 60 * 24;

const getReadStats = (markdown: string) => {
  const wordCount = markdown.trim().length === 0 ? 0 : markdown.trim().split(/\s+/).length;
  const readTime = wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / 200));
  return { wordCount, readTime };
};

export type BlogFilterParams = {
  page?: number;
  category_id?: string;
  tag?: string;
  search?: string;
};

export async function fetchBlogsWithPagination(page = 1, filters: Omit<BlogFilterParams, 'page'> = {}): Promise<BlogPaginationData> {
  const params = new URLSearchParams({ page: String(page) });
  if (filters.category_id) params.set("category_id", filters.category_id);
  if (filters.tag) params.set("tag", filters.tag);
  if (filters.search) params.set("search", filters.search);

  const result = await apiClient<PaginatedResponse<BlogPost>>(
    `${BLOG_URLS.FETCH_POSTS}?${params.toString()}`,
  );

  const blogs = result.data || [];
  const totalPages = result.meta?.last_page || 1;
  const currentPage = result.meta?.current_page || page;

  return {
    blogs,
    currentPage,
    totalPages,
    totalBlogs: result.meta?.total || blogs.length,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}

export async function fetchAllBlogs(): Promise<BlogPost[]> {
  const firstPage = await fetchBlogsWithPagination(1);
  const blogs = [...firstPage.blogs];

  if (firstPage.totalPages > 1) {
    for (let page = 2; page <= firstPage.totalPages; page++) {
      const pageData = await fetchBlogsWithPagination(page);
      blogs.push(...pageData.blogs);
    }
  }

  return blogs;
}

async function fetchBlogBySlugUncached(slug: string): Promise<BlogPost> {
  const result = await apiClient<BlogDetailsResponse>(
    BLOG_URLS.FETCH_POST_BY_SLUG.replace("{slug}", encodeURIComponent(slug))
  );

  const post = result.data;
  const markdown = post.content || "";
  const { wordCount, readTime } = getReadStats(markdown);

  return {
    ...post,
    description: post.excerpt ?? undefined,
    image: post.featured_image_url ?? undefined,
    content: markdown,
    content_markdown: markdown,
    table_of_contents: (post.table_of_contents || []).map((t) => ({ ...t, id: t.slug })),
    faqs: post.faqs || [],
    readTime,
    wordCount,
    prev_post: result.prev_post || null,
    next_post: result.next_post || null,
  };
}

export async function fetchBlogBySlug(
  slug: string,
  options?: { bypassCache?: boolean }
): Promise<BlogPost> {
  const loader = options?.bypassCache
    ? () => fetchBlogBySlugUncached(slug)
    : unstable_cache(
        () => fetchBlogBySlugUncached(slug),
        ["blog-by-slug", slug],
        { revalidate: ONE_DAY_SECONDS, tags: ["blog-by-slug", slug] }
      );

  return loader();
}

export async function fetchAdjacentBlogs(
  currentSlug: string
): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
  const all = await fetchAllBlogs();
  const index = all.findIndex((b) => b.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

export async function fetchBlogTags(): Promise<{ id: number; name: string; slug: string }[]> {
  const result = await apiClient<
    { data: { id: number; name: string; slug: string }[] } | { id: number; name: string; slug: string }[]
  >(BLOG_URLS.TAGS);
  return Array.isArray(result) ? result : (result.data ?? []);
}

export async function fetchBlogCategories(): Promise<
  { id: number; name: string; slug?: string }[]
> {
  const result = await apiClient<
    | { data: { id: number; name: string; slug?: string }[] }
    | { id: number; name: string; slug?: string }[]
  >(BLOG_URLS.CATEGORIES);
  return Array.isArray(result) ? result : (result.data ?? []);
}

export async function fetchBlogCategoriesWithPosts(): Promise<BlogCategoryPosts[]> {
  const result = await apiClient<
    { data: BlogCategoryPosts[] } | BlogCategoryPosts[]
  >(BLOG_URLS.CATEGORY_POSTS);
  return Array.isArray(result) ? result : (result.data ?? []);
}
