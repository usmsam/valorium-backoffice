import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockDevelopers: MiddlePanelItem[] = [
  { id: "1", title: "John Developer", subtitle: "Verified", path: "/platform/developers/1" },
  { id: "2", title: "Sarah Coder", subtitle: "Pending verification", path: "/platform/developers/2" },
];

export default function DevelopersPage() {
  return (
    <>
      <MiddlePanel title="Developers" items={mockDevelopers} />
      <ContentArea>
        <PagePlaceholder
          title="Developers Management"
          description="Manage developer documents, verification, earnings, violations"
        />
      </ContentArea>
    </>
  );
}
