import { ContentArea } from "@/components/layout/ContentArea";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export default function EmployeeActivityPage() {
  return (
    <ContentArea>
      <PagePlaceholder
        title="Employee Activity Tracking"
        description="Work hours, tasks completed, active modules, actions, system time"
      />
    </ContentArea>
  );
}
