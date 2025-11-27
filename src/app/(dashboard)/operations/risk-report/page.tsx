import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export default function RiskReportPage() {
  return (
    <ContentArea>
      <PagePlaceholder
        title="Risk Report"
        description="High drawdown bots, suspicious user patterns, policy violations, API key issues"
      />
    </ContentArea>
  );
}
