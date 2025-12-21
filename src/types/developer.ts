export type DeveloperStatus = "verified" | "pending" | "rejected" | "suspended" | "banned";
export type VerificationStatus = "verified" | "pending" | "rejected" | "incomplete";
export type ViolationSeverity = "low" | "medium" | "high" | "critical";

export interface DeveloperDocument {
  id: string;
  type: "identity" | "address" | "tax" | "business" | "other";
  name: string;
  uploadedAt: string;
  status: "approved" | "pending" | "rejected";
  notes?: string;
  url?: string;
}

export interface Verification {
  status: VerificationStatus;
  identityVerified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  addressVerified: boolean;
  taxInfoVerified: boolean;
  lastVerified?: string;
  verifiedBy?: string;
  rejectionReason?: string;
}

export interface Revenue {
  totalEarnings: number;
  pendingPayouts: number;
  lastMonthEarnings: number;
  averageMonthlyEarnings: number;
  totalBots: number;
  activeBots: number;
  totalUsers: number;
  activeUsers: number;
}

export interface Violation {
  id: string;
  type: "policy" | "api_abuse" | "fraud" | "content" | "support" | "other";
  severity: ViolationSeverity;
  description: string;
  detectedAt: string;
  resolvedAt?: string;
  action: "warning" | "suspension" | "ban" | "none";
  notes?: string;
}

export interface DeveloperLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error";
  action: string;
  details: string;
  performedBy?: string;
}

export interface Developer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country: string;
  status: DeveloperStatus;
  joinedAt: string;
  lastActive: string;
  documents: DeveloperDocument[];
  verification: Verification;
  revenue: Revenue;
  violations: Violation[];
  logs: DeveloperLog[];
  restrictionLevel?: "none" | "limited" | "suspended" | "banned";
  restrictionReason?: string;
}
