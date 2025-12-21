import { Developer } from "@/types/developer";
import { TrendingUp, DollarSign, Users, Bot } from "lucide-react";

interface DeveloperRevenueProps {
  developer: Developer;
}

export function DeveloperRevenue({ developer }: DeveloperRevenueProps) {
  const { revenue } = developer;

  const stats = [
    {
      label: "Total Earnings",
      value: `$${revenue.totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Pending Payouts",
      value: `$${revenue.pendingPayouts.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      label: "Last Month",
      value: `$${revenue.lastMonthEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Average Monthly",
      value: `$${revenue.averageMonthlyEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const botStats = [
    {
      label: "Total Bots",
      value: revenue.totalBots,
      icon: Bot,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      label: "Active Bots",
      value: revenue.activeBots,
      icon: Bot,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Total Users",
      value: revenue.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Active Users",
      value: revenue.activeUsers.toLocaleString(),
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-border rounded-lg p-5 bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bot & User Statistics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Bot & User Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          {botStats.map((stat) => (
            <div key={stat.label} className="border border-border rounded-lg p-5 bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Average Earnings per Bot</span>
              <span className="font-medium">
                ${revenue.totalBots > 0 ? (revenue.totalEarnings / revenue.totalBots).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
              </span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Average Earnings per User</span>
              <span className="font-medium">
                ${revenue.totalUsers > 0 ? (revenue.totalEarnings / revenue.totalUsers).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
              </span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Bot Activation Rate</span>
              <span className="font-medium">
                {revenue.totalBots > 0 ? ((revenue.activeBots / revenue.totalBots) * 100).toFixed(1) : "0"}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{
                  width: `${revenue.totalBots > 0 ? (revenue.activeBots / revenue.totalBots) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">User Retention Rate</span>
              <span className="font-medium">
                {revenue.totalUsers > 0 ? ((revenue.activeUsers / revenue.totalUsers) * 100).toFixed(1) : "0"}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${revenue.totalUsers > 0 ? (revenue.activeUsers / revenue.totalUsers) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
