import { WebhooksPage } from "@/features/webhooks/components/WebhooksPage";

export default async function DeveloperAppWebhooksPage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;

  return <WebhooksPage appId={appId} />;
}
