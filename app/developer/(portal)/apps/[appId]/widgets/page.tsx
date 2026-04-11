import { WidgetsPage } from "@/features/developer-app/components/WidgetsPage";

export default async function AppWidgetsPage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;

  return <WidgetsPage appId={appId} />;
}
