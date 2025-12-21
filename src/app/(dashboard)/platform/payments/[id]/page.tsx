import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { MiddlePanelItem } from "@/types/navigation";
import { mockPayments } from "@/lib/mock-payments";
import { PaymentDetailsView } from "@/components/payments/PaymentDetailsView";
import { notFound } from "next/navigation";

export default async function PaymentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payment = mockPayments.find((p) => p.id === id);

  if (!payment) {
    notFound();
  }

  const paymentItems: MiddlePanelItem[] = mockPayments.map((p) => ({
    id: p.id,
    title: `${p.userName} - $${p.amount}`,
    subtitle: `${p.status} " ${p.method} " ${new Date(p.createdAt).toLocaleDateString()}`,
    path: `/platform/payments/${p.id}`,
  }));

  return (
    <>
      <MiddlePanel title="Payments" items={paymentItems} emptyMessage="No payments found" />
      <ContentArea>
        <PaymentDetailsView payment={payment} />
      </ContentArea>
    </>
  );
}
