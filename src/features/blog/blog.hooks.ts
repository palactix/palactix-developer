"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchBlogBySlug,
  fetchAdjacentBlogs,
  fetchBlogsWithPagination,
} from "./blog.api";

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ["blogs", "detail", slug],
    queryFn: () => fetchBlogBySlug(slug),
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdjacentBlogs(currentSlug: string) {
  return useQuery({
    queryKey: ["blogs", "adjacent", currentSlug],
    queryFn: () => fetchAdjacentBlogs(currentSlug),
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlogList(page: number) {
  return useQuery({
    queryKey: ["blogs", "list", page],
    queryFn: () => fetchBlogsWithPagination(page),
    staleTime: 1000 * 60 * 5,
  });
}
