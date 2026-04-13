import type { Metadata } from "next";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import UnifiedSocialApisClient from "./UnifiedSocialApisClient";

export const metadata: Metadata = {
  title: "Unified Social API - Publish Everywhere With One Request | Palactix",
  description:
    "One API endpoint to publish to Instagram, X, LinkedIn, TikTok, Facebook and YouTube. BYO OAuth — your credentials, your branding, zero vendor lock-in.",
  keywords: [
    "unified social media API",
    "publish to multiple platforms",
    "BYO OAuth API",
    "social publishing API",
    "Instagram API",
    "white-label social API",
    "social media developer API",
  ],
  openGraph: {
    title: "Unified Social API — One Request. Every Platform.",
    description:
      "POST /v1/posts/publish — publish to Instagram, X, LinkedIn, TikTok and more. Your OAuth apps. Your branding.",
    images: [{ url: "https://palactix.com/og/unified-social-apis.png" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: "https://palactix.com" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://palactix.com/product" },
    { "@type": "ListItem", position: 3, name: "Unified Social APIs", item: "https://palactix.com/product/unified-social-apis" },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Palactix Unified Social API",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "SocialMediaApplication",
  operatingSystem: "Web",
  description:
    "A unified REST API for publishing to Instagram, X, LinkedIn, TikTok, Facebook and YouTube in one request. BYO OAuth (Bring Your Own Keys) — your developer apps, your branding, your credentials. Queue-based publishing with automatic retry and rate-limit handling.",
  url: "https://palactix.com/product/unified-social-apis",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "100 posts/month free. $0.01 per post after that.",
  },
  creator: {
    "@type": "Organization",
    name: "Palactix",
    url: "https://palactix.com",
  },
  featureList: [
    "Single API endpoint — POST /v1/posts/publish",
    "BYO OAuth (Bring Your Own Keys) — your branding on every consent screen",
    "Instagram, X, LinkedIn, TikTok, Facebook, YouTube support",
    "Built-in scheduling",
    "Comment and thread support",
    "Automatic retry and failover",
    "Platform-aware rate limiting",
    "Webhook-ready architecture",
  ],
};

export default function UnifiedSocialApisPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <Navbar />
      <UnifiedSocialApisClient />
      <Footer />
    </div>
  );
}

