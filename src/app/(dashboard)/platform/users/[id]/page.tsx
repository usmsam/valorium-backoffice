import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { MiddlePanelItem } from "@/types/navigation";
import { mockUsers } from "@/lib/mock-users";
import { UserDetailsView } from "@/components/users/UserDetailsView";
import { notFound } from "next/navigation";

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  const userItems: MiddlePanelItem[] = mockUsers.map((u) => ({
    id: u.id,
    title: u.name,
    subtitle: `${u.status.replace("_", " ")} • ${u.subscriptions.filter(s => s.status === "active").length} bots`,
    path: `/platform/users/${u.id}`,
  }));

  return (
    <>
      <MiddlePanel title="Users" items={userItems} emptyMessage="No users found" />
      <ContentArea>
        <UserDetailsView user={user} />
      </ContentArea>
    </>
  );
}
