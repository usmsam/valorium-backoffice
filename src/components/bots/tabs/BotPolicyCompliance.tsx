import { Bot } from "@/types/bot";

interface BotPolicyComplianceProps {
  bot: Bot;
}

export function BotPolicyCompliance({ bot }: BotPolicyComplianceProps) {
  const { policyCompliance } = bot;

  const checks = [
    {
      key: "termsOfService",
      label: "Terms of Service Agreement",
      passed: policyCompliance.termsOfService,
    },
    {
      key: "tradingRules",
      label: "Trading Rules Compliance",
      passed: policyCompliance.tradingRules,
    },
    {
      key: "apiUsage",
      label: "API Usage Policy",
      passed: policyCompliance.apiUsage,
    },
    {
      key: "dataPrivacy",
      label: "Data Privacy Compliance",
      passed: policyCompliance.dataPrivacy,
    },
    {
      key: "riskDisclosure",
      label: "Risk Disclosure Requirements",
      passed: policyCompliance.riskDisclosure,
    },
  ];

  const passedCount = checks.filter((check) => check.passed).length;
  const totalCount = checks.length;
  const compliancePercentage = (passedCount / totalCount) * 100;

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Compliance Overview</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Compliance Score</span>
              <span className="text-sm font-medium">
                {passedCount} / {totalCount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  compliancePercentage === 100
                    ? "bg-green-500"
                    : compliancePercentage >= 80
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${compliancePercentage}%` }}
              />
            </div>
          </div>
          <div className="text-3xl font-bold">{compliancePercentage.toFixed(0)}%</div>
        </div>
        <div className="mt-4">
          <label className="text-sm text-muted-foreground">Last Checked</label>
          <p className="font-medium">{new Date(policyCompliance.lastChecked).toLocaleString()}</p>
        </div>
      </div>

      {/* Compliance Checks */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Compliance Checks</h3>
        <div className="space-y-3">
          {checks.map((check) => (
            <div
              key={check.key}
              className="flex items-center justify-between p-3 border border-border rounded-md"
            >
              <span className="font-medium">{check.label}</span>
              <div className="flex items-center gap-2">
                {check.passed ? (
                  <>
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-green-700 font-medium">Passed</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-red-700 font-medium">Failed</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Violations */}
      {policyCompliance.violations.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-red-900">Policy Violations</h3>
          <ul className="list-disc list-inside space-y-2">
            {policyCompliance.violations.map((violation, index) => (
              <li key={index} className="text-sm text-red-800">
                {violation}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Violations */}
      {policyCompliance.violations.length === 0 && compliancePercentage === 100 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-green-900">All Checks Passed</h3>
          <p className="text-sm text-green-800">
            This bot meets all policy compliance requirements and has no violations.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Compliance Actions</h3>
        <div className="space-y-3">
          <button className="w-full px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-accent text-left">
            Request Missing Documentation
          </button>
          <button className="w-full px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-accent text-left">
            Schedule Compliance Review Call
          </button>
          <button className="w-full px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-accent text-left">
            Export Compliance Report
          </button>
        </div>
      </div>
    </div>
  );
}
