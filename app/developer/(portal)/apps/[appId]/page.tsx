import { AppDashboard } from "@/features/developer-app/components/AppDashboard";

export default async function DeveloperAppDashboardPage({
    params
}: {
    params: Promise<{ appId: string }>
}) {
    const resolvedParams = await params;

    return <AppDashboard appId={resolvedParams.appId} />;
}