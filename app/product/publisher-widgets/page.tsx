import type { Metadata } from "next";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import WidgetPageClient from "./WidgetPageClient";


export const metadata: Metadata = {
  title: "Publisher Widget - Embeddable Social Media Publishing | Palactix",
  description:
    "Add social media publishing to your platform in 5 minutes. White-label widget for Instagram, X, TikTok, LinkedIn. npm install. Your branding. Your OAuth.",
  keywords: [
    "embeddable social widget",
    "social media API",
    "white-label publishing",
    "white-label scheduler",
    "Instagram widget",
    "social scheduler embed",
  ],
  openGraph: {
    title: "Publisher Widget - Embed Social Publishing",
    description:
      "Add Instagram, X, TikTok publishing to your platform in 5 minutes",
    images: [{ url: "https://raw.githubusercontent.com/palactix/publisher-widget/6c8ce61773351f6c5d070d2d62ff88e40a45a94c/media/palactix-publisher-widget.png" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://palactix.com",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://palactix.com/product",
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Social Publisher Widget",
      "item": "https://palactix.com/product/publisher-widgets",
    },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Palactix Publisher Widget",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "SocialMediaApplication",
  "operatingSystem": "Web",
  "description":
    "An embeddable white-label social media publishing widget. Add Instagram, X, TikTok, LinkedIn, Facebook and YouTube publishing to any web platform in 5 minutes. BYO OAuth — your branding, your domain, your credentials.",
  "url": "https://palactix.com/product/publisher-widgets",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "100 posts/month free. $0.01 per post after that.",
  },
  "creator": {
    "@type": "Organization",
    "name": "Palactix",
    "url": "https://palactix.com",
  },
  "featureList": [
    "White-label OAuth flows",
    "Instagram, X, TikTok, LinkedIn, Facebook, YouTube publishing",
    "npm package — works in React, Vue, HTML, Angular",
    "Scheduling built-in",
    "Multi-account support",
    "Retry and failover handling",
  ],
};

export default function PublisherWidgetsPage() {
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
      <WidgetPageClient />
      <Footer />
    </div>
  );
}
