import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { MiddlePanelItem } from "@/types/navigation";
import { mockUsers } from "@/lib/mock-users";

export default function UsersPage() {
  const userItems: MiddlePanelItem[] = mockUsers.map((user) => ({
    id: user.id,
    title: user.name,
    subtitle: `${user.status.replace("_", " ")} • ${user.subscriptions.filter(s => s.status === "active").length} bots`,
    path: `/platform/users/${user.id}`,
  }));

  return (
    <>
      <MiddlePanel title="Users" items={userItems} emptyMessage="No users found" />
      <ContentArea>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Select a user to view details</h2>
            <p className="text-muted-foreground">
              Choose a user from the list to manage API keys, exchanges, activity, complaints and risk profile
            </p>
          </div>
        </div>
      </ContentArea>
    </>
  );
}
