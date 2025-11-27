import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockPayroll: MiddlePanelItem[] = [
  { id: "1", title: "January 2025", subtitle: "Paid", path: "/company/payroll/1" },
  { id: "2", title: "February 2025", subtitle: "Pending", path: "/company/payroll/2" },
];

export default function PayrollPage() {
  return (
    <>
      <MiddlePanel title="Payroll" items={mockPayroll} />
      <ContentArea>
        <PagePlaceholder
          title="Payroll Management"
          description="Salaries, bonuses, KPI checks, premiums, overtime, payment status"
        />
      </ContentArea>
    </>
  );
}
