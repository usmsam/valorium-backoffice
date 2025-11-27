import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { MiddlePanelItem } from "@/types/navigation";
import { mockBots } from "@/lib/mock-bots";
import { BotDetailsView } from "@/components/bots/BotDetailsView";
import { notFound } from "next/navigation";

export default async function BotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bot = mockBots.find((b) => b.id === id);

  if (!bot) {
    notFound();
  }

  const botItems: MiddlePanelItem[] = mockBots.map((b) => ({
    id: b.id,
    title: b.name,
    subtitle: `${b.status.replace("_", " ")} • v${b.version}`,
    path: `/platform/bots/${b.id}`,
  }));

  return (
    <>
      <MiddlePanel title="Bots" items={botItems} emptyMessage="No bots found" />
      <ContentArea>
        <BotDetailsView bot={bot} />
      </ContentArea>
    </>
  );
}
