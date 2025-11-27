import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockContracts: MiddlePanelItem[] = [
  { id: "1", title: "Developer Agreement 2025", subtitle: "Active", path: "/legal/contracts/1" },
  { id: "2", title: "Partnership Agreement", subtitle: "Under review", path: "/legal/contracts/2" },
];

export default function ContractsPage() {
  return (
    <>
      <MiddlePanel title="Contracts" items={mockContracts} />
      <ContentArea>
        <PagePlaceholder
          title="Contracts & Documents"
          description="Manage legal contracts and documents"
        />
      </ContentArea>
    </>
  );
}
