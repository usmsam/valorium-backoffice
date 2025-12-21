import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { MiddlePanelItem } from "@/types/navigation";
import { mockPayouts } from "@/lib/mock-payouts";
import { PayoutsDashboard } from "@/components/payouts/PayoutsDashboard";

export default function PayoutsPage() {
  const payoutItems: MiddlePanelItem[] = mockPayouts.map((payout) => ({
    id: payout.id,
    title: `${payout.developerName} - $${payout.amount}`,
    subtitle: `${payout.status} • ${payout.method} • ${new Date(payout.requestedAt).toLocaleDateString()}`,
    path: `/platform/payouts/${payout.id}`,
  }));

  return (
    <>
      <MiddlePanel title="Payouts" items={payoutItems} emptyMessage="No payout requests found" />
      <ContentArea>
        <PayoutsDashboard payouts={mockPayouts} />
      </ContentArea>
    </>
  );
}
