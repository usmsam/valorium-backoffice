import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockMarketplace: MiddlePanelItem[] = [
  { id: "1", title: "Featured Bots", subtitle: "5 bots", path: "/platform/marketplace/1" },
  { id: "2", title: "New Listings", subtitle: "12 bots", path: "/platform/marketplace/2" },
];

export default function MarketplacePage() {
  return (
    <>
      <MiddlePanel title="Marketplace" items={mockMarketplace} />
      <ContentArea>
        <PagePlaceholder
          title="Marketplace Management"
          description="Manage marketplace listings and featured bots"
        />
      </ContentArea>
    </>
  );
}
