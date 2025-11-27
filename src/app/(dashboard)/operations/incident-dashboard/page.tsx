import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockIncidents: MiddlePanelItem[] = [
  { id: "1", title: "Server Downtime", subtitle: "Resolved", path: "/operations/incident-dashboard/1" },
  { id: "2", title: "Exchange API Failure", subtitle: "Active", path: "/operations/incident-dashboard/2" },
];

export default function IncidentDashboardPage() {
  return (
    <>
      <MiddlePanel title="Incidents" items={mockIncidents} />
      <ContentArea>
        <PagePlaceholder
          title="Incident Dashboard"
          description="Server failures, exchange API issues, suspicious activity, alerts"
        />
      </ContentArea>
    </>
  );
}
