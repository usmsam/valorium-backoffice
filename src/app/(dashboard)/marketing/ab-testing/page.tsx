import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockTests: MiddlePanelItem[] = [
  { id: "1", title: "Pricing Page V2", subtitle: "Running", path: "/marketing/ab-testing/1" },
  { id: "2", title: "Signup Flow", subtitle: "Completed", path: "/marketing/ab-testing/2" },
];

export default function AbTestingPage() {
  return (
    <>
      <MiddlePanel title="A/B Tests" items={mockTests} />
      <ContentArea>
        <PagePlaceholder
          title="A/B Testing"
          description="Manage A/B tests and pricing experiments"
        />
      </ContentArea>
    </>
  );
}
