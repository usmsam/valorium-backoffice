import { Bot } from "@/types/bot";

interface BotOverviewProps {
  bot: Bot;
}

export function BotOverview({ bot }: BotOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Bot Name</label>
            <p className="font-medium">{bot.name}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Version</label>
            <p className="font-medium">{bot.version}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Strategy</label>
            <p className="font-medium">{bot.strategy}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Status</label>
            <p className="font-medium capitalize">{bot.status.replace("_", " ")}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Created At</label>
            <p className="font-medium">{new Date(bot.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Submitted At</label>
            <p className="font-medium">{new Date(bot.submittedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Developer Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Developer Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Developer Name</label>
            <p className="font-medium">{bot.developer.name}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <p className="font-medium">{bot.developer.email}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Developer ID</label>
            <p className="font-medium text-xs">{bot.developer.id}</p>
          </div>
        </div>
      </div>

      {/* Trading Configuration */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Trading Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Supported Exchanges</label>
            <div className="flex gap-2 mt-1">
              {bot.exchanges.map((exchange) => (
                <span
                  key={exchange}
                  className="px-3 py-1 bg-accent rounded-md text-sm font-medium"
                >
                  {exchange}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Trading Pairs</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {bot.assets.map((asset) => (
                <span
                  key={asset}
                  className="px-3 py-1 bg-accent rounded-md text-sm font-medium"
                >
                  {asset}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Active Users</label>
            <p className="text-2xl font-bold">{bot.activeUsers.toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Total Revenue</label>
            <p className="text-2xl font-bold">${bot.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Description</h3>
        <p className="text-muted-foreground">{bot.description}</p>
      </div>
    </div>
  );
}
