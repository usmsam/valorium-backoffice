import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockKyc: MiddlePanelItem[] = [
  { id: "1", title: "Pending Verifications", subtitle: "15 users", path: "/legal/kyc-aml/1" },
  { id: "2", title: "Flagged Accounts", subtitle: "3 users", path: "/legal/kyc-aml/2" },
];

export default function KycAmlPage() {
  return (
    <>
      <MiddlePanel title="KYC/AML" items={mockKyc} />
      <ContentArea>
        <PagePlaceholder
          title="KYC/AML Checks"
          description="User verification and anti-money laundering compliance"
        />
      </ContentArea>
    </>
  );
}
