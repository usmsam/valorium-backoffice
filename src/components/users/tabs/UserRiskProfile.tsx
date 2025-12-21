import { User, RiskLevel } from "@/types/user";
import { formatDistanceToNow } from "date-fns";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface UserRiskProfileProps {
  user: User;
}

const riskConfig: Record<RiskLevel, { label: string; className: string; bgClassName: string }> = {
  low: {
    label: "Low Risk",
    className: "text-green-700 border-green-300",
    bgClassName: "bg-green-100",
  },
  medium: {
    label: "Medium Risk",
    className: "text-yellow-700 border-yellow-300",
    bgClassName: "bg-yellow-100",
  },
  high: {
    label: "High Risk",
    className: "text-orange-700 border-orange-300",
    bgClassName: "bg-orange-100",
  },
  critical: {
    label: "Critical Risk",
    className: "text-red-700 border-red-300",
    bgClassName: "bg-red-100",
  },
};

const flagTypeLabels: Record<string, string> = {
  unusual_activity: "Unusual Activity",
  high_loss: "High Loss",
  api_abuse: "API Abuse",
  suspicious_pattern: "Suspicious Pattern",
  other: "Other",
};

export function UserRiskProfile({ user }: UserRiskProfileProps) {
  const { riskProfile } = user;
  const activeFlags = riskProfile.flags.filter((f) => !f.resolved);
  const resolvedFlags = riskProfile.flags.filter((f) => f.resolved);

  const overallConfig = riskConfig[riskProfile.overallRisk];

  return (
    <div className="space-y-6">
      {/* Overall Risk */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Overall Risk Assessment</h3>
          <div className={`px-4 py-2 rounded-lg font-semibold ${overallConfig.bgClassName} ${overallConfig.className}`}>
            {overallConfig.label}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Last assessed {formatDistanceToNow(new Date(riskProfile.lastAssessed), { addSuffix: true })}
        </p>
        {riskProfile.notes && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">{riskProfile.notes}</p>
          </div>
        )}
      </div>

      {/* Risk Breakdown */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Risk Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Trading Risk</p>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${riskConfig[riskProfile.tradingRisk].bgClassName} ${riskConfig[riskProfile.tradingRisk].className}`}>
                {riskConfig[riskProfile.tradingRisk].label}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  riskProfile.tradingRisk === "low" ? "bg-green-600" :
                  riskProfile.tradingRisk === "medium" ? "bg-yellow-600" :
                  riskProfile.tradingRisk === "high" ? "bg-orange-600" : "bg-red-600"
                }`}
                style={{
                  width: `${
                    riskProfile.tradingRisk === "low" ? "25" :
                    riskProfile.tradingRisk === "medium" ? "50" :
                    riskProfile.tradingRisk === "high" ? "75" : "100"
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Account Risk</p>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${riskConfig[riskProfile.accountRisk].bgClassName} ${riskConfig[riskProfile.accountRisk].className}`}>
                {riskConfig[riskProfile.accountRisk].label}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  riskProfile.accountRisk === "low" ? "bg-green-600" :
                  riskProfile.accountRisk === "medium" ? "bg-yellow-600" :
                  riskProfile.accountRisk === "high" ? "bg-orange-600" : "bg-red-600"
                }`}
                style={{
                  width: `${
                    riskProfile.accountRisk === "low" ? "25" :
                    riskProfile.accountRisk === "medium" ? "50" :
                    riskProfile.accountRisk === "high" ? "75" : "100"
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Behavior Risk</p>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${riskConfig[riskProfile.behaviorRisk].bgClassName} ${riskConfig[riskProfile.behaviorRisk].className}`}>
                {riskConfig[riskProfile.behaviorRisk].label}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  riskProfile.behaviorRisk === "low" ? "bg-green-600" :
                  riskProfile.behaviorRisk === "medium" ? "bg-yellow-600" :
                  riskProfile.behaviorRisk === "high" ? "bg-orange-600" : "bg-red-600"
                }`}
                style={{
                  width: `${
                    riskProfile.behaviorRisk === "low" ? "25" :
                    riskProfile.behaviorRisk === "medium" ? "50" :
                    riskProfile.behaviorRisk === "high" ? "75" : "100"
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-sm font-medium mb-2">Total Risk Flags</div>
            <div className="text-2xl font-bold">
              {riskProfile.flags.length}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({activeFlags.length} active)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Risk Flags */}
      {activeFlags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Active Risk Flags
          </h3>
          <div className="space-y-3">
            {activeFlags.map((flag) => {
              const flagConfig = riskConfig[flag.severity];

              return (
                <div
                  key={flag.id}
                  className="border border-orange-300 rounded-lg p-4 bg-orange-50/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${flagConfig.bgClassName} ${flagConfig.className}`}>
                          {flagConfig.label}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {flagTypeLabels[flag.type]}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{flag.description}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Detected {formatDistanceToNow(new Date(flag.detectedAt), { addSuffix: true })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Resolved Risk Flags */}
      {resolvedFlags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Resolved Risk Flags
          </h3>
          <div className="space-y-2">
            {resolvedFlags.map((flag) => (
              <div
                key={flag.id}
                className="border border-border rounded-lg p-3 bg-card opacity-75"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{flag.description}</p>
                    <p className="text-xs text-muted-foreground">{flagTypeLabels[flag.type]}</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Risk Flags */}
      {riskProfile.flags.length === 0 && (
        <div className="text-center py-12 bg-green-50 rounded-lg border border-green-200">
          <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-900 mb-1">No Risk Flags</h3>
          <p className="text-sm text-green-700">This user has a clean risk profile</p>
        </div>
      )}
    </div>
  );
}
