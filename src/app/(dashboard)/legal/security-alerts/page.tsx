import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockAlerts: MiddlePanelItem[] = [
  { id: "1", title: "Suspicious Login Attempt", subtitle: "High priority", path: "/legal/security-alerts/1" },
  { id: "2", title: "Data Access Anomaly", subtitle: "Medium priority", path: "/legal/security-alerts/2" },
];

export default function SecurityAlertsPage() {
  return (
    <>
      <MiddlePanel title="Security Alerts" items={mockAlerts} />
      <ContentArea>
        <PagePlaceholder
          title="Security Alerts"
          description="Monitor and respond to security incidents"
        />
      </ContentArea>
    </>
  );
}
