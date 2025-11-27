import { MiddlePanel } from "@/components/layout/MiddlePanel";
import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { MiddlePanelItem } from "@/types/navigation";

const mockEmployees: MiddlePanelItem[] = [
  { id: "1", title: "John Smith", subtitle: "CEO - Active", path: "/company/employees-roles/1" },
  { id: "2", title: "Sarah Johnson", subtitle: "CFO - Active", path: "/company/employees-roles/2" },
];

export default function EmployeesRolesPage() {
  return (
    <>
      <MiddlePanel title="Employees" items={mockEmployees} />
      <ContentArea>
        <PagePlaceholder
          title="Employees & Roles"
          description="Manage employees, roles, access levels, KPI, action history"
        />
      </ContentArea>
    </>
  );
}
