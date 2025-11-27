export type BotStatus = "pending" | "approved" | "rejected" | "under_review" | "suspended";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface BacktestMetrics {
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
  profitFactor: number;
  startDate: string;
  endDate: string;
}

export interface RiskAssessment {
  overallRisk: RiskLevel;
  drawdownRisk: RiskLevel;
  volatilityRisk: RiskLevel;
  liquidityRisk: RiskLevel;
  apiRisk: RiskLevel;
  notes: string;
  lastAssessed: string;
}

export interface PolicyCompliance {
  termsOfService: boolean;
  tradingRules: boolean;
  apiUsage: boolean;
  dataPrivacy: boolean;
  riskDisclosure: boolean;
  lastChecked: string;
  violations: string[];
}

export interface BotLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error";
  action: string;
  details: string;
}

export interface Bot {
  id: string;
  name: string;
  description: string;
  developer: {
    id: string;
    name: string;
    email: string;
  };
  status: BotStatus;
  version: string;
  strategy: string;
  exchanges: string[];
  assets: string[];
  createdAt: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  backtest: BacktestMetrics;
  riskAssessment: RiskAssessment;
  policyCompliance: PolicyCompliance;
  logs: BotLog[];
  activeUsers: number;
  totalRevenue: number;
}
