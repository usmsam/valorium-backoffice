import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export default function FinanceDashboardPage() {
  return (
    <ContentArea>
      <PagePlaceholder
        title="Finance Dashboard"
        description="MRR, ARR, subscription revenue, royalty, payment fees, PnL, expenses, taxes"
      />
    </ContentArea>
  );
}
