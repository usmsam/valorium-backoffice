import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockNewsletters: MiddlePanelItem[] = [
  { id: "1", title: "Weekly Update #42", subtitle: "Sent", path: "/marketing/newsletter/1" },
  { id: "2", title: "Product Launch", subtitle: "Draft", path: "/marketing/newsletter/2" },
];

export default function NewsletterPage() {
  return (
    <>
      <MiddlePanel title="Newsletters" items={mockNewsletters} />
      <ContentArea>
        <PagePlaceholder
          title="Newsletter / Push Center"
          description="Manage email newsletters and push notifications"
        />
      </ContentArea>
    </>
  );
}
