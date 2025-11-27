import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockReports: MiddlePanelItem[] = [
  { id: "1", title: "New Reports", subtitle: "3 unresolved", path: "/platform/reports-reviews/1" },
  { id: "2", title: "Reviews", subtitle: "24 reviews", path: "/platform/reports-reviews/2" },
];

export default function ReportsReviewsPage() {
  return (
    <>
      <MiddlePanel title="Reports & Reviews" items={mockReports} />
      <ContentArea>
        <PagePlaceholder
          title="Reports & Reviews"
          description="Manage user reports and bot reviews"
        />
      </ContentArea>
    </>
  );
}
