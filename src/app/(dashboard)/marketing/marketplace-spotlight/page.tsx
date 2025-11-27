import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockSpotlight: MiddlePanelItem[] = [
  { id: "1", title: "Featured This Week", subtitle: "5 bots", path: "/marketing/marketplace-spotlight/1" },
  { id: "2", title: "Trending Bots", subtitle: "8 bots", path: "/marketing/marketplace-spotlight/2" },
];

export default function MarketplaceSpotlightPage() {
  return (
    <>
      <MiddlePanel title="Spotlight" items={mockSpotlight} />
      <ContentArea>
        <PagePlaceholder
          title="Marketplace Spotlight"
          description="Manage featured and highlighted marketplace bots"
        />
      </ContentArea>
    </>
  );
}
