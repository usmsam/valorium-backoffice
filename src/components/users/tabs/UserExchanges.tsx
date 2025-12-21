import { User } from "@/types/user";
import { formatDistanceToNow } from "date-fns";
import { Building2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface UserExchangesProps {
  user: User;
}

const statusConfig = {
  connected: {
    label: "Connected",
    icon: CheckCircle,
    className: "text-green-600 bg-green-100",
  },
  disconnected: {
    label: "Disconnected",
    icon: XCircle,
    className: "text-red-600 bg-red-100",
  },
  error: {
    label: "Error",
    icon: AlertTriangle,
    className: "text-orange-600 bg-orange-100",
  },
};

export function UserExchanges({ user }: UserExchangesProps) {
  const totalVolume = user.exchanges.reduce((sum, ex) => sum + ex.totalVolume, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Total Exchanges</div>
          <div className="text-2xl font-bold">{user.exchanges.length}</div>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Connected</div>
          <div className="text-2xl font-bold text-green-600">
            {user.exchanges.filter((e) => e.status === "connected").length}
          </div>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Total Volume</div>
          <div className="text-2xl font-bold">${totalVolume.toLocaleString()}</div>
        </div>
      </div>

      {/* Exchanges List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Connected Exchanges</h3>
        {user.exchanges.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg border border-border">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-1">No Exchanges Connected</h3>
            <p className="text-sm text-muted-foreground">
              This user hasn't connected any exchanges yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {user.exchanges.map((exchange) => {
              const config = statusConfig[exchange.status];
              const StatusIcon = config.icon;

              return (
                <div
                  key={exchange.id}
                  className="border border-border rounded-lg p-5 bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{exchange.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Connected{" "}
                        {formatDistanceToNow(new Date(exchange.connectedAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${config.className}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">{config.label}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="border border-border rounded-lg p-3 bg-background">
                      <p className="text-xs text-muted-foreground mb-1">API Keys</p>
                      <p className="text-lg font-bold">{exchange.apiKeysCount}</p>
                    </div>
                    <div className="border border-border rounded-lg p-3 bg-background">
                      <p className="text-xs text-muted-foreground mb-1">Total Volume</p>
                      <p className="text-lg font-bold">${exchange.totalVolume.toLocaleString()}</p>
                    </div>
                    {exchange.lastSync && (
                      <div className="border border-border rounded-lg p-3 bg-background">
                        <p className="text-xs text-muted-foreground mb-1">Last Sync</p>
                        <p className="text-sm font-medium">
                          {formatDistanceToNow(new Date(exchange.lastSync), { addSuffix: true })}
                        </p>
                      </div>
                    )}
                  </div>

                  {exchange.status === "error" && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
                      <p className="text-sm font-medium text-orange-900">
                        Connection Error - Please check API credentials
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
