import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockIp: MiddlePanelItem[] = [
  { id: "1", title: "Trademarks", subtitle: "12 registered", path: "/legal/intellectual-property/1" },
  { id: "2", title: "Patents", subtitle: "3 pending", path: "/legal/intellectual-property/2" },
];

export default function IntellectualPropertyPage() {
  return (
    <>
      <MiddlePanel title="IP Assets" items={mockIp} />
      <ContentArea>
        <PagePlaceholder
          title="Intellectual Property"
          description="Manage trademarks, patents, and IP assets"
        />
      </ContentArea>
    </>
  );
}
