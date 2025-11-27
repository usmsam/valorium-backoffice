import { BotStatus } from "@/types/bot";
import { cn } from "@/lib/utils";

interface BotStatusBadgeProps {
  status: BotStatus;
}

const statusConfig: Record<BotStatus, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-800 border-green-300",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 border-red-300",
  },
  under_review: {
    label: "Under Review",
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  suspended: {
    label: "Suspended",
    className: "bg-gray-100 text-gray-800 border-gray-300",
  },
};

export function BotStatusBadge({ status }: BotStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
