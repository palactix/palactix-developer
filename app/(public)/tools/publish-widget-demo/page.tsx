import type { Metadata } from "next";
import DemoPageClient from "./DemoPageClient";

export const metadata: Metadata = {
  title: "Publisher Widget Live Demo — Try It Now | Palactix",
  description:
    "Interactive demo of the Palactix Publisher Widget. Try basic, pre-filled caption, and media modes live in your browser — no signup required.",
  keywords: [
    "publisher widget demo",
    "social media widget demo",
    "embeddable social publishing demo",
    "palactix live demo",
    "social media widget integration",
    "white-label social widget",
  ],
  openGraph: {
    title: "Try the Palactix Publisher Widget — Live Demo",
    description:
      "See how social publishing embeds into any app. Three demo modes, real widget, no signup required.",
    images: [
      {
        url: "https://raw.githubusercontent.com/palactix/publisher-widget/6c8ce61773351f6c5d070d2d62ff88e40a45a94c/media/palactix-publisher-widget.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Try the Palactix Publisher Widget — Live Demo",
    description:
      "Interactive demo — see how social publishing embeds into any app in minutes.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",    item: "https://palactix.com" },
    { "@type": "ListItem", position: 2, name: "Tools",   item: "https://palactix.com/tools" },
    { "@type": "ListItem", position: 3, name: "Publisher Widget Demo", item: "https://palactix.com/tools/publish-widget-demo" },
  ],
};

export default function PublishWidgetDemoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DemoPageClient />
    </>
  );
}
