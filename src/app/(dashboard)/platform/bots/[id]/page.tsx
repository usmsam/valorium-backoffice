import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockBots: MiddlePanelItem[] = [
  { id: "1", title: "Trading Bot Alpha", subtitle: "Pending approval", path: "/platform/bots/1" },
  { id: "2", title: "Market Maker Pro", subtitle: "Active", path: "/platform/bots/2" },
  { id: "3", title: "Arbitrage Bot", subtitle: "Under review", path: "/platform/bots/3" },
];

export default function BotDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <MiddlePanel title="Bots" items={mockBots} emptyMessage="No bots found" />
      <ContentArea>
        <PagePlaceholder
          title={`Bot #${params.id}`}
          description="Bot details, moderation, risk assessment, logs, compliance"
        />
      </ContentArea>
    </>
  );
}
