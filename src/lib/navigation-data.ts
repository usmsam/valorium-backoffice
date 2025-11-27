import { NavigationSection } from "@/types/navigation";

export const navigationSections: NavigationSection[] = [
  {
    id: "platform",
    title: "Platform Management",
    items: [
      { id: "bots", label: "Bots", path: "/platform/bots" },
      { id: "developers", label: "Developers", path: "/platform/developers" },
      { id: "users", label: "Users", path: "/platform/users" },
      { id: "marketplace", label: "Marketplace", path: "/platform/marketplace" },
      { id: "payments", label: "Payments", path: "/platform/payments" },
      { id: "payouts", label: "Payouts", path: "/platform/payouts" },
      { id: "reports-reviews", label: "Reports & Reviews", path: "/platform/reports-reviews" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    items: [
      { id: "tickets", label: "Tickets / Support", path: "/operations/tickets" },
      { id: "api-monitoring", label: "API Monitoring", path: "/operations/api-monitoring" },
      { id: "system-logs", label: "System Logs", path: "/operations/system-logs" },
      { id: "incident-dashboard", label: "Incident Dashboard", path: "/operations/incident-dashboard" },
      { id: "risk-report", label: "Risk Report", path: "/operations/risk-report" },
    ],
  },
  {
    id: "company",
    title: "Company Management",
    items: [
      { id: "employees-roles", label: "Employees & Roles", path: "/company/employees-roles" },
      { id: "employee-activity", label: "Employee Activity", path: "/company/employee-activity" },
      { id: "access-control", label: "Access Control", path: "/company/access-control" },
      { id: "payroll", label: "Payroll", path: "/company/payroll" },
      { id: "finance-dashboard", label: "Finance Dashboard", path: "/company/finance-dashboard" },
      { id: "invoices-accounting", label: "Invoices & Accounting", path: "/company/invoices-accounting" },
      { id: "kpi-monitoring", label: "KPI Monitoring", path: "/company/kpi-monitoring" },
      { id: "work-reports", label: "Work Reports", path: "/company/work-reports" },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Product",
    items: [
      { id: "promo-codes", label: "Promo Codes", path: "/marketing/promo-codes" },
      { id: "marketing-campaigns", label: "Marketing Campaigns", path: "/marketing/marketing-campaigns" },
      { id: "marketplace-spotlight", label: "Marketplace Spotlight", path: "/marketing/marketplace-spotlight" },
      { id: "newsletter", label: "Newsletter / Push Center", path: "/marketing/newsletter" },
      { id: "product-roadmap", label: "Product Roadmap", path: "/marketing/product-roadmap" },
      { id: "ab-testing", label: "A/B Testing", path: "/marketing/ab-testing" },
    ],
  },
  {
    id: "legal",
    title: "Legal & Compliance",
    items: [
      { id: "kyc-aml", label: "KYC/AML checks", path: "/legal/kyc-aml" },
      { id: "contracts", label: "Contracts & Documents", path: "/legal/contracts" },
      { id: "intellectual-property", label: "Intellectual Property", path: "/legal/intellectual-property" },
      { id: "security-alerts", label: "Security Alerts", path: "/legal/security-alerts" },
      { id: "data-storage", label: "Data Storage / Backups", path: "/legal/data-storage" },
    ],
  },
];
