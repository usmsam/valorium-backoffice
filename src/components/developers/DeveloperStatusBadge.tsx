import { DeveloperStatus } from "@/types/developer";
import { cn } from "@/lib/utils";

interface DeveloperStatusBadgeProps {
  status: DeveloperStatus;
  className?: string;
}

const statusConfig: Record<DeveloperStatus, { label: string; className: string }> = {
  verified: {
    label: "Verified",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  suspended: {
    label: "Suspended",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  banned: {
    label: "Banned",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
};

export function DeveloperStatusBadge({ status, className }: DeveloperStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
