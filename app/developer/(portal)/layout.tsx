import { DeveloperLayout } from "@/components/developer-layout/DeveloperLayout";

export default function AppDeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DeveloperLayout>{children}</DeveloperLayout>;
}