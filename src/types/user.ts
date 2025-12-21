export type UserStatus = "active" | "suspended" | "banned" | "pending_verification" | "inactive";
export type RiskLevel = "low" | "medium" | "high" | "critical";
export type ComplaintStatus = "open" | "investigating" | "resolved" | "closed";

export interface ApiKey {
  id: string;
  name: string;
  exchange: string;
  createdAt: string;
  lastUsed?: string;
  status: "active" | "revoked" | "expired";
  permissions: string[];
  isTestnet: boolean;
}

export interface Exchange {
  id: string;
  name: string;
  connectedAt: string;
  status: "connected" | "disconnected" | "error";
  apiKeysCount: number;
  lastSync?: string;
  totalVolume: number;
}

export interface Activity {
  id: string;
  timestamp: string;
  type: "login" | "api_key_created" | "bot_subscribed" | "bot_unsubscribed" | "trade" | "withdrawal" | "deposit" | "settings_changed";
  description: string;
  ipAddress?: string;
  location?: string;
  metadata?: Record<string, any>;
}

export interface Complaint {
  id: string;
  type: "bot_performance" | "technical_issue" | "billing" | "support" | "other";
  status: ComplaintStatus;
  subject: string;
  description: string;
  submittedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  priority: "low" | "medium" | "high" | "urgent";
  responses: {
    id: string;
    author: string;
    message: string;
    timestamp: string;
  }[];
}

export interface RiskProfile {
  overallRisk: RiskLevel;
  tradingRisk: RiskLevel;
  accountRisk: RiskLevel;
  behaviorRisk: RiskLevel;
  lastAssessed: string;
  flags: {
    id: string;
    type: "unusual_activity" | "high_loss" | "api_abuse" | "suspicious_pattern" | "other";
    severity: RiskLevel;
    description: string;
    detectedAt: string;
    resolved: boolean;
  }[];
  notes: string;
}

export interface UserSubscription {
  botId: string;
  botName: string;
  subscribedAt: string;
  status: "active" | "paused" | "cancelled";
  monthlyFee: number;
  totalPaid: number;
  performance: {
    totalReturn: number;
    monthlyReturn: number;
    winRate: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  apiKeys: ApiKey[];
  exchanges: Exchange[];
  subscriptions: UserSubscription[];
  activities: Activity[];
  complaints: Complaint[];
  riskProfile: RiskProfile;
  totalSpent: number;
  accountBalance: number;
}
