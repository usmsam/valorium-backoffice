import { RiskLevel } from "@/types/bot";
import { cn } from "@/lib/utils";

interface RiskLevelBadgeProps {
  level: RiskLevel;
}

const riskConfig: Record<RiskLevel, { label: string; className: string }> = {
  low: {
    label: "Low",
    className: "bg-green-100 text-green-800",
  },
  medium: {
    label: "Medium",
    className: "bg-yellow-100 text-yellow-800",
  },
  high: {
    label: "High",
    className: "bg-orange-100 text-orange-800",
  },
  critical: {
    label: "Critical",
    className: "bg-red-100 text-red-800",
  },
};

export function RiskLevelBadge({ level }: RiskLevelBadgeProps) {
  const config = riskConfig[level];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
