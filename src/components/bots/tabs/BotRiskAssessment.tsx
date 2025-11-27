import { Bot } from "@/types/bot";
import { RiskLevelBadge } from "../RiskLevelBadge";

interface BotRiskAssessmentProps {
  bot: Bot;
}

export function BotRiskAssessment({ bot }: BotRiskAssessmentProps) {
  const { riskAssessment } = bot;

  return (
    <div className="space-y-6">
      {/* Overall Risk */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Overall Risk Assessment</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Risk Level:</span>
          <RiskLevelBadge level={riskAssessment.overallRisk} />
        </div>
        <div className="mt-4">
          <label className="text-sm text-muted-foreground">Last Assessed</label>
          <p className="font-medium">{new Date(riskAssessment.lastAssessed).toLocaleString()}</p>
        </div>
      </div>

      {/* Risk Categories */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Risk Categories</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="font-medium">Drawdown Risk</span>
            <RiskLevelBadge level={riskAssessment.drawdownRisk} />
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="font-medium">Volatility Risk</span>
            <RiskLevelBadge level={riskAssessment.volatilityRisk} />
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="font-medium">Liquidity Risk</span>
            <RiskLevelBadge level={riskAssessment.liquidityRisk} />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">API Risk</span>
            <RiskLevelBadge level={riskAssessment.apiRisk} />
          </div>
        </div>
      </div>

      {/* Risk Notes */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Risk Analysis Notes</h3>
        <p className="text-muted-foreground whitespace-pre-wrap">{riskAssessment.notes}</p>
      </div>

      {/* Risk Recommendations */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-amber-900">Recommendations</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-amber-800">
          {riskAssessment.overallRisk === "high" || riskAssessment.overallRisk === "critical" ? (
            <>
              <li>Manual review required before approval</li>
              <li>Request additional risk mitigation documentation from developer</li>
              <li>Consider limiting initial user access</li>
            </>
          ) : riskAssessment.overallRisk === "medium" ? (
            <>
              <li>Monitor performance closely during initial release</li>
              <li>Review risk parameters monthly</li>
            </>
          ) : (
            <>
              <li>Bot meets risk standards for approval</li>
              <li>Standard monitoring protocols apply</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
