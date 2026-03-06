export type BlogCategory = {
  id: number;
  name: string;
};

export type BlogTOCItem = {
  level: number;
  title: string;
  slug: string;
  id?: string;
};

export type BlogFAQ = {
  question: string;
  answer: string;
};

export type BlogNavigation = {
  id: number;
  slug: string;
  title: string;
};

/** Alias kept for backward compatibility */
export type BlogNavPost = BlogNavigation;

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;

  featured_image_url: string | null;
  /** Alias for featured_image_url — populated by API layer */
  image?: string;

  author_name: string;

  published_at: string;

  seo_title: string;
  seo_description: string | null;
  seo_keywords: string[];

  category: BlogCategory | null;
  /** Raw category name strings for client-side filtering */
  categories?: string[];

  tags: string[];

  created_at: string;
  updated_at: string;

  content?: string;
  /** Raw markdown string kept for schema/SEO usage */
  content_markdown?: string;
  /** Human-readable description — mapped from excerpt by API layer */
  description?: string;
  faqs?: BlogFAQ[];
  table_of_contents?: BlogTOCItem[];

  /** Computed by API layer */
  readTime?: number;
  wordCount?: number;

  prev_post?: BlogNavigation | null;
  next_post?: BlogNavigation | null;
};

export type BlogDetailsResponse = {
  data: BlogPost;
  prev_post: BlogNavigation | null;
  next_post: BlogNavigation | null;
};

export type BlogCategoryPosts = {
  id: number;
  name: string;
  slug?: string;
  posts: BlogNavigation[];
};

export interface BlogPaginationData {
  blogs: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  hasNext: boolean;
  hasPrev: boolean;
}
