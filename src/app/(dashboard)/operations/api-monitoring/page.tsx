import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export default function ApiMonitoringPage() {
  return (
    <ContentArea>
      <PagePlaceholder
        title="API Monitoring"
        description="Monitor load, errors, bot drops, latency"
      />
    </ContentArea>
  );
}
