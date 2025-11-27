import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockInvoices: MiddlePanelItem[] = [
  { id: "1", title: "Invoice #2025-001", subtitle: "Paid", path: "/company/invoices-accounting/1" },
  { id: "2", title: "Invoice #2025-002", subtitle: "Pending", path: "/company/invoices-accounting/2" },
];

export default function InvoicesAccountingPage() {
  return (
    <>
      <MiddlePanel title="Invoices" items={mockInvoices} />
      <ContentArea>
        <PagePlaceholder
          title="Invoices & Accounting"
          description="Invoices, tax documents, VAT reports, EU/Poland tax reports"
        />
      </ContentArea>
    </>
  );
}
