import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockPromoCodes: MiddlePanelItem[] = [
  { id: "1", title: "LAUNCH2025", subtitle: "Active - 20% off", path: "/marketing/promo-codes/1" },
  { id: "2", title: "EARLYBIRD", subtitle: "Expired", path: "/marketing/promo-codes/2" },
];

export default function PromoCodesPage() {
  return (
    <>
      <MiddlePanel title="Promo Codes" items={mockPromoCodes} />
      <ContentArea>
        <PagePlaceholder
          title="Promo Codes Management"
          description="Create and manage promotional codes"
        />
      </ContentArea>
    </>
  );
}
