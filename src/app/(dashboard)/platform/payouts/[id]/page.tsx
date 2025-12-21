import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { MiddlePanelItem } from "@/types/navigation";
import { mockPayouts } from "@/lib/mock-payouts";
import { PayoutDetailsView } from "@/components/payouts/PayoutDetailsView";
import { notFound } from "next/navigation";

export default async function PayoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payout = mockPayouts.find((p) => p.id === id);

  if (!payout) {
    notFound();
  }

  const payoutItems: MiddlePanelItem[] = mockPayouts.map((p) => ({
    id: p.id,
    title: `${p.developerName} - $${p.amount}`,
    subtitle: `${p.status} " ${p.method} " ${new Date(p.requestedAt).toLocaleDateString()}`,
    path: `/platform/payouts/${p.id}`,
  }));

  return (
    <>
      <MiddlePanel title="Payouts" items={payoutItems} emptyMessage="No payout requests found" />
      <ContentArea>
        <PayoutDetailsView payout={payout} />
      </ContentArea>
    </>
  );
}
