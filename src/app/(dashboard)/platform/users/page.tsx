import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockUsers: MiddlePanelItem[] = [
  { id: "1", title: "user@example.com", subtitle: "Active", path: "/platform/users/1" },
  { id: "2", title: "trader@example.com", subtitle: "Active", path: "/platform/users/2" },
];

export default function UsersPage() {
  return (
    <>
      <MiddlePanel title="Users" items={mockUsers} />
      <ContentArea>
        <PagePlaceholder
          title="Users Management"
          description="Manage API keys, exchanges, actions, complaints, risk profiles"
        />
      </ContentArea>
    </>
  );
}
