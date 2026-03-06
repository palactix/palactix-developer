import { StaticPageShell, useStaticContent } from "@/features/static-content";
import { STATIC_PAGES_CONTENT_URLS } from "@/features/static-content/static-content.constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Palactix",
  description:
    "View the Privacy Policy for Palactix, outlining how we handle your data and protect your privacy."
};
const PRIVACY_POLICY_URL = STATIC_PAGES_CONTENT_URLS.PRIVACY_POLICY
export const revalidate = 86400;

export default function PrivacyPolicyPage() {
  const { content } = useStaticContent({ url: PRIVACY_POLICY_URL, revalidate });

  return (
    <StaticPageShell
      backHref="/"
      backLabel="Back to home"
      eyebrow="Legal"
      title="Privacy Policy"
      description="Transparency around how Palactix handles your data."
    >
      {content}
    </StaticPageShell>
  );
}