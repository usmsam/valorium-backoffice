import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { MiddlePanelItem } from "@/types/navigation";
import { mockBots } from "@/lib/mock-bots";

export default function BotsPage() {
  const botItems: MiddlePanelItem[] = mockBots.map((bot) => ({
    id: bot.id,
    title: bot.name,
    subtitle: `${bot.status.replace("_", " ")} • v${bot.version}`,
    path: `/platform/bots/${bot.id}`,
  }));

  return (
    <>
      <MiddlePanel title="Bots" items={botItems} emptyMessage="No bots found" />
      <ContentArea>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Select a bot to view details</h2>
            <p className="text-muted-foreground">
              Choose a bot from the list to see moderation details
            </p>
          </div>
        </div>
      </ContentArea>
    </>
  );
}
