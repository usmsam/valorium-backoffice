import { Developer, ViolationSeverity } from "@/types/developer";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface DeveloperViolationsProps {
  developer: Developer;
}

const severityConfig: Record<ViolationSeverity, { label: string; className: string; bgClassName: string }> = {
  low: {
    label: "Low",
    className: "text-blue-700 border-blue-300",
    bgClassName: "bg-blue-100",
  },
  medium: {
    label: "Medium",
    className: "text-yellow-700 border-yellow-300",
    bgClassName: "bg-yellow-100",
  },
  high: {
    label: "High",
    className: "text-orange-700 border-orange-300",
    bgClassName: "bg-orange-100",
  },
  critical: {
    label: "Critical",
    className: "text-red-700 border-red-300",
    bgClassName: "bg-red-100",
  },
};

const typeLabels: Record<string, string> = {
  policy: "Policy Violation",
  api_abuse: "API Abuse",
  fraud: "Fraud",
  content: "Content Violation",
  support: "Support Issue",
  other: "Other",
};

const actionLabels: Record<string, { label: string; className: string }> = {
  none: { label: "No Action", className: "bg-gray-100 text-gray-700" },
  warning: { label: "Warning Issued", className: "bg-yellow-100 text-yellow-700" },
  suspension: { label: "Suspended", className: "bg-orange-100 text-orange-700" },
  ban: { label: "Banned", className: "bg-red-100 text-red-700" },
};

export function DeveloperViolations({ developer }: DeveloperViolationsProps) {
  const activeViolations = developer.violations.filter((v) => !v.resolvedAt);
  const resolvedViolations = developer.violations.filter((v) => v.resolvedAt);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Total Violations</div>
          <div className="text-2xl font-bold">{developer.violations.length}</div>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Active</div>
          <div className="text-2xl font-bold text-orange-600">{activeViolations.length}</div>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Resolved</div>
          <div className="text-2xl font-bold text-green-600">{resolvedViolations.length}</div>
        </div>
      </div>

      {/* Active Violations */}
      {activeViolations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Active Violations
          </h3>
          <div className="space-y-3">
            {activeViolations.map((violation) => (
              <div
                key={violation.id}
                className="border border-orange-300 rounded-lg p-4 bg-orange-50/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        severityConfig[violation.severity].className
                      } ${severityConfig[violation.severity].bgClassName}`}
                    >
                      {severityConfig[violation.severity].label}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {typeLabels[violation.type]}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      actionLabels[violation.action].className
                    }`}
                  >
                    {actionLabels[violation.action].label}
                  </span>
                </div>
                <p className="text-sm font-medium mb-2">{violation.description}</p>
                <div className="text-xs text-muted-foreground">
                  Detected {formatDistanceToNow(new Date(violation.detectedAt), { addSuffix: true })}
                </div>
                {violation.notes && (
                  <div className="mt-2 p-2 bg-white rounded text-xs">
                    <span className="font-medium">Notes:</span> {violation.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resolved Violations */}
      {resolvedViolations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Resolved Violations
          </h3>
          <div className="space-y-3">
            {resolvedViolations.map((violation) => (
              <div
                key={violation.id}
                className="border border-border rounded-lg p-4 bg-card opacity-75"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        severityConfig[violation.severity].className
                      } ${severityConfig[violation.severity].bgClassName}`}
                    >
                      {severityConfig[violation.severity].label}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {typeLabels[violation.type]}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      actionLabels[violation.action].className
                    }`}
                  >
                    {actionLabels[violation.action].label}
                  </span>
                </div>
                <p className="text-sm font-medium mb-2">{violation.description}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>
                    Detected {formatDistanceToNow(new Date(violation.detectedAt), { addSuffix: true })}
                  </div>
                  {violation.resolvedAt && (
                    <div className="text-green-600">
                      Resolved {formatDistanceToNow(new Date(violation.resolvedAt), { addSuffix: true })}
                    </div>
                  )}
                </div>
                {violation.notes && (
                  <div className="mt-2 p-2 bg-muted rounded text-xs">
                    <span className="font-medium">Notes:</span> {violation.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Violations */}
      {developer.violations.length === 0 && (
        <div className="text-center py-12 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-900 mb-1">No Violations</h3>
          <p className="text-sm text-green-700">This developer has a clean record</p>
        </div>
      )}
    </div>
  );
}
