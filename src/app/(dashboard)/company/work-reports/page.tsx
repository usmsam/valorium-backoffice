import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockReports: MiddlePanelItem[] = [
  { id: "1", title: "Today's Reports", subtitle: "12 reports", path: "/company/work-reports/1" },
  { id: "2", title: "This Week", subtitle: "48 reports", path: "/company/work-reports/2" },
];

export default function WorkReportsPage() {
  return (
    <>
      <MiddlePanel title="Daily Reports" items={mockReports} />
      <ContentArea>
        <PagePlaceholder
          title="Work Reports"
          description="Daily employee reports: completed tasks, in-progress work, blockers"
        />
      </ContentArea>
    </>
  );
}
