import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { MiddlePanelItem } from "@/types/navigation";
import { mockDevelopers } from "@/lib/mock-developers";

export default function DevelopersPage() {
  const developerItems: MiddlePanelItem[] = mockDevelopers.map((dev) => ({
    id: dev.id,
    title: dev.name,
    subtitle: `${dev.status.replace("_", " ")} • ${dev.country}`,
    path: `/platform/developers/${dev.id}`,
  }));

  return (
    <>
      <MiddlePanel title="Developers" items={developerItems} emptyMessage="No developers found" />
      <ContentArea>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Select a developer to view details</h2>
            <p className="text-muted-foreground">
              Choose a developer from the list to manage documents, verification, revenue and violations
            </p>
          </div>
        </div>
      </ContentArea>
    </>
  );
}
