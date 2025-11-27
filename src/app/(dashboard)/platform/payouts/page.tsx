import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockPayouts: MiddlePanelItem[] = [
  { id: "1", title: "Pending Requests", subtitle: "8 requests", path: "/platform/payouts/1" },
  { id: "2", title: "Approved", subtitle: "45 payouts", path: "/platform/payouts/2" },
];

export default function PayoutsPage() {
  return (
    <>
      <MiddlePanel title="Payouts" items={mockPayouts} />
      <ContentArea>
        <PagePlaceholder
          title="Payouts Management"
          description="Manage developer payout requests, approvals, history"
        />
      </ContentArea>
    </>
  );
}
