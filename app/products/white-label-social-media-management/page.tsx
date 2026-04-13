import type { Metadata } from "next";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import WhiteLabelSchedulerClient from "./WhiteLabelSchedulerClient";

export const metadata: Metadata = {
  title: "White-Label Social Management Platform for Agencies - BYOK",
  description:
    "Run a fully white-label social media management platform under your own brand and domain. BYO OAuth, unlimited clients, unlimited team members. Built for agencies.",
  keywords: [
    "white label social media management platform",
    "agency social media management",
    "social media scheduler white label",
    "BYO OAuth scheduler",
    "custom domain social media tool",
    "social media agency platform",
    "unlimited client social media management",
  ],
  openGraph: {
    title: "White-Label Social Scheduler — Your Brand, Your Domain, Your Infrastructure",
    description:
      "Unlimited clients. Unlimited team. White-label branding. BYO OAuth. Run a full agency-grade social scheduler under your own domain.",
    images: [{ url: "https://palactix.com/og/white-label-scheduler.png" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: "https://palactix.com" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://palactix.com/product" },
    { "@type": "ListItem", position: 3, name: "White-Label Scheduler", item: "https://palactix.com/product/white-label-scheduler" },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Palactix White-Label Social Scheduler",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "SocialMediaApplication",
  operatingSystem: "Web",
  description:
    "A fully white-label social media management platform for agencies. Run under your own brand, your own domain, and your own OAuth apps. Unlimited clients, unlimited team members, visual calendar, approval workflows, and campaign management.",
  url: "https://palactix.com/product/white-label-scheduler",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "199",
      priceCurrency: "USD",
      billingIncrement: "P1M",
      description: "Unlimited team members, unlimited clients, white label, BYO OAuth.",
    },
    {
      "@type": "Offer",
      name: "Growth",
      price: "799",
      priceCurrency: "USD",
      billingIncrement: "P1M",
      description: "Everything in Starter plus AI captions, Canva, Google Drive and campaign management.",
    },
  ],
  creator: {
    "@type": "Organization",
    name: "Palactix",
    url: "https://palactix.com",
  },
  featureList: [
    "White-label branding — your logo, your colors, your name",
    "Custom domain support — run on your own subdomain",
    "BYO OAuth — your platform developer apps on every consent screen",
    "Unlimited clients — no per-client pricing",
    "Unlimited team members — no seat pricing",
    "Visual calendar and advanced scheduler",
    "Rule-based post approval workflows",
    "Campaign and tag management",
    "AI caption generator",
    "Canva integration",
    "Google Drive support",
    "Live post preview",
    "Queue-based publishing with automatic retry",
    "Multi-client data isolation",
  ],
};

export default function WhiteLabelSchedulerPage() {
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
      <WhiteLabelSchedulerClient />
      <Footer />
    </div>
  );
}

