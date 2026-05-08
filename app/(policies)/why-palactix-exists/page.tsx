import { StaticPageShell, getStaticContent } from "@/features/static-content";
import { headers } from "next/headers";
import { STATIC_PAGES_CONTENT_URLS } from "@/features/static-content/static-content.constant";
import { Metadata } from "next";
import Script from "next/script";

const title = "Why Palactix Exists: Agencies Should Own Their Infrastructure";
const description =
  "The manifesto behind Palactix — why social media agencies should own their publishing infrastructure, not rent it from vendors.";
const imageUrl = "https://palactix.com/images/why-palactix-exists.jpg";
export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    images: [imageUrl]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
};

const WHY_PALACTIX_URL = STATIC_PAGES_CONTENT_URLS.WHY_PALACTIX_EXISTS;
export const revalidate = 86400;

export default async function WhyPalactixExistsPage() {
  const { content } = await getStaticContent({ url: WHY_PALACTIX_URL, revalidate });
  // Determine back href from Referer header when available, otherwise fallback to '/'
  const headersList = await headers();
  const referer = headersList.get('referer');
  const backHref = referer || "/";
  

  return (
    <>
    <PalactixWhySchema title={title} description={description} />
    <StaticPageShell
      backHref={backHref}
      backLabel="Back"
      eyebrow=""
      title="Why Palactix Exists"
      description="Transparency around why Palactix exists and our mission."
    >
       
      {content}
    </StaticPageShell>
    </>
    
  );
}


function PalactixWhySchema({ title, description }: { title: string; description: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://palactix.com/#organization",
        "name": "Palactix",
        "url": "https://palactix.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://palactix.com/og.png"
        },
        "sameAs": [
          "https://www.linkedin.com/company/palactix",
          "https://twitter.com/palactix"
        ]
      },

      {
        "@type": "WebSite",
        "@id": "https://palactix.com/#website",
        "url": "https://palactix.com",
        "name": "Palactix",
        "publisher": {
          "@id": "https://palactix.com/#organization"
        }
      },

      {
        "@type": "WebPage",
        "@id": "https://palactix.com/why-palactix-exists#webpage",
        "url": "https://palactix.com/why-palactix-exists",
        "name": title,
        "description": description,
        "isPartOf": {
          "@id": "https://palactix.com/#website"
        },
        "about": {
          "@id": "https://palactix.com/#organization"
        }
      },

      {
        "@type": "Article",
        "@id": "https://palactix.com/why-palactix-exists#article",
        "headline": title,
        "description": description,
        "author": {
          "@type": "Person",
          "name": "Jitendra Meena"
        },
        "publisher": {
          "@id": "https://palactix.com/#organization"
        },
        "mainEntityOfPage": {
          "@id": "https://palactix.com/why-palactix-exists#webpage"
        },
        "datePublished": "2026-02-07",
        "dateModified": "2026-02-07",
        "image": {
          "@type": "ImageObject",
          "url": "https://palactix.com/images/why-palactix-exists-og.png"
        }
      },

      {
        "@type": "BreadcrumbList",
        "@id": "https://palactix.com/why-palactix-exists#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://palactix.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Why Palactix Exists",
            "item": "https://palactix.com/why-palactix-exists"
          }
        ]
      }
    ]
  };

  return (
    <Script
      id="palactix-why-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}