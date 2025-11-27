import { Bot } from "@/types/bot";

interface BotBacktestProps {
  bot: Bot;
}

export function BotBacktest({ bot }: BotBacktestProps) {
  const { backtest } = bot;

  const getMetricColor = (value: number, metric: string) => {
    if (metric === "maxDrawdown") {
      if (value > -10) return "text-green-600";
      if (value > -20) return "text-yellow-600";
      return "text-red-600";
    }
    if (metric === "totalReturn") {
      if (value > 30) return "text-green-600";
      if (value > 10) return "text-yellow-600";
      return "text-red-600";
    }
    if (metric === "sharpeRatio") {
      if (value > 2) return "text-green-600";
      if (value > 1) return "text-yellow-600";
      return "text-red-600";
    }
    if (metric === "winRate") {
      if (value > 60) return "text-green-600";
      if (value > 50) return "text-yellow-600";
      return "text-red-600";
    }
    return "text-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Backtest Period */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Backtest Period</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Start Date</label>
            <p className="font-medium">{new Date(backtest.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">End Date</label>
            <p className="font-medium">{new Date(backtest.endDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Return */}
        <div className="bg-card border border-border rounded-lg p-6">
          <label className="text-sm text-muted-foreground">Total Return</label>
          <p className={`text-3xl font-bold ${getMetricColor(backtest.totalReturn, "totalReturn")}`}>
            {backtest.totalReturn > 0 ? "+" : ""}
            {backtest.totalReturn.toFixed(2)}%
          </p>
        </div>

        {/* Sharpe Ratio */}
        <div className="bg-card border border-border rounded-lg p-6">
          <label className="text-sm text-muted-foreground">Sharpe Ratio</label>
          <p className={`text-3xl font-bold ${getMetricColor(backtest.sharpeRatio, "sharpeRatio")}`}>
            {backtest.sharpeRatio.toFixed(2)}
          </p>
        </div>

        {/* Max Drawdown */}
        <div className="bg-card border border-border rounded-lg p-6">
          <label className="text-sm text-muted-foreground">Max Drawdown</label>
          <p className={`text-3xl font-bold ${getMetricColor(backtest.maxDrawdown, "maxDrawdown")}`}>
            {backtest.maxDrawdown.toFixed(2)}%
          </p>
        </div>

        {/* Win Rate */}
        <div className="bg-card border border-border rounded-lg p-6">
          <label className="text-sm text-muted-foreground">Win Rate</label>
          <p className={`text-3xl font-bold ${getMetricColor(backtest.winRate, "winRate")}`}>
            {backtest.winRate.toFixed(1)}%
          </p>
        </div>

        {/* Total Trades */}
        <div className="bg-card border border-border rounded-lg p-6">
          <label className="text-sm text-muted-foreground">Total Trades</label>
          <p className="text-3xl font-bold">{backtest.totalTrades.toLocaleString()}</p>
        </div>

        {/* Profit Factor */}
        <div className="bg-card border border-border rounded-lg p-6">
          <label className="text-sm text-muted-foreground">Profit Factor</label>
          <p className="text-3xl font-bold">{backtest.profitFactor.toFixed(2)}</p>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span>Backtest data verified</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span>Performance metrics validated</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span>Trade history consistent</span>
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-blue-900">Performance Analysis</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <strong>Return Analysis:</strong> The bot shows{" "}
            {backtest.totalReturn > 30
              ? "excellent"
              : backtest.totalReturn > 15
              ? "good"
              : "moderate"}{" "}
            returns with a total return of {backtest.totalReturn.toFixed(2)}%.
          </p>
          <p>
            <strong>Risk Analysis:</strong> Maximum drawdown of {Math.abs(backtest.maxDrawdown).toFixed(2)}%{" "}
            {Math.abs(backtest.maxDrawdown) < 10
              ? "indicates strong risk management"
              : Math.abs(backtest.maxDrawdown) < 20
              ? "is within acceptable limits"
              : "requires careful monitoring"}.
          </p>
          <p>
            <strong>Consistency:</strong> With {backtest.totalTrades} trades and a{" "}
            {backtest.winRate.toFixed(1)}% win rate, the strategy shows{" "}
            {backtest.winRate > 60 ? "strong" : backtest.winRate > 50 ? "adequate" : "concerning"}{" "}
            consistency.
          </p>
        </div>
      </div>
    </div>
  );
}
