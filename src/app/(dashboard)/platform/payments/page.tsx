import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockPayments: MiddlePanelItem[] = [
  { id: "1", title: "Today's Revenue", subtitle: "$5,240", path: "/platform/payments/1" },
  { id: "2", title: "This Month", subtitle: "$124,500", path: "/platform/payments/2" },
];

export default function PaymentsPage() {
  return (
    <>
      <MiddlePanel title="Payments" items={mockPayments} />
      <ContentArea>
        <PagePlaceholder
          title="Payments Dashboard"
          description="Platform revenue, cash flow, purchase statistics"
        />
      </ContentArea>
    </>
  );
}
