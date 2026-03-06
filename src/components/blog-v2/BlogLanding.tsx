"use client";

import { useCallback, useRef, useTransition, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { BlogPost, BlogPaginationData } from "@/features/blog/blog.type";
import { FeaturedCard } from "./FeaturedCard";
import { ArticleCard } from "./ArticleCard";

interface BlogLandingProps {
  blogs: BlogPost[];
  featured: BlogPost | null;
  tags: { id: number; name: string; slug: string }[];
  categories: { id: number; name: string; slug?: string }[];
  pagination: BlogPaginationData | null;
}

export function BlogLanding({ blogs, featured, tags, categories, pagination }: BlogLandingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";
  const selectedTag = searchParams.get("tag") ?? "all";
  const selectedCategory = searchParams.get("category_id") ?? "all";

  // Local input value for search so typing feels instant; debounce the URL push
  const [searchInput, setSearchInput] = useState(search);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtersActive = search.trim().length > 0 || selectedTag !== "all" || selectedCategory !== "all";

  const pushFilters = useCallback(
    (updates: { search?: string; tag?: string; category_id?: string; page?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      const set = (key: string, val: string | undefined, empty: string) => {
        if (!val || val === empty) {
          params.delete(key);
        } else {
          params.set(key, val);
        }
      };
      

      if ("search" in updates) set("search", updates.search, "");
      if ("tag" in updates) set("tag", updates.tag, "all");
      if ("category_id" in updates) set("category_id", updates.category_id, "all");
      if ("page" in updates) set("page", updates.page, "1");

      // Reset to page 1 whenever a filter changes
      if ("search" in updates || "tag" in updates || "category_id" in updates) {
        params.delete("page");
      }

      startTransition(() => {
        router.push(`/blog?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => pushFilters({ search: value }), 400);
  };

  // Build "load more" URL preserving current filters
  const loadMoreUrl = (() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String((pagination?.currentPage || 1) + 1));
    return `/blog?${params.toString()}`;
  })();

  return (
    <div className={`space-y-16 transition-opacity duration-200 ${isPending ? "opacity-60 pointer-events-none" : ""}`}>
      {/* Hero */}
      <div className="space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Blog</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Insights on agency infrastructure, economics, and owning your publishing platform.
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Practical essays on sovereignty, economics, OAuth risk, and building white-label publishing you own.
        </p>

        <div className="mx-auto flex max-w-3xl flex-col gap-4 md:flex-row md:items-center md:gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-3 text-base text-foreground shadow-sm transition duration-150 ease-out focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="relative w-full md:w-56">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={selectedTag}
              onChange={(e) => pushFilters({ tag: e.target.value })}
              className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-3 text-base text-foreground shadow-sm transition duration-150 ease-out focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Topics</option>
              {tags.map((t) => (
                <option key={t.id} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured */}
      {featured && !filtersActive ? (
        <section className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Featured</div>
          <FeaturedCard post={featured} />
        </section>
      ) : null}

      {/* Grid with category pills */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          <span>Browse</span>
          <div className="flex flex-wrap gap-2">
            {[{ id: 0, name: "All", slug: "all" }, ...categories].map((c) => (
              <button
                key={c.id}
                onClick={() => pushFilters({ category_id: c.id.toString() ?? "all" })}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition duration-150 ease-out ${
                  selectedCategory === (c.id.toString() ?? "all")
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-foreground/40"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-card p-8 text-center text-muted-foreground">
            No articles match your filters yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Load more */}
      {pagination?.hasNext ? (
        <div className="text-center">
          <Link
            href={loadMoreUrl}
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition duration-150 ease-out hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Load More Articles
          </Link>
        </div>
      ) : null}

      {/* CTA */}
      <section className="overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-background p-8 text-center shadow-lg shadow-primary/10 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">I&apos;M BUILDING PALACTIX</p>
        <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground">for agencies like yours</h3>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          White-label publishing infrastructure you own—not rent. No shared apps, no vendor lock-in, and no per-seat pricing tax.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            Get Early Access Updates
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Early access, development updates, agency infrastructure insights. Unsubscribe anytime.</p>
      </section>
    </div>
  );
}
