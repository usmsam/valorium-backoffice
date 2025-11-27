import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockTickets: MiddlePanelItem[] = [
  { id: "1", title: "API Connection Issue", subtitle: "High priority", path: "/operations/tickets/1" },
  { id: "2", title: "Bot Not Trading", subtitle: "Medium priority", path: "/operations/tickets/2" },
];

export default function TicketsPage() {
  return (
    <>
      <MiddlePanel title="Support Tickets" items={mockTickets} />
      <ContentArea>
        <PagePlaceholder
          title="Support Tickets"
          description="Manage ticket queues, priorities, assignments, SLA"
        />
      </ContentArea>
    </>
  );
}
