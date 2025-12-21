import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { MiddlePanelItem } from "@/types/navigation";
import { mockPayments } from "@/lib/mock-payments";
import { PaymentsDashboard } from "@/components/payments/PaymentsDashboard";

export default function PaymentsPage() {
  const paymentItems: MiddlePanelItem[] = mockPayments.map((payment) => ({
    id: payment.id,
    title: `${payment.userName} - $${payment.amount}`,
    subtitle: `${payment.status} • ${payment.method} • ${new Date(payment.createdAt).toLocaleDateString()}`,
    path: `/platform/payments/${payment.id}`,
  }));

  return (
    <>
      <MiddlePanel title="Payments" items={paymentItems} emptyMessage="No payments found" />
      <ContentArea>
        <PaymentsDashboard payments={mockPayments} />
      </ContentArea>
    </>
  );
}
