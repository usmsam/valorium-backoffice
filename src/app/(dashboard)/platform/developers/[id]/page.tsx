import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { MiddlePanelItem } from "@/types/navigation";
import { mockDevelopers } from "@/lib/mock-developers";
import { DeveloperDetailsView } from "@/components/developers/DeveloperDetailsView";
import { notFound } from "next/navigation";

export default async function DeveloperDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const developer = mockDevelopers.find((d) => d.id === id);

  if (!developer) {
    notFound();
  }

  const developerItems: MiddlePanelItem[] = mockDevelopers.map((dev) => ({
    id: dev.id,
    title: dev.name,
    subtitle: `${dev.status.replace("_", " ")} • ${dev.country}`,
    path: `/platform/developers/${dev.id}`,
  }));

  return (
    <>
      <MiddlePanel title="Developers" items={developerItems} emptyMessage="No developers found" />
      <ContentArea>
        <DeveloperDetailsView developer={developer} />
      </ContentArea>
    </>
  );
}
