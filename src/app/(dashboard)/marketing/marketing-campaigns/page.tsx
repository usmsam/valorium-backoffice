import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockCampaigns: MiddlePanelItem[] = [
  { id: "1", title: "New Year Campaign", subtitle: "Active", path: "/marketing/marketing-campaigns/1" },
  { id: "2", title: "Spring Promotion", subtitle: "Scheduled", path: "/marketing/marketing-campaigns/2" },
];

export default function MarketingCampaignsPage() {
  return (
    <>
      <MiddlePanel title="Campaigns" items={mockCampaigns} />
      <ContentArea>
        <PagePlaceholder
          title="Marketing Campaigns"
          description="Manage marketing campaigns and promotions"
        />
      </ContentArea>
    </>
  );
}
