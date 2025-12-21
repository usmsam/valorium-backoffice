import { UserStatus } from "@/types/user";
import { cn } from "@/lib/utils";

interface UserStatusBadgeProps {
  status: UserStatus;
  className?: string;
}

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  suspended: {
    label: "Suspended",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  banned: {
    label: "Banned",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  pending_verification: {
    label: "Pending Verification",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
};

export function UserStatusBadge({ status, className }: UserStatusBadgeProps) {
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
